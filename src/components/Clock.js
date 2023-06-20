import React, { useEffect, useRef } from 'react'
import { useState } from 'react';

export default function Clock() {
  let time = new Date().toLocaleTimeString();
  const [date, setDate] = useState(time);
  const updatetime = () => {
    time = new Date().toLocaleTimeString();
    setDate(time)
  }
  setInterval(updatetime, 1000)

  const [timee, settime] = useState(0)
  const [running, setrunning] = useState(true)

  const timer = useRef()
  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        settime(pre => pre + 1)
      }, 1000)
    }
    return () => clearInterval(timer.current);
  }, [running]);

  const format = (timee) => {
    let hour = Math.floor(timee / 60 / 60 % 24)
    let minutes = Math.floor(timee / 60 % 60)
    let second = Math.floor(timee % 60)

    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    second = second < 10 ? "0" + second : second;

    return hour + ":" + minutes + ":" + second
  }

  const restart = () => {
    settime(0)
  }

  return (<>
    <div className='text-center shadow-red-600 text-2xl font-sans font-bold p-6'>
      DIGITAL CLOCK
    </div>
    <div className='text-red-800 shadow-xl shadow-red-700 rounded-3xl bg-slate-900  h-fit w-fit p-12 text-3xl text-center text- mr-auto ml-auto'>
      <span className='font-mono p-3 rounded-md shadow-inner shadow-red-400'>{date}</span>
    </div>
    <div className='text-center shadow-red-600 text-2xl font-sans font-bold  my-8'>
      TIMER
    </div>
    <div className='text-red-800 shadow-xl shadow-red-700 rounded-3xl bg-slate-900  h-fit w-fit p-12 text-3xl text-center text- mr-auto ml-auto'>
      <span className='font-mono p-3 rounded-md shadow-inner shadow-red-400'>{format(timee)}
      </span>
      <div className='flex my-10 gap-7'>
        <span>
          <button onClick={restart} className='bg-green-500 p-2 rounded-2xl active:scale-90 w-28 text-2xl'>Restart</button>
        </span>
        <span>
          <button onClick={() => {
            if (running)
              clearInterval(timer.current);
            setrunning(!running)
          }} className='bg-white p-2 active:scale-90 w-28 rounded-2xl text-2xl'>{running ? 'stop' : 'resume'}
          </button>
        </span>

      </div>

    </div>
  </>
  )
}
