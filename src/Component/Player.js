import {useContext, useState} from "react";
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
          <div onClick={()=>changeUser(props.playerNumber)} className={"flex grid-cols-2 justify-between border-black border-2 " + (props.current==true?"current":"")}>
              <div className="m-1 items-start">{props.sign}</div>
              <div className="mr-2 m-1 items-end">{props.winningStatus}</div>
          </div>
        </>
    );

}