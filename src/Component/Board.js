import _ from 'lodash';
import {useContext, useState} from "react";
import {GameContext} from "../App";
import GameEngine from "../Lib/GameEngine";

export default function Board (props){
    const context = useContext(GameContext);
    const [turn,setTurn] = useState(context.gameData.firstTurn);
    let playerSign = {"1":"o","2":"x"};
    const engine = new GameEngine();
    let box= engine.generateBoxData();
    const [Box,setBox]=useState(box);

    function changeTurn(turn){
        return turn == "1"?"2":"1";
    }

    function selectBox(i){
        engine.setCurrentSelection(i);
        engine.setTurn((turn || props.firstTurn));
        engine.setPlayerSign((playerSign[turn] || playerSign[props.firstTurn]));
        let box= engine.updateSelectionData(Box);
        setBox(box);
        if(engine.getUpdateSelectionStatus()){
            setTurn(changeTurn(turn));
            let result = engine.getWinner();
            if(engine.gameFinish){
                context.gameData.setGameStatus(3);
                alert("Draw");
            }
            if(result.winner){
                if(result.player=="1"){
                    alert("Player 1 Win");
                    let count = context.gameData.p1Status;
                    count++;
                    context.gameData.setP1Status(count);
                }
                if(result.player=="2"){
                    alert("Player 2 Win");
                    let count = context.gameData.p2Status;
                    count++;
                    context.gameData.setP2Status(count);
                }
                context.gameData.setGameStatus(3)
            }
        }
    }
    return (
        <>
            <div className={'App-row'}>
                { Box.map(function(arr){
                    return <div key={_.map(arr,(i)=>i.index).toString()} className={'App-column'}>{
                    arr.map(function (i){
                        return <div onClick={()=>selectBox(i)} className={'box'} key={i.index}>{i.sign}</div>;
                    })}
                    </div>
                  })
                }
            </div>
        </>
    );
}
