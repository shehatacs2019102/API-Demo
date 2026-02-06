
import React, { useState } from 'react';
import "./TranslatorStyles.css"
export default function Translator() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');

  const handleTranslate = async () => {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|es`);
    const data = await res.json();
    setTranslated(data.responseData.translatedText);
  };

  return (
  <div className="translator-container">
    <div className="translator-header">
      <h3>English to Spanish Translation</h3>
    </div>
    
    <textarea 
      className="translator-input"
      value={text} 
      onChange={(e) => setText(e.target.value)} 
      placeholder="Type English here..."
    />
    
    <button className="translate-btn" onClick={handleTranslate}>
      Translate
    </button>

    {translated && (
      <div className="result-box">
        <span className="result-label">Spanish Translation:</span>
        <p className="translated-text">{translated}</p>
      </div>
    )}
  </div>
);
}
