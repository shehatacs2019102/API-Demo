import React, { useState, useEffect } from 'react';
import "./JokeContainer.css"
export default function JokeContainer() {
  const [joke, setJoke] = useState("Loading...");
  const [dofetchjoke, setDofetchjoke] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit', { signal })
      .then((response) => response.json())
      .then((data) => {
        if (data.type === 'twopart') {
          // Use template literals to join the strings
          setJoke(`${data.setup} — ${data.delivery}`);
        } else {
          // Handle single-line jokes
          setJoke(data.joke);
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err);
        }
      });

    return () => controller.abort();
  }, [dofetchjoke]); // <--- Adding this makes the button work!

  return (
    <div className='jokecontainer'>
      <p className='joketext'>{joke}</p>
      <button className = "jokebutton" onClick={() => setDofetchjoke(prev => prev + 1)}>
        Get a new joke
      </button>
    </div>
  );
}