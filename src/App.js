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
              <header className="App-header">
                  <h1>Welcome to Tick Tac Toe </h1>
                  <h2>{firstTurn.length > 0 && "You Selected "+(firstTurn=="1"?"player 1":"player 2")}</h2>
              </header>
              <div className='App-row PlayerContainer'>
                  <label htmlFor="">Player-1</label>
                  <Player playerNumber={1} winningStatus={p1Status} sign="O"/>
                  <label htmlFor="">Player-2</label>
                  <Player playerNumber={2} winningStatus={p2Status} sign="X"/>
              </div>
              {
                  gameStatus ==1 &&
                  <div className='App-row BoardContainer'>
                      <Board firstTurn={firstTurn} gameStatus={gameStatus}/>
                  </div>
              }

              <div className={'App-row StartGame'}>
                  {gameStatus==0 &&
                      <button onClick={()=>setGameStatus(1)}>Start Game</button>
                  }
                  {gameStatus==3 &&
                      <button onClick={()=>setGameStatus(0)}>Re-Start Game</button>
                  }
              </div>
          </GameContext.Provider>
      </div>
  );
}

export default App;
