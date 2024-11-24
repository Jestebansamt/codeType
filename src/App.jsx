import React, { useState, useEffect } from 'react';
import randomAlgorithm from './data/algorithms';
import reservedWords from './data/reservedWords';
import RenderAlgorithm from './RenderAlgorithm';
import RenderNavResults from './RenderNavResults';

export const AppContext = React.createContext();

export default function App() {
  const [currentView, setCurrentView] = useState('random-algorithm');
  const [index, setIndex] = useState(0);
  const [topCode, setTopCode] = useState(0);
  const [colors, setColors] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(0);

  const algorithm = randomAlgorithm.algorithm.replace(/ {4}/g, '').replace(/\n/g, '⏎').split('');

  let newColors = Array(algorithm.length + 1).fill("white");

  useEffect(() => {
    let cIndex = 0
    let stringChar = "";
    for (const char of algorithm) {
      const isNumber = /\d+/.test(char);
      const isSpecialCharacter = /[^a-zA-Z0-9]/.test(char);
      if (!/[a-zA-Z]/.test(char)) {
        for (let j = cIndex; j >= cIndex - stringChar.length; j--) {
          newColors[j] = (reservedWords[stringChar]) ? "#BB79A9" : (reservedWords[stringChar] === "#FF9046") ? "#FF9046" : "white";
        }
        stringChar = "";
        if (isNumber) newColors[cIndex] = '#FF9046';
        else if (isSpecialCharacter) newColors[cIndex] = '#89DDFF';
      }
      else {
        stringChar += char;
      }
      cIndex++;
    }
    setColors(newColors);
  }, [])

  const applyStyle = (x, style) => {
    const e = document.getElementById(`letter_${x}`);
    if (e) Object.assign(e.style, style);
  };

  const handleKeyDown = (event) => {
    const keyPress = (event.keyCode === 13) ? '⏎' : event.key;
    if (keyPress === "Backspace" && index > 0) {
      applyStyle(index, { borderLeft: "0px solid #E0B200" });
      applyStyle(index - 1, { borderLeft: "1px solid #E0B200", color: "#51597D" });
      setIndex(prevIndex => prevIndex - 1);
      algorithm[index - 1] === '⏎' && setTopCode(prevTopCode => prevTopCode - 55);
    }
    else if (keyPress.length <= 1 && index < algorithm.length) {

      let style = algorithm[index] === '⏎' ? (algorithm[index] === keyPress ? '#E0B200' : 'red') : (algorithm[index] === keyPress ? colors[index] : 'red');
      algorithm[index] === '⏎' && setTopCode(prevTopCode => prevTopCode + 55);

      applyStyle(index, { color: style });
      applyStyle(index + 1, { borderLeft: "1px solid #E0B200" });
      applyStyle(index, { borderLeft: "0px solid #E0B200" });
      setIndex(prevIndex => prevIndex + 1);
    }

  };

  useEffect(() => {
    let timer = null;
    if (timerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    }
  }, [timerActive])

  useEffect(() => {
    if (index > 0 && !timerActive) {
      setTimerActive(true);
    }
    else if (timerActive && index >= algorithm.length) {
      setTimerActive(false);
    }
  }, [index]);

  useEffect(() => {
    if (index <= algorithm.length) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [index, newColors]);

  return (
    <AppContext.Provider value={[currentView, setCurrentView, algorithm]}>
      <h1 className="text-h1 font-primary text-center mt-[75px]">CodeType</h1>
      <RenderNavResults setIndex={setIndex} setTopCode={setTopCode} setTime={setTime} setTimerActive={setTimerActive} time={time} index={index} />

      <main className={currentView === 'random-algorithm' ? 'block' : 'hidden'}>
        <section className='container text-code leading-[55px] h-[250px] overflow-y-hidden whitespace-nowrap' >
          <section id="random-algorithm" >
            <h4 className='text-brand begin text-center mb-[10px]'>{index}/{algorithm.length}</h4>
            <RenderAlgorithm typeTest="random-algorithm" paddingTop={topCode} />
          </section>
        </section>
        <div className='vanish-end'></div>
        <section className='text-base mb[10px] text-center w-auto text-[#D9D9D9]'>
          <a className='border-b border-white' href={randomAlgorithm.url}>{randomAlgorithm.name}</a>
        </section>
        
      </main>
    </AppContext.Provider>
  );
}