import React, { useState, useEffect, useRef } from 'react';
import { Flame, Play, RotateCcw, Award, ArrowUp, Zap } from 'lucide-react';

export default function DragonRunner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('dragon_high_score') || '0', 10);
  });

  const [playerY, setPlayerY] = useState(0); // 0 is ground
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(6);
  const [isNight, setIsNight] = useState(false);

  const requestRef = useRef();
  const lastTimeRef = useRef();
  const scoreRef = useRef(0);
  const isJumpingRef = useRef(false);
  const playerYRef = useRef(0);
  const obstaclesRef = useRef([]);

  // Physics constants
  const JUMP_FORCE = 13;
  const GRAVITY = 0.7;

  const handleJump = () => {
    if (!isPlaying) {
      startGame();
      return;
    }
    if (isGameOver) {
      restartGame();
      return;
    }
    if (!isJumpingRef.current && playerYRef.current === 0) {
      isJumpingRef.current = true;
      setIsJumping(true);
      playerVelocityY.current = JUMP_FORCE;
    }
  };

  const playerVelocityY = useRef(0);

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    scoreRef.current = 0;
    setPlayerY(0);
    playerYRef.current = 0;
    playerVelocityY.current = 0;
    isJumpingRef.current = false;
    setIsJumping(false);
    setObstacles([{ id: 1, x: 400, type: 'cactus', height: 35 }]);
    obstaclesRef.current = [{ id: 1, x: 400, type: 'cactus', height: 35 }];
    setGameSpeed(6);
  };

  const restartGame = () => {
    startGame();
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Space', 'ArrowUp', ' '].includes(e.key)) {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGameOver]);

  // Main RAF Loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    let obstacleTimer = 0;

    const gameLoop = (time) => {
      if (lastTimeRef.current !== undefined) {
        // Update Player Gravity
        if (isJumpingRef.current || playerYRef.current > 0) {
          playerYRef.current += playerVelocityY.current;
          playerVelocityY.current -= GRAVITY;

          if (playerYRef.current <= 0) {
            playerYRef.current = 0;
            isJumpingRef.current = false;
            setIsJumping(false);
          }
          setPlayerY(playerYRef.current);
        }

        // Update Score & Night Shift
        scoreRef.current += 0.2;
        const currentScore = Math.floor(scoreRef.current);
        setScore(currentScore);

        if (currentScore > highScore) {
          setHighScore(currentScore);
          localStorage.setItem('dragon_high_score', currentScore.toString());
        }

        if (currentScore > 0 && currentScore % 200 === 0) {
          setIsNight(prev => !prev);
        }

        // Move Obstacles
        obstacleTimer += 1;
        const currentSpeed = 6 + Math.min(Math.floor(currentScore / 100), 8);
        setGameSpeed(currentSpeed);

        const updatedObs = obstaclesRef.current
          .map(obs => ({ ...obs, x: obs.x - currentSpeed }))
          .filter(obs => obs.x > -50);

        // Spawn new obstacle
        const lastObs = updatedObs[updatedObs.length - 1];
        if (!lastObs || (lastObs && lastObs.x < 240 + Math.random() * 150)) {
          const type = Math.random() > 0.7 && currentScore > 100 ? 'bird' : 'cactus';
          updatedObs.push({
            id: Date.now() + Math.random(),
            x: 420,
            type: type,
            height: type === 'bird' ? 50 : 35
          });
        }

        // Collision Check
        // Dragon Box: x ~ 40..80, y ~ 0..playerY + 40
        const dragonX = 50;
        const dragonWidth = 35;
        const dragonY = playerYRef.current;
        const dragonHeight = 35;

        for (let obs of updatedObs) {
          const obsX = obs.x;
          const obsWidth = 25;
          const obsY = obs.type === 'bird' ? 35 : 0;
          const obsHeight = obs.height;

          // AABB Collision
          if (
            dragonX < obsX + obsWidth &&
            dragonX + dragonWidth > obsX &&
            dragonY < obsY + obsHeight &&
            dragonY + dragonHeight > obsY
          ) {
            setIsGameOver(true);
            setIsPlaying(false);
            return;
          }
        }

        obstaclesRef.current = updatedObs;
        setObstacles(updatedObs);
      }

      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, isGameOver, highScore]);

  return (
    <div className={`w-full max-w-md mx-auto rounded-2xl p-4 shadow-2xl transition-colors duration-500 select-none border ${
      isNight ? 'bg-slate-950 border-indigo-900 text-white' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      {/* Top Stats Bar */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
          <span>Dragon Runner</span>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <div className="text-slate-300">HI <span className="text-amber-400 font-bold">{highScore}</span></div>
          <div className="text-emerald-400 font-bold text-sm">{String(score).padStart(5, '0')}</div>
        </div>
      </div>

      {/* Runner Stage Frame */}
      <div 
        onClick={handleJump}
        className={`relative w-full h-48 border-2 border-slate-800 rounded-xl overflow-hidden cursor-pointer shadow-inner transition-colors duration-700 ${
          isNight ? 'bg-indigo-950/70' : 'bg-gradient-to-b from-sky-900/40 via-slate-900 to-amber-950/20'
        }`}
      >
        {/* Sky Background Elements */}
        {isNight ? (
          <div className="absolute top-3 right-6 w-8 h-8 rounded-full bg-amber-100 shadow-[0_0_12px_rgba(254,243,199,0.8)]" />
        ) : (
          <div className="absolute top-3 right-6 w-8 h-8 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
        )}

        {/* Clouds */}
        <div className="absolute top-6 left-12 w-12 h-3 bg-slate-700/30 rounded-full blur-[1px]" />
        <div className="absolute top-10 right-20 w-16 h-4 bg-slate-700/30 rounded-full blur-[1px]" />

        {/* Ground Line */}
        <div className="absolute bottom-0 inset-x-0 h-6 bg-amber-950/40 border-t-2 border-amber-600/60 flex items-center overflow-hidden">
          <div className="w-full border-t border-dashed border-amber-500/30" />
        </div>

        {/* Dragon Player */}
        <div
          className="absolute left-10 transition-none flex flex-col items-center z-10"
          style={{ bottom: `${24 + playerY}px` }}
        >
          {/* Dragon Visual SVG */}
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-tr from-amber-600 to-orange-400 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 border border-amber-300">
              <span className="text-lg">🐉</span>
            </div>
            {/* Flame Trail when jumping */}
            {isJumping && (
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-xs animate-ping">
                🔥
              </div>
            )}
          </div>
        </div>

        {/* Obstacles */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute z-10 flex items-center justify-center"
            style={{
              left: `${obs.x}px`,
              bottom: `${obs.type === 'bird' ? 70 : 24}px`
            }}
          >
            {obs.type === 'bird' ? (
              <div className="text-xl animate-bounce">🦅</div>
            ) : (
              <div className="w-6 h-9 bg-emerald-700 border-2 border-emerald-400 rounded-t-lg flex items-center justify-center shadow">
                <span className="text-xs">🌵</span>
              </div>
            )}
          </div>
        ))}

        {/* Start Overlay */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-20">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center text-orange-400 mb-2">
              <Flame className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Dragon Runner</h4>
            <p className="text-slate-400 text-xs mt-1 mb-3">Tap stage or press Space to Jump!</p>
            <button
              onClick={startGame}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-900/50"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-20">
            <h4 className="text-xl font-extrabold text-rose-500 mb-1">Game Over!</h4>
            <p className="text-slate-300 text-xs mb-3">Score: <span className="text-emerald-400 font-mono font-bold">{score}</span></p>
            <button
              onClick={restartGame}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-900/50 flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        )}
      </div>

      {/* Control Hint Bar */}
      <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Speed: {gameSpeed}x</span>
        </div>
        <button
          onClick={handleJump}
          className="px-4 py-2 bg-slate-800 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow"
        >
          <ArrowUp className="w-4 h-4" /> Tap To Jump
        </button>
      </div>
    </div>
  );
}
