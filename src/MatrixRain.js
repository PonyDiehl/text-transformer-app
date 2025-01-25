import { useEffect } from 'react';

const MatrixRain = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()₿Φ∴↯ÆÑÞßæðø£¥₿₽ΦΨΩαβγΔΣΠλμνξ∀∂∃∅∇∈∉∩∪∧∨∴∵∼∽≅≈≠≡≤≥↨↕↧↦↯↲↳↴↵↶↷↺↻';
    const drops = Array(Math.floor(canvas.width / 20)).fill(0);

    // Rain animation
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '20px monospace';

      drops.forEach((drop, i) => {
        // Random brightness with 20% chance of being brighter
        const isBright = Math.random() < 0.2;
        ctx.fillStyle = isBright ? 'rgba(0, 255, 0, 0.9)' : 'rgba(0, 255, 0, 0.4)';
        
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, drop * 20);
        drops[i] = drop > canvas.height/20 || Math.random() > 0.95 ? 0 : drop + 1;
      });

      // Add occasional bright streaks
      if(Math.random() < 0.02) {
        ctx.fillStyle = 'rgba(0, 255, 0, 1)';
        const x = Math.floor(Math.random() * canvas.width);
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, 0);
      }
    };

    const interval = setInterval(draw, 50);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return null;
};

export default MatrixRain;