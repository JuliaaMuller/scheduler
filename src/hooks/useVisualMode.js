import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
// Function to switch between the different modes (CREATE, EMPTY, CONFIRM, EDIT, ERROR).
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) setHistory(prev => prev.slice(0, prev.length - 1));
    setHistory(prev => [...prev, newMode]);
  };
// Function allowing user to go back to the previous state skipping STATUS and CONFIRM mode .
  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        const newHistory = prev.slice(0, prev.length - 1);
        setMode(newHistory[newHistory.length - 1]);
        return newHistory;
      });
    }
  };
  return { mode, transition, back };
};

