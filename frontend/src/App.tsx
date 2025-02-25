import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<{ id: number; name: string; price: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/menu') // Corrected endpoint
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMenuItems(data))
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to fetch menu items.');
      });
  }, []);

  return (
    <div>
      <h1>Vite + TypeScript Frontend</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

