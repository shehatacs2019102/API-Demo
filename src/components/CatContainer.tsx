import React, { useState, useEffect } from 'react';
import './CatContainerStyle.css';

export default function CatContainer() {
  const [catURL, setCatURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshCat, setRefreshCat] = useState(0);

  function fetchCat() {
    setLoading(true);
    fetch('https://api.thecatapi.com/v1/images/search')
      .then((response) => response.json())
      .then((data) => {
        setCatURL(data[0].url);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cat:", err);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCat();
  }, [refreshCat]);

  return (
    <div className='cat-container'>
      <div className="cat-card">
        {loading ? (
          <div className="cat-loader">Fetching a cat.</div>
        ) : (
          <img className='cat-image' src={catURL} alt="A cute cat" />
        )}
        <button 
          className="cat-button" 
          onClick={() => setRefreshCat(prev => prev + 1)}
        >
         New Cat
        </button>
      </div>
    </div>
  );
}