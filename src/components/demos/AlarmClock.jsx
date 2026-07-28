import React, { useState, useEffect, useRef } from 'react';
import { Clock, Bell, Plus, Trash2, Volume2, VolumeX, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AlarmClock() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:30', label: 'Morning Standup & Coding', active: true },
    { id: 2, time: '14:00', label: 'React Intern Assignment Review', active: true }
  ]);
  const [newTime, setNewTime] = useState('08:00');
  const [newLabel, setNewLabel] = useState('New Alarm');
  const [activeTrigger, setActiveTrigger] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioCtxRef = useRef(null);

  // Live Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);

      // Check alarms
      const currentHHMM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const currentSeconds = now.getSeconds();

      if (currentSeconds === 0) {
        const triggered = alarms.find(a => a.active && a.time === currentHHMM);
        if (triggered && !activeTrigger) {
          setActiveTrigger(triggered);
          if (soundEnabled) playAlarmChime();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms, activeTrigger, soundEnabled]);

  const playAlarmChime = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.log("Audio play error", e);
    }
  };

  const handleAddAlarm = (e) => {
    e.preventDefault();
    if (!newTime) return;
    const item = {
      id: Date.now(),
      time: newTime,
      label: newLabel || 'Alarm',
      active: true
    };
    setAlarms([...alarms, item]);
    setNewLabel('New Alarm');
  };

  const toggleAlarm = (id) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter(a => a.id !== id));
  };

  const formatHours = (date) => {
    let hours = date.getHours();
    if (!is24Hour) {
      hours = hours % 12 || 12;
    }
    return String(hours).padStart(2, '0');
  };

  const amPm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl text-white relative overflow-hidden">
      {/* Alarm Triggered Modal Banner */}
      {activeTrigger ? (
        <div className="absolute inset-0 bg-indigo-950/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center animate-pulse">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center mb-4 text-rose-400">
            <Bell className="w-8 h-8 animate-bounce" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Alarm Triggered!</h3>
          <p className="text-rose-300 text-sm font-semibold mb-2">{activeTrigger.time}</p>
          <p className="text-slate-300 text-xs mb-6 max-w-xs">{activeTrigger.label}</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                playAlarmChime();
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-200"
            >
              Test Chime
            </button>
            <button
              onClick={() => setActiveTrigger(null)}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-xs font-bold rounded-lg text-white shadow-lg"
            >
              Dismiss Alarm
            </button>
          </div>
        </div>
      ) : null}

      {/* Clock Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">Digital Alarm Clock</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 font-mono text-[10px] text-indigo-300"
          >
            {is24Hour ? '24H' : '12H'}
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Toggle Audio Synth"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Main Digital Clock Display */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 text-center mb-5 shadow-inner relative">
        <div className="text-4xl sm:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 tracking-tight">
          {formatHours(time)}:{String(time.getMinutes()).padStart(2, '0')}
          <span className="text-xl text-indigo-400 ml-1 font-sans font-medium">:{String(time.getSeconds()).padStart(2, '0')}</span>
          {!is24Hour && <span className="text-xs font-sans text-slate-400 ml-2 uppercase font-semibold">{amPm}</span>}
        </div>
        <div className="text-xs text-slate-400 mt-2 font-medium tracking-wide">
          {time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Add New Alarm Form */}
      <form onSubmit={handleAddAlarm} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 mb-4 space-y-2">
        <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-indigo-400" /> Add New Alarm
        </div>
        <div className="flex gap-2">
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Alarm label..."
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
          >
            Add
          </button>
        </div>
      </form>

      {/* Alarm List */}
      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
          <span>Your Alarms ({alarms.length})</span>
          <span>Status</span>
        </div>
        {alarms.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-3">No alarms configured</p>
        ) : (
          alarms.map((alarm) => (
            <div
              key={alarm.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
                alarm.active ? 'bg-slate-800/80 border-indigo-500/30 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleAlarm(alarm.id)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                    alarm.active ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      alarm.active ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <div>
                  <div className="font-mono text-sm font-bold">{alarm.time}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{alarm.label}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTrigger(alarm);
                    if (soundEnabled) playAlarmChime();
                  }}
                  className="p-1 rounded text-xs text-indigo-400 hover:bg-indigo-500/10"
                  title="Test trigger"
                >
                  Test
                </button>
                <button
                  onClick={() => deleteAlarm(alarm.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
