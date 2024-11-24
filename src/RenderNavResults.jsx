import { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";

export default function RenderNavResults(props) {
    const [currentView, setCurrentView] = useContext(AppContext);
    const [lastView, setLastView] = useState("");
    const [incorrect, setIncorrect] = useState(0)
    let algorithm = useContext(AppContext);
    algorithm = algorithm[2];

    useEffect(() => {
        if (props.index >= algorithm.length) {
            for (let i = 0; i < algorithm.length; ++i) {
                if (document.getElementById(`letter_${i}`).style.color === 'red') {
                    setIncorrect(prevIncorrect => prevIncorrect + 1);
                }
            }
            setLastView(currentView);
            setCurrentView("showTime");
        }
    }, [props.index])

    const hanldeChangeTest = (newView) => {
        setCurrentView(newView);
        setIncorrect(0);
        props.setIndex(0);
        props.setTopCode(0);
        props.setTime(0);
        props.setTimerActive(false);

        algorithm.forEach((e,k) => {
            const spanId = document.getElementById(`letter_${k}`);
            if (spanId) {
                spanId.style.color = "#51597D";
                spanId.style.borderLeft = "0px solid #E0B200";
            }
        })

    };

    return (
        <div>
            <nav className='text-base mx-auto flex justify-center bg-[#16161E] font-normal'>

                <button onClick={() => hanldeChangeTest('custom')}
                    className={currentView === 'custom' ? 'text-white' : 'text-noStyle'}>
                    Custom
                </button>

                <button onClick={() => hanldeChangeTest('infinite')}
                    className={currentView === 'infinite' ? 'text-white' : 'text-noStyle'} >
                    Infinite
                </button>

                <button onClick={() => hanldeChangeTest('random-algorithm')}
                    className={currentView === 'random-algorithm' ? 'text-white' : 'text-noStyle'}>
                    Random Algorithm
                </button>

                <button onClick={() => hanldeChangeTest('time')}
                    className={currentView === 'time' ? 'text-white' : 'text-noStyle'}>
                    Time
                </button>

            </nav>
            <section className={currentView === 'showTime' ? 'block' : 'hidden'}>
                <section className='container text-code leading-12 h-[400px]  flex flex-col gap-5'>
                    <h2 className='text-[35px] mb-[15px]'>Results</h2>

                    <h3>Correct characters: <span className='text-brand begin'>{algorithm.length - incorrect}</span></h3>
                    <h3 className='pb-[10px] border-b border-white '>Incorrect characters: <span className='text-brand begin'>{incorrect}</span></h3>
                    <h3 className='mt-[5px] mb-[20px] text-[30px]'>wpm: <span className='text-brand begin'> {Math.round(((algorithm.length - incorrect) / 5)) * Math.round(60 / (props.time === 0 ? 1 : props.time))} </span></h3>
                    <h3>Time : <span className='text-brand begin'>{props.time}S</span></h3>

                </section>
                <button onClick={() => hanldeChangeTest(lastView)}>Restar</button>
            </section>
        </div>
    )
}