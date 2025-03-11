"use client"; // Enables client-side rendering for this component

import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React

// Define the LapTime type
type LapTime = number;

export default function StopWatch() {
  // State to manage whether the stopwatch is running
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // State to manage the elapsed time in milliseconds
  const [time, setTime] = useState<number>(0);
  // State to manage the list of lap times
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);

  // useEffect to handle the stopwatch timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Function to handle starting the stopwatch
  const handleStart = () => {
    setIsRunning(true);
  };

  // Function to handle stopping the stopwatch
  const handleStop = () => {
    setIsRunning(false);
  };

  // Function to handle resetting the stopwatch
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
  };

  // Function to handle recording a lap time
  const handleLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  // Calculate minutes, seconds, and milliseconds from the elapsed time
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  // JSX return statement rendering the Stopwatch UI
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-bold">Stopwatch</div>
          <div className="text-lg text-gray-600">
            Track your time with this stopwatch.
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 p-4">

          {/* Display the elapsed time */}
          <div className="text-8xl font-bold">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}.
            {milliseconds.toString().padStart(2, "0")}
          </div>

          {/* div to control the stopwatch */}
          <div className="flex gap-4">
            <div
              onClick={isRunning ? handleStop : handleStart}
              className="px-6 py-2 text-lg font-medium rounded-lg"
            >
              {isRunning ? "Stop" : "Start"}
            </div>
            <div
              onClick={handleReset}
              className="px-6 py-2 text-lg font-medium rounded-lg"
            >
              Reset
            </div>
            <div
              onClick={handleLap}
              className="px-6 py-2 text-lg font-medium rounded-lg"
            >
              Lap
            </div>
          </div>
          {/* Display the list of lap times */}
          <div className="w-full max-w-md">
            <div className="overflow-hidden">
              <div className="bg-gray-200">
                <div className="text-xl font-semibold">
                  Lap Times
                </div>
              </div>
              <div className="max-h-[300px] overflow-auto p-0">
                <div>
                  <div>
                    <div>
                      <div className="text-left">Lap</div>
                      <div className="text-right">Time</div>
                    </div>
                  </div>
                  <div>
                    {lapTimes.map((lapTime, index) => (
                      <div key={index}>
                        <div className="font-medium">
                          {index + 1}
                        </div>
                        <div className="text-right">
                          {Math.floor(lapTime / 60000)
                            .toString()
                            .padStart(2, "0")}
                          :
                          {Math.floor((lapTime % 60000) / 1000)
                            .toString()
                            .padStart(2, "0")}
                          :
                          {Math.floor((lapTime % 1000) / 10)
                            .toString()
                            .padStart(2, "0")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
