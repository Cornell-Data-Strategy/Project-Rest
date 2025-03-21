import { useState, useEffect } from "react";
import { UserData } from "../types";
import { getRating } from "../api/endpoints";
import StarRating from "./StarRating";

interface HeaderProps {
  userData: UserData | null;
}

const Header = ({ userData }: HeaderProps) => {
  const [restaurant, setRestaurant] = useState<string>();
  const [rating, setRating] = useState<number>(0);

  const fetchRating = async () => {
    if (userData?.businesses?.[0]?.id) {
      const response = await getRating(userData.businesses[0].id);
      setRating(response.data.average_rating);
    }
  };

  useEffect(() => {
    if (userData?.businesses?.[0]) {
      setRestaurant(userData.businesses[0].name);
      fetchRating();
    }
  }, [userData]);

  return (
    <div className="">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-2xl text-coolgray font-medium ">
          {restaurant || "Not Found"}
        </h1>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl text-coolgray font-medium">
            {rating.toFixed(1)}
          </h1>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  );
};

export default Header;
