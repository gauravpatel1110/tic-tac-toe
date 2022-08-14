import Player from "./Component/Player";
import Board from "./Component/Board";
import {useState, createContext, useEffect} from "react";
import './App.css';

export const GameContext = createContext({});

function App() {

    const [gameStatus,setGameStatus] = useState(0); // 0 stop 1 running 3 finish
    const [p1Status,setP1Status]=useState(0);
    const [p2Status,setP2Status]=useState(0);
    const [firstTurn,setFirstTurn] = useState("1");
    const gameData={'gameData':{gameStatus,p1Status,p2Status,firstTurn,setGameStatus,setP1Status,setP2Status,setFirstTurn}};
    return (
      <div className="App">
          <GameContext.Provider value={gameData}>
              <header className="flex flex-col mt-10">
                  <h1 className={'font-mono text-4xl'}>Tick Tac Toe </h1>
                  <h2 className={'font-sans text-3xl mt-10'}>{firstTurn.length > 0 && "You Selected "+(firstTurn=="1"?"player - 1":"player - 2")}</h2>
              </header>
              <div className='m-2 lg:flex lg:justify-center lg:gap-x-4 lg:mt-16 sm:mt-10'>
                  <div className={'lg:w-1/4'}>
                      <label htmlFor="">Player-1</label>
                      <Player playerNumber={1} current={(firstTurn=='1'?true:false)} winningStatus={p1Status} sign="O"/>
                  </div>
                  <div className={'lg:w-1/4'}>
                      <label htmlFor="">Player-2</label>
                      <Player playerNumber={2} current={(firstTurn=='2'?true:false)} winningStatus={p2Status} sign="X"/>
                  </div>
              </div>
              {
                  gameStatus ==1 &&
                  <div className='flex-row BoardContainer'>
                      <Board firstTurn={firstTurn} gameStatus={gameStatus}/>
                  </div>
              }

              <div className={'flex justify-center lg:mt-16 sm:mt-10'}>
                  {gameStatus==0 &&
                      <button className={'bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'} onClick={()=>setGameStatus(1)}>Start Game</button>
                  }
                  {gameStatus==3 &&
                      <button className={'bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'} onClick={()=>setGameStatus(0)}>Re-Start Game</button>
                  }
              </div>
          </GameContext.Provider>
      </div>
  );
}

export default App;
