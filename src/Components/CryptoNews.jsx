import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CryptoNews = () => {
  // Initialize as an empty array to prevent .map() crashes
  const [newsList, setNewsList] = useState([]); 

  useEffect(() => {
    const getNewsArticles = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`
        );
        const json = await response.json();
        
        // 🕵️ DETECTIVE WORK: Print exactly what the API handed us!
        console.log("NEWS API RESPONSE:", json);
        
        if (json && Array.isArray(json.Data)) {
          setNewsList(json.Data);
        } else {
          console.log("Uh oh, the News API didn't give us an array! It gave us:", json);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    getNewsArticles();
  }, []);

  return (
    <div>
      <h2 style={{ color: "white", textAlign: "center" }}>Crypto News</h2>
      <ul className="side-list" style={{ padding: "0 10px", listStyle: "none" }}>
        {newsList.map((article) => (
          <li className="news-article" key={article.id || article.title} style={{ marginBottom: "20px" }}>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noreferrer"
              style={{ color: "#38bdf8", textDecoration: "none", fontSize: "0.95rem" }}
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoNews;