# -*- coding: utf-8 -*-
import itertools
import logging
import re
import time
import traceback
from datetime import datetime
import threading

import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver import ChromeOptions as Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

GM_WEBPAGE = 'https://www.google.com/maps/'
MAX_WAIT = 10
MAX_RETRY = 5
MAX_SCROLLS = 40

class GoogleMapsScraper:

    def __init__(self, debug=False):
        self.debug = debug
        self.driver = self.__get_driver()
        self.logger = self.__get_logger()

    def __enter__(self):
        return self
    def __exit__(self, exc_type, exc_value, tb):
        """Improved exit method with better cleanup sequence"""
        if self.debug:
            print("Starting __exit__ method")
            if exc_type is not None:
                print(f"Exception occurred: {exc_type}")
                traceback.print_exception(exc_type, exc_value, tb)
        
        # First, try to close all open windows
        try:
            if self.driver:
                # Switch to default content first
                try:
                    self.driver.switch_to.default_content()
                except Exception as e:
                    if self.debug:
                        print(f"Error switching to default content: {e}")
                
                # Try to close all windows
                try:
                    original_window = self.driver.current_window_handle
                    for handle in self.driver.window_handles:
                        self.driver.switch_to.window(handle)
                        self.driver.close()
                except Exception as e:
                    if self.debug:
                        print(f"Error closing windows: {e}")
                
                # Finally quit the driver
                try:
                    self.driver.quit()
                    if self.debug:
                        print("Driver quit successfully")
                except Exception as e:
                    if self.debug:
                        print(f"Error quitting driver: {e}")
                    
                    # If quitting fails, try to force kill the process
                    self._force_kill_chromedriver()
        except Exception as e:
            if self.debug:
                print(f"General error in cleanup: {e}")
            self._force_kill_chromedriver()
        
        self.driver = None
        
        if self.debug:
            print("Active threads:", threading.enumerate())
            print("Finished __exit__ method")
        return True

    def _force_kill_chromedriver(self):
        """Force kill chromedriver processes if needed"""
        if self.debug:
            print("Attempting to force kill chromedriver processes")
        try:
            import os
            import signal
            import subprocess
            
            # For macOS/Linux
            try:
                chromedriver_pids = subprocess.check_output(["pgrep", "chromedriver"]).decode().strip().split("\n")
                for pid in chromedriver_pids:
                    if pid:
                        os.kill(int(pid), signal.SIGKILL)
                        if self.debug:
                            print(f"Killed chromedriver process {pid}")
            except:
                pass
                
            # For Windows
            try:
                os.system("taskkill /f /im chromedriver.exe")
            except:
                pass
        except Exception as e:
            if self.debug:
                print(f"Error force killing chromedriver: {e}")

    def sort_by(self, url, ind):

        self.driver.get(url)
        self.__click_on_cookie_agreement()

        wait = WebDriverWait(self.driver, MAX_WAIT)

        # open dropdown menu
        clicked = False
        tries = 0
        while not clicked and tries < MAX_RETRY:
            try:
                menu_bt = wait.until(EC.element_to_be_clickable((By.XPATH, '//button[@data-value=\'Sort\']')))
                menu_bt.click()

                clicked = True
                time.sleep(1)
            except Exception as e:
                tries += 1
                self.logger.warn('Failed to click sorting button')

            # failed to open the dropdown
            if tries == MAX_RETRY:
                return -1

        #  element of the list specified according to ind
        recent_rating_bt = self.driver.find_elements(By.XPATH, '//div[@role=\'menuitemradio\']')[ind]
        recent_rating_bt.click()

        # wait to load review (ajax call)
        time.sleep(2)

        return 0

    def get_places(self, keyword_list=None):

        df_places = pd.DataFrame()
        search_point_url_list = self._gen_search_points_from_square(keyword_list=keyword_list)

        for i, search_point_url in enumerate(search_point_url_list):
            print(search_point_url)

            if (i+1) % 10 == 0:
                print(f"{i}/{len(search_point_url_list)}")
                df_places = df_places[['search_point_url', 'href', 'name', 'rating', 'num_reviews', 'close_time', 'other']]
                df_places.to_csv('output/places_wax.csv', index=False)

            try:
                self.driver.get(search_point_url)
            except NoSuchElementException:
                self.driver.quit()
                self.driver = self.__get_driver()
                self.driver.get(search_point_url)

            # scroll to load all (20) places into the page
            scrollable_div = self.driver.find_element(By.CSS_SELECTOR,
                "div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div[aria-label*='Results for']")
            for i in range(10):
                self.driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', scrollable_div)

            # Get places names and href
            time.sleep(2)
            response = BeautifulSoup(self.driver.page_source, 'html.parser')
            div_places = response.select('div[jsaction] > a[href]')

            for div_place in div_places:
                place_info = {
                    'search_point_url': search_point_url.replace('https://www.google.com/maps/search/', ''),
                    'href': div_place['href'],
                    'name': div_place['aria-label']
                }

                df_places = df_places.append(place_info, ignore_index=True)

            # TODO: implement click to handle > 20 places

        df_places = df_places[['search_point_url', 'href', 'name']]
        df_places.to_csv('output/places_wax.csv', index=False)


    def get_reviews(self, offset):

        # scroll to load reviews
        self.__scroll()

        # wait for other reviews to load (ajax)
        time.sleep(2)

        # expand review text
        self.__expand_reviews()

        # parse reviews
        response = BeautifulSoup(self.driver.page_source, 'html.parser')
        # TODO: Subject to changes
        rblock = response.find_all('div', class_='jftiEf fontBodyMedium')
        parsed_reviews = []
        for index, review in enumerate(rblock):
            if index >= offset:
                r = self.__parse(review)
                parsed_reviews.append(r)

                # logging to std out
                print(f"Review by {r.get('username', 'unknown')} with rating {r.get('rating', 'N/A')}")

        return parsed_reviews


    def get_account(self, url):

        self.driver.get(url)
        self.__click_on_cookie_agreement()

        time.sleep(2)

        resp = BeautifulSoup(self.driver.page_source, 'html.parser')

        place_data = self.__parse_place(resp, url)

        return place_data


    def __parse(self, review):

        item = {}

        try:
            id_review = review['data-review-id']
        except Exception as e:
            id_review = None

        try:

            username = review['aria-label']
        except Exception as e:
            username = None

        try:
            review_text = self.__filter_string(review.find('span', class_='wiI7pd').text)
        except Exception as e:
            review_text = None

        try:
            rating = float(review.find('span', class_='kvMYJc')['aria-label'].split(' ')[0])
        except Exception as e:
            rating = None

        try:
            relative_date = review.find('span', class_='rsqaWe').text
        except Exception as e:
            relative_date = None

        try:
            n_reviews = review.find('div', class_='RfnDt').text.split(' ')[3]
        except Exception as e:
            n_reviews = 0

        try:
            user_url = review.find('button', class_='WEBjve')['data-href']
        except Exception as e:
            user_url = None

        item['id_review'] = id_review
        item['caption'] = review_text

        # depends on language, which depends on geolocation defined by Google Maps
        # custom mapping to transform into date should be implemented
        item['relative_date'] = relative_date

        # store datetime of scraping and apply further processing to calculate
        # correct date as retrieval_date - time(relative_date)
        item['retrieval_date'] = datetime.now()
        item['rating'] = rating
        item['username'] = username
        item['n_review_user'] = n_reviews
        #item['n_photo_user'] = n_photos  ## not available anymore
        item['url_user'] = user_url

        return item


    def __parse_place(self, response, url):

        place = {}

        try:
            place['name'] = response.find('h1', class_='DUwDvf fontHeadlineLarge').text.strip()
        except Exception as e:
            place['name'] = None

        try:
            place['overall_rating'] = float(response.find('div', class_='F7nice ').find('span', class_='ceNzKf')['aria-label'].split(' ')[1])
        except Exception as e:
            place['overall_rating'] = None

        try:
            place['n_reviews'] = int(response.find('div', class_='F7nice ').text.split('(')[1].replace(',', '').replace(')', ''))
        except Exception as e:
            place['n_reviews'] = 0

        try:
            place['n_photos'] = int(response.find('div', class_='YkuOqf').text.replace('.', '').replace(',','').split(' ')[0])
        except Exception as e:
            place['n_photos'] = 0

        try:
            place['category'] = response.find('button', jsaction='pane.rating.category').text.strip()
        except Exception as e:
            place['category'] = None

        try:
            place['description'] = response.find('div', class_='PYvSYb').text.strip()
        except Exception as e:
            place['description'] = None

        b_list = response.find_all('div', class_='Io6YTe fontBodyMedium')
        try:
            place['address'] = b_list[0].text
        except Exception as e:
            place['address'] = None

        try:
            place['website'] = b_list[1].text
        except Exception as e:
            place['website'] = None

        try:
            place['phone_number'] = b_list[2].text
        except Exception as e:
            place['phone_number'] = None
    
        try:
            place['plus_code'] = b_list[3].text
        except Exception as e:
            place['plus_code'] = None

        try:
            place['opening_hours'] = response.find('div', class_='t39EBf GUrTXd')['aria-label'].replace('\u202f', ' ')
        except:
            place['opening_hours'] = None

        place['url'] = url

        lat, long, z = url.split('/')[6].split(',')
        place['lat'] = lat[1:]
        place['long'] = long

        return place


    def _gen_search_points_from_square(self, keyword_list=None):


        keyword_list = [] if keyword_list is None else keyword_list

        square_points = pd.read_csv('input/square_points.csv')

        cities = square_points['city'].unique()

        search_urls = []

        for city in cities:

            df_aux = square_points[square_points['city'] == city]
            latitudes = df_aux['latitude'].unique()
            longitudes = df_aux['longitude'].unique()
            coordinates_list = list(itertools.product(latitudes, longitudes, keyword_list))

            search_urls += [f"https://www.google.com/maps/search/{coordinates[2]}/@{str(coordinates[1])},{str(coordinates[0])},{str(15)}z"
             for coordinates in coordinates_list]

        return search_urls



    def __expand_reviews(self):
        # use XPath to load complete reviews
        # TODO: Subject to changes
        buttons = self.driver.find_elements(By.CSS_SELECTOR,'button.w8nwRe.kyuRq')
        for button in buttons:
            self.driver.execute_script("arguments[0].click();", button)


    def __scroll(self):
        # TODO: Subject to changes
        scrollable_div = self.driver.find_element(By.CSS_SELECTOR,'div.m6QErb.DxyBCb.kA9KIf.dS8AEf')
        self.driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', scrollable_div)
        #self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")


    def __get_logger(self):
        # create logger
        logger = logging.getLogger('googlemaps-scraper')
        logger.setLevel(logging.DEBUG)

        # create console handler and set level to debug
        fh = logging.FileHandler('gm-scraper.log')
        fh.setLevel(logging.DEBUG)

        # create formatter
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

        # add formatter to ch
        fh.setFormatter(formatter)

        # add ch to logger
        logger.addHandler(fh)

        return logger


    def __get_driver(self, debug=False):
        options = Options()

        if not self.debug:
            options.add_argument("--headless")
        else:
            options.add_argument("--window-size=1366,768")

        options.add_argument("--disable-notifications")
        #options.add_argument("--lang=en-GB")
        options.add_argument("--accept-lang=en-GB")
        input_driver = webdriver.Chrome(service=Service(), options=options)

         # click on google agree button so we can continue (not needed anymore)
         # EC.element_to_be_clickable((By.XPATH, '//span[contains(text(), "I agree")]')))
        input_driver.get(GM_WEBPAGE)

        return input_driver


    def __click_on_cookie_agreement(self):
        try:
            agree = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//span[contains(text(), "Reject all")]')))
            agree.click()

            # back to the main page
            # self.driver.switch_to_default_content()

            return True
        except:
            return False


    def __filter_string(self, str):
        strOut = str.replace('\r', ' ').replace('\n', ' ').replace('\t', ' ')
        return strOut
    
    def get_all_reviews(self, url, max_iterations=15):
        """
        Scrapes reviews from a Google Maps URL with proper termination.
        """
        # Sort reviews by newest first
        error = self.sort_by(url, 1)
        
        if error != 0:
            self.logger.error(f"Failed to sort reviews for URL: {url}")
            return {"error": "Failed to sort reviews", "reviews": []}
        
        all_reviews = []
        offset = 0
        total_scraped = 0
        iteration = 0
        
        while iteration < max_iterations:
            iteration += 1
            self.logger.info(f"Fetching reviews starting from offset {offset}")
            
            try:
                # Get reviews with timeout protection
                reviews = self.get_reviews(offset)
                
                # IMPORTANT FIX: If this batch has no reviews, break the loop
                if not reviews or len(reviews) == 0:
                    self.logger.info("No more reviews found, breaking loop")
                    break
                    
                all_reviews.extend(reviews)
                total_scraped += len(reviews)
                self.logger.info(f"Scraped {len(reviews)} reviews. Total so far: {total_scraped}")
                
                # Update offset for next batch
                offset += len(reviews)
                
                # Add a small delay
                time.sleep(2)
                
            except Exception as e:
                self.logger.error(f"Error while fetching reviews: {e}")
                break
        
        # Add this log to confirm we exited the loop
        self.logger.info(f"Finished scraping loop after {iteration} iterations")
        
        result = {
            "place_url": url,
            "total_reviews": total_scraped,
            "reviews": all_reviews
        }
        
        self.logger.info(f"Successfully scraped {total_scraped} reviews")
        
        return result
    