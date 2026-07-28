import React, { useState } from 'react';
import { Delete, RotateCcw, History, Sparkles } from 'lucide-react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isRad, setIsRad] = useState(true);

  const handleNum = (val) => {
    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const handleOp = (op) => {
    if (display === 'Error') return;
    setEquation(equation + display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    if (display.length <= 1 || display === 'Error') {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleFunc = (func) => {
    try {
      let num = parseFloat(display);
      if (isNaN(num)) return;
      let res = 0;

      switch (func) {
        case 'sin':
          res = isRad ? Math.sin(num) : Math.sin((num * Math.PI) / 180);
          break;
        case 'cos':
          res = isRad ? Math.cos(num) : Math.cos((num * Math.PI) / 180);
          break;
        case 'tan':
          res = isRad ? Math.tan(num) : Math.tan((num * Math.PI) / 180);
          break;
        case 'sqrt':
          res = Math.sqrt(num);
          break;
        case 'sqr':
          res = Math.pow(num, 2);
          break;
        case 'log':
          res = Math.log10(num);
          break;
        case 'ln':
          res = Math.log(num);
          break;
        case 'inv':
          res = 1 / num;
          break;
        case 'fact':
          res = factorial(num);
          break;
        default:
          return;
      }
      
      const resStr = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(8)).toString();
      const entry = `${func}(${display}) = ${resStr}`;
      setHistory(prev => [entry, ...prev].slice(0, 10));
      setDisplay(resStr);
    } catch {
      setDisplay('Error');
    }
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= Math.min(n, 100); i++) result *= i;
    return result;
  };

  const handleEquals = () => {
    try {
      const fullEq = equation + display;
      // Sanitize equation for safe evaluation
      let sanitized = fullEq
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString());
      
      // Calculate
      // eslint-disable-next-line no-eval
      let result = Function('"use strict";return (' + sanitized + ')')();
      const resStr = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();
      
      const newHistoryEntry = `${fullEq} = ${resStr}`;
      setHistory(prev => [newHistoryEntry, ...prev].slice(0, 10));
      setDisplay(resStr);
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleConst = (c) => {
    if (c === 'pi') setDisplay(Math.PI.toFixed(6).toString());
    if (c === 'e') setDisplay(Math.E.toFixed(6).toString());
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl text-white">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-300">Scientific Engine</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRad(!isRad)}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 font-mono text-[10px] uppercase font-bold text-blue-400"
          >
            {isRad ? 'RAD' : 'DEG'}
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`p-1.5 rounded transition ${showHistory ? 'bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
            title="Toggle Calculation History"
          >
            <History className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screen Display */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-4 text-right overflow-hidden shadow-inner min-h-[90px] flex flex-col justify-end">
        <div className="text-slate-400 text-xs font-mono h-5 truncate tracking-wider">
          {equation || '\u00A0'}
        </div>
        <div className="text-3xl font-mono font-bold text-emerald-400 tracking-tight truncate mt-1">
          {display}
        </div>
      </div>

      {/* History Drawer */}
      {showHistory ? (
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 mb-4 max-h-48 overflow-y-auto text-xs font-mono">
          <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-800 text-slate-400">
            <span>Recent Calculations</span>
            <button onClick={() => setHistory([])} className="text-red-400 hover:underline text-[10px]">Clear</button>
          </div>
          {history.length === 0 ? (
            <p className="text-slate-600 text-center py-4">No calculation history yet</p>
          ) : (
            <div className="space-y-1">
              {history.map((h, idx) => (
                <div key={idx} className="text-slate-300 hover:text-emerald-400 cursor-pointer p-1 rounded hover:bg-slate-800 transition" onClick={() => setDisplay(h.split('=')[1]?.trim() || display)}>
                  {h}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* Grid Buttons */}
      <div className="grid grid-cols-5 gap-2 text-xs font-semibold">
        {/* Row 1 Scientific */}
        <button onClick={() => handleFunc('sin')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">sin</button>
        <button onClick={() => handleFunc('cos')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">cos</button>
        <button onClick={() => handleFunc('tan')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">tan</button>
        <button onClick={handleClear} className="p-2.5 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white font-bold transition">AC</button>
        <button onClick={handleBackspace} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center transition">
          <Delete className="w-4 h-4" />
        </button>

        {/* Row 2 Scientific */}
        <button onClick={() => handleFunc('sqrt')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">√x</button>
        <button onClick={() => handleFunc('sqr')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">x²</button>
        <button onClick={() => handleFunc('log')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">log</button>
        <button onClick={() => handleFunc('ln')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">ln</button>
        <button onClick={() => handleOp('÷')} className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-base transition">÷</button>

        {/* Row 3 Numbers & Ops */}
        <button onClick={() => handleFunc('fact')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">n!</button>
        <button onClick={() => handleNum('7')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">7</button>
        <button onClick={() => handleNum('8')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">8</button>
        <button onClick={() => handleNum('9')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">9</button>
        <button onClick={() => handleOp('×')} className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-base transition">×</button>

        {/* Row 4 Numbers & Ops */}
        <button onClick={() => handleConst('pi')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">π</button>
        <button onClick={() => handleNum('4')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">4</button>
        <button onClick={() => handleNum('5')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">5</button>
        <button onClick={() => handleNum('6')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">6</button>
        <button onClick={() => handleOp('-')} className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-base transition">-</button>

        {/* Row 5 Numbers & Ops */}
        <button onClick={() => handleConst('e')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">e</button>
        <button onClick={() => handleNum('1')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">1</button>
        <button onClick={() => handleNum('2')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">2</button>
        <button onClick={() => handleNum('3')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">3</button>
        <button onClick={() => handleOp('+')} className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-base transition">+</button>

        {/* Row 6 Bottom */}
        <button onClick={() => handleFunc('inv')} className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 transition">1/x</button>
        <button onClick={() => handleNum('0')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">0</button>
        <button onClick={() => handleNum('.')} className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-base transition">.</button>
        <button onClick={handleEquals} className="col-span-2 p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-base font-bold shadow-lg shadow-emerald-900/50 transition">
          =
        </button>
      </div>
    </div>
  );
}
