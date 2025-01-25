import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MatrixRain from './MatrixRain';

function App() {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);
  const charsRef = useRef([]);

  const unicodeMap = {
    'a': ['\u{1D4B6}', '\u{1D00}', '\u{0250}', '\u{0430}'],
    'b': ['\u{212C}', '\u{0412}', '\u{13CF}', '\u{15F7}'],
    'c': ['\u{1D4B8}', '\u{03F2}', '\u{2CA5}', '\u{0441}'],
    'd': ['\u{2146}', '\u{13A0}', '\u{0501}', '\u{216E}'],
    'e': ['\u{1D4BA}', '\u{0435}', '\u{22FF}', '\u{04BD}'],
    'f': ['\u{1D4BB}', '\u{03DC}', '\u{16A0}', '\u{0584}'],
    'g': ['\u{1D4BD}', '\u{0261}', '\u{050C}', '\u{13FB}'],
    'h': ['\u{210E}', '\u{04BB}', '\u{13C2}', '\u{0460}'],
    'i': ['\u{1D4C0}', '\u{0456}', '\u{2170}', '\u{0399}'],
    'j': ['\u{1D4C1}', '\u{03F3}', '\u{0541}', '\u{24BF}'],
    'k': ['\u{1D4C3}', '\u{043A}', '\u{16D6}', '\u{04C3}'],
    'l': ['\u{1D4C5}', '\u{217C}', '\u{14AA}', '\u{04CF}'],
    'm': ['\u{1D4C6}', '\u{217F}', '\u{04CD}', '\u{16D8}'],
    'n': ['\u{1D4C9}', '\u{0578}', '\u{03B7}', '\u{2116}'],
    'o': ['\u{1D4CA}', '\u{04E6}', '\u{0985}', '\u{0B66}'],
    'p': ['\u{1D4CD}', '\u{03C1}', '\u{0440}', '\u{2CA3}'],
    'q': ['\u{1D4CE}', '\u{051B}', '\u{2D55}', '\u{0466}'],
    'r': ['\u{1D4CF}', '\u{0433}', '\u{AB81}', '\u{1D216}'],
    's': ['\u{1D4D0}', '\u{0455}', '\u{ABB2}', '\u{10443}'],
    't': ['\u{1D4D1}', '\u{03C4}', '\u{04AD}', '\u{22A4}'],
    'u': ['\u{1D4D2}', '\u{057D}', '\u{144C}', '\u{222A}'],
    'v': ['\u{1D4D3}', '\u{2174}', '\u{1D20D}', '\u{0667}'],
    'w': ['\u{1D4D4}', '\u{051D}', '\u{0461}', '\u{13B9}'],
    'x': ['\u{1D4D5}', '\u{0445}', '\u{2D59}', '\u{2573}'],
    'y': ['\u{1D4D6}', '\u{0443}', '\u{04AF}', '\u{03B3}'],
    'z': ['\u{1D4D7}', '\u{1D22}', '\u{0499}', '\u{AB93}'],
    '0': ['\u{24EA}', '\u{1D7D8}', '\u{0ED0}', '\u{0AE6}'],
    '1': ['\u{2460}', '\u{1D7D9}', '\u{0E51}', '\u{0C21}'],
    '2': ['\u{2461}', '\u{1D7DA}', '\u{0A67}', '\u{0B67}'],
    '3': ['\u{2462}', '\u{1D7DB}', '\u{09E9}', '\u{ABAB}'],
    '4': ['\u{2463}', '\u{1D7DC}', '\u{0CEA}', '\u{118E}'],
    '5': ['\u{2464}', '\u{1D7DD}', '\u{0D6D}', '\u{104A5}'],
    '6': ['\u{2465}', '\u{1D7DE}', '\u{A9F6}', '\u{114D6}'],
    '7': ['\u{2466}', '\u{1D7DF}', '\u{0C67}', '\u{16EC}'],
    '8': ['\u{2467}', '\u{1D7E0}', '\u{0B6C}', '\u{1D7E6}'],
    '9': ['\u{2468}', '\u{1D7E1}', '\u{A76A}', '\u{1091}'],
    ' ': ['\u{2003}', '\u{205F}', '\u{3000}', '\u{2423}', '\u{2592}']
  };

  const animate = () => {
    charsRef.current = charsRef.current.map((char, index) => {
      const originalChar = inputText[index]?.toLowerCase();
      if (Math.random() < 0.2 && originalChar in unicodeMap) {
        const variations = unicodeMap[originalChar];
        return variations[Math.floor(Math.random() * variations.length)];
      }
      return char;
    });

    setDisplayText(charsRef.current.join(''));
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (inputText) {
      const startAnimationCycle = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        const runTimeout = 3000 + Math.random() * 2000;
        timeoutRef.current = setTimeout(() => {
          cancelAnimationFrame(animationRef.current);
          
          // Reset to normal text with proper spacing
          charsRef.current = inputText.split('');
          setDisplayText(inputText);
          
          const pauseTimeout = 1000 + Math.random() * 2000;
          timeoutRef.current = setTimeout(startAnimationCycle, pauseTimeout);
        }, runTimeout);
      };

      startAnimationCycle();
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [inputText]);

  return (
    <div className="App">
      <MatrixRain />
      <h1>MATRIX TERMINAL</h1>
      
      <textarea
        placeholder="ENTER INPUT..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="matrix-input"
        rows={5}
        cols={50}
      />
      
      <div className="matrix-output glitch-active">
        {displayText.split('').map((char, index) => (
          <span 
            key={index}
            className="matrix-glyph"
            style={{
              opacity: 0.8 + Math.random() * 0.2,
              animationDelay: `${index * 0.2}s`,
              marginRight: '0.2em'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;