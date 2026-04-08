import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const json = await response.json();
        setPrice(json);
      } catch (error) {
        console.error(`Failed to fetch price for ${symbol}`, error);
      }
    };

    getCoinPrice();
  }, [symbol]);

  // BULLETPROOF FIX: If price hasn't loaded yet, OR it doesn't have a USD value, return null (render nothing)
  if (!price || !price.USD) {
    return null; 
  }

  return (
    <li className="main-list">
      <img
        className="icons"
        src={`https://www.cryptocompare.com${image}`}
        alt={`Small icon for ${name} crypto coin`}
      />
      {name} <span className="tab"></span>
      ${price.USD} USD
    </li>
  );
};

export default CoinInfo;