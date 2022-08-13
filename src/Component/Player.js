import {useContext} from "react";
import {GameContext} from "../App";
export default function Player(props){
    const context = useContext(GameContext);
    function changeUser(number){
        let gameStatus = context.gameData.gameStatus;
        if(gameStatus==0){
            let player = number=="1"?"1":"2";
            context.gameData.setFirstTurn(player);
        }
    }
    return (
        <>
          <div onClick={()=>changeUser(props.playerNumber)} className='App-row PlayerStatus'>
              <div className="PlayerSign">{props.sign}</div>
              <div className="PlayerCount">{props.winningStatus}</div>
          </div>
        </>
    );

}