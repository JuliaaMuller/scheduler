import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    if (replace) back();
    setHistory((prev) => [...prev, newMode]);
    return setMode(newMode);
  };
  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history.slice(0, history.length - 1)]; // alternate way is to use push and pop
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}
// function transition (newMode) {
//   setMode(newMode)
// }
