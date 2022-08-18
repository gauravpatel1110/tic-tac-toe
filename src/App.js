import {useState, createContext} from "react";
import './App.css';
import Offline from "./Component/Multiplayer/Online/Offline";

export const GameContext = createContext({});

function App() {

    const [gameStatus,setGameStatus] = useState(0); // 0 stop 1 running 3 finish
    const [p1Status,setP1Status]=useState(0);
    const [p2Status,setP2Status]=useState(0);
    const [firstTurn,setFirstTurn] = useState("1");
    const[gameType,setGameType] = useState("offline");
    const gameData={'gameData':{gameStatus,p1Status,p2Status,firstTurn,setGameStatus,setP1Status,setP2Status,setFirstTurn,gameType,setGameType}};
    return (
      <div className="App">
          <GameContext.Provider value={gameData}>
              <header className="flex flex-col mt-10">
                  <h1 className={'font-mono text-4xl'}>Tick Tac Toe </h1>
              </header>
              <div className={'flex flex-col justify-center items-center mt-5'}>
                  <label htmlFor="gameType"
                         className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-400">Select an
                      Game Type</label>
                  <select onChange={(e)=>setGameType(e.currentTarget.value)} id="gameType"
                          className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option defaultValue={'selected'} value="offline">Offline</option>
                      <option value="online">Online</option>
                  </select>
              </div>
              {gameType=="offline" &&
                  <Offline></Offline>
              }
          </GameContext.Provider>
      </div>
  );
}

export default App;
