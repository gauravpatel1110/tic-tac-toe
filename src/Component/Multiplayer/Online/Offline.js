import Player from "../../Player";
import Board from "../../Board";
import {useContext} from "react";
import {GameContext} from "../../../App";
export default function Offline(){
   const context = useContext(GameContext).gameData;
    return(
        <>
            <h2 className={'font-sans text-3xl mt-10'}>{context.firstTurn.length > 0 && "You Selected "+(context.firstTurn=="1"?"player - 1":"player - 2")}</h2>
            <div className='m-2 lg:flex lg:justify-center lg:gap-x-4 lg:mt-16 sm:mt-10'>
                <div className={'lg:w-1/4'}>
                    <label htmlFor="">Player-1</label>
                    <Player playerNumber={1} current={(context.firstTurn=='1'?true:false)} winningStatus={context.p1Status} sign="O"/>
                </div>
                <div className={'lg:w-1/4'}>
                    <label htmlFor="">Player-2</label>
                    <Player playerNumber={2} current={(context.firstTurn=='2'?true:false)} winningStatus={context.p2Status} sign="X"/>
                </div>
            </div>
            {
                context.gameStatus ==1 &&
                <div className='flex-row BoardContainer'>
                    <Board firstTurn={context.firstTurn} gameStatus={context.gameStatus}/>
                </div>
            }

            <div className={'flex justify-center lg:mt-16 sm:mt-10'}>
                {context.gameStatus==0 &&
                    <button className={'bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'} onClick={()=>context.setGameStatus(1)}>Start Game</button>
                }
                {context.gameStatus==3 &&
                    <button className={'bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'} onClick={()=>context.setGameStatus(0)}>Re-Start Game</button>
                }
            </div>
        </>
    );
}