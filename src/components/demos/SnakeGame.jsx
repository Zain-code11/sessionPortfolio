import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Award, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Gamepad2 } from 'lucide-react';

const GRID_SIZE = 16;
const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 }
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_SPEED = 140;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 12, y: 8 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snake_high_score') || '0', 10);
  });
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const gameRef = useRef(null);

  // Generate random food
  const generateFood = useCallback((currentSnake) => {
    while (true) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      const collision = currentSnake.some(segment => segment.x === x && segment.y === y);
      if (!collision) return { x, y };
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ') {
        setIsPaused(prev => !prev);
        return;
      }

      if (isGameOver || isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isGameOver, isPaused]);

  // Main game tick logic
  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        // Check Wall Collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check Food Eating
        if (head.x === food.x && head.y === food.y) {
          const newScore = score + 10;
          setScore(newScore);
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snake_high_score', newScore.toString());
          }
          // Increase speed slightly
          if (speed > 70) setSpeed((prev) => prev - 2);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [direction, food, isGameOver, isPaused, score, highScore, speed, generateFood]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsGameOver(false);
    setIsPaused(false);
    setFood({ x: 12, y: 8 });
  };

  const setDirMobile = (newDir) => {
    if (isGameOver) return;
    if (isPaused) setIsPaused(false);
    
    // Prevent 180 turn
    if (newDir.x !== 0 && direction.x === -newDir.x) return;
    if (newDir.y !== 0 && direction.y === -newDir.y) return;
    setDirection(newDir);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl text-white select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <Gamepad2 className="w-4 h-4" />
          <span>Nokia Snake Game</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-mono text-xs">
            Score: <span className="text-emerald-400 font-bold">{score}</span>
          </div>
          <div className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-mono text-xs flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-400" />
            <span className="text-amber-400 font-bold">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Game Board Canvas / Grid */}
      <div 
        ref={gameRef}
        className="relative w-full aspect-square bg-slate-950 border-2 border-slate-800 rounded-xl overflow-hidden shadow-inner grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Render Grid Cells */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);

          const isHead = snake[0].x === x && snake[0].y === y;
          const isBody = snake.slice(1).some((s) => s.x === x && s.y === y);
          const isFoodCell = food.x === x && food.y === y;

          return (
            <div
              key={index}
              className={`w-full h-full border-[0.5px] border-slate-900/40 transition-colors ${
                isHead
                  ? 'bg-emerald-400 rounded-sm shadow-md shadow-emerald-500/50 scale-105 z-10'
                  : isBody
                  ? 'bg-emerald-600/90 rounded-sm'
                  : isFoodCell
                  ? 'bg-rose-500 rounded-full animate-pulse scale-90 shadow-lg shadow-rose-500/50'
                  : ''
              }`}
            />
          );
        })}

        {/* Start / Pause Overlay */}
        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-20">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mb-3">
              <Play className="w-6 h-6 ml-0.5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">React Snake Game</h4>
            <p className="text-slate-400 text-xs text-center mb-4">Use Arrow Keys or D-Pad below to play!</p>
            <button
              onClick={() => setIsPaused(false)}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/50 transition"
            >
              Start Playing
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 z-20 animate-fade-in">
            <h4 className="text-xl font-extrabold text-rose-500 mb-1">Game Over!</h4>
            <p className="text-slate-300 text-xs mb-1">Final Score: <span className="text-emerald-400 font-mono font-bold">{score}</span></p>
            <p className="text-slate-400 text-[11px] mb-4">High Score: <span className="text-amber-400 font-mono">{highScore}</span></p>
            <button
              onClick={restartGame}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between my-3 px-1">
        <button
          onClick={() => setIsPaused(!isPaused)}
          disabled={isGameOver}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={restartGame}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart
        </button>
      </div>

      {/* Touch D-Pad Controls for Mobile / Easy Play */}
      <div className="mt-2 flex flex-col items-center gap-1">
        <button
          onClick={() => setDirMobile({ x: 0, y: -1 })}
          className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center transition shadow"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => setDirMobile({ x: -1, y: 0 })}
            className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center transition shadow"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setDirMobile({ x: 1, y: 0 })}
            className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center transition shadow"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => setDirMobile({ x: 0, y: 1 })}
          className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center transition shadow"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
