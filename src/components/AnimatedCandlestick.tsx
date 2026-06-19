import { useEffect, useState } from "react";

export function AnimatedCandlestick() {
  const [candles, setCandles] = useState<{ h: number; y: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    // Generate random candlestick data
    const generateCandles = () => {
      const newCandles = Array.from({ length: 15 }).map((_, i) => {
        const isUp = Math.random() > 0.5;
        const color = isUp ? "bg-neon-blue" : "bg-neon-purple";
        const height = Math.random() * 40 + 20; // 20% to 60%
        const yPos = Math.random() * 40 + 10; // 10% to 50%
        const delay = i * 0.1;
        
        return { h: height, y: yPos, color, delay, isUp };
      });
      setCandles(newCandles);
    };

    generateCandles();
    const interval = setInterval(generateCandles, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-end justify-between px-2 pb-4 gap-1 sm:gap-2">
      {candles.map((candle, i) => (
        <div key={i} className="relative flex flex-col items-center justify-end w-full h-full group">
          {/* Wick */}
          <div 
            className="absolute w-[1px] bg-muted-foreground/40 transition-all duration-1000 ease-in-out"
            style={{ 
              height: `${candle.h + 20}%`, 
              bottom: `${candle.y - 10}%`,
              transitionDelay: `${candle.delay}s`
            }}
          ></div>
          
          {/* Body */}
          <div 
            className={`${candle.color} absolute w-full max-w-[12px] sm:max-w-[16px] rounded-sm transition-all duration-1000 ease-in-out opacity-80 group-hover:opacity-100 group-hover:shadow-[0_0_10px_currentColor]`}
            style={{ 
              height: `${candle.h}%`, 
              bottom: `${candle.y}%`,
              transitionDelay: `${candle.delay}s`
            }}
          ></div>
        </div>
      ))}
      
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-[1px] bg-border/30 absolute top-1/4"></div>
        <div className="w-full h-[1px] bg-border/30 absolute top-2/4"></div>
        <div className="w-full h-[1px] bg-border/30 absolute top-3/4"></div>
      </div>
    </div>
  );
}
