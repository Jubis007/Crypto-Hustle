import { useState, useEffect } from 'react';
import './App.css';
import CoinInfo from "./Components/CoinInfo";
import SideNav from "./Components/SideNav";

// Safely import our API key from the .env file
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const App = () => {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.Data.filter((item) => 
        Object.values(item.CoinInfo)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list.Data);
    }
  };
  
  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/top/totaltoptiervol?limit=15&tsym=USD&api_key=${API_KEY}`
      );
      const json = await response.json();
      setList(json);
    };

    fetchAllCoinData().catch(console.error);
  }, []); 

  return (
    <div className="whole-page">
      <SideNav />

      <h1>My Crypto List</h1>
      
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />

      <ul>
        {searchInput.length > 0
          ? filteredResults.map((coin) => 
              coin.CoinInfo.Algorithm !== "N/A" ? (
                <CoinInfo
                  key={coin.CoinInfo.Id}
                  image={coin.CoinInfo.ImageUrl}
                  name={coin.CoinInfo.FullName}
                  symbol={coin.CoinInfo.Name}
                />
              ) : null
            )
          // --- THE BULLETPROOF FIX IS ON THIS LINE ---
          // We check if list.Data is ACTUALLY an array before trying to map it!
          : list && Array.isArray(list.Data) 
          ? list.Data.map((coin) => 
              coin.CoinInfo.Algorithm !== "N/A" ? (
                <CoinInfo
                  key={coin.CoinInfo.Id}
                  image={coin.CoinInfo.ImageUrl}
                  name={coin.CoinInfo.FullName}
                  symbol={coin.CoinInfo.Name}
                />
              ) : null
            )
          : <p>Loading coins...</p>}
      </ul>
    </div>
  );
};

export default App;