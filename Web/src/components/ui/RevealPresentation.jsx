// src/components/RevealPresentation.jsx
import React, { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/moon.css'; // You can change the theme (e.g., 'white', 'moon', 'night', etc.)

const RevealPresentation = () => {
  const deckRef = useRef();

  useEffect(() => {
    const deck = new Reveal(deckRef.current, {
      hash: true,
      slideNumber: true,
      transition: 'slide',
    });
    deck.initialize();
  }, []); 

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">
        <section>
          <h2>Welcome to Reveal.js</h2>
          <p>This is your first slide!</p>
        </section>
        <section>
          <h2>Another Slide</h2>
          <ul>
            <li>Bullet 1</li>
            <li>Bullet 2</li>
            <li>Bullet 3</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RevealPresentation;
