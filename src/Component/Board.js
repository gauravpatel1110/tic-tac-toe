import _ from 'lodash';
import {useContext, useEffect, useState} from "react";
import {GameContext} from "../App";
import GameEngine from "../Lib/GameEngine";

export default function Board (props){
    const context = useContext(GameContext);
    const [turn,setTurn] = useState(context.gameData.firstTurn);
    let playerSign = {"1":"o","2":"x"};
    const engine = new GameEngine();
    let box= engine.generateBoxData();
    const [Box,setBox]=useState(box);

    useEffect(function (){
        if(turn != props.firstTurn){
            setTimeout(function (){
                engine.addData(Box);
                let selection= engine.botTurn(turn);
                if(selection != null){
                    selectBox({index:selection,'sign':'','player':''});
                }
            },1000);
        }

    },[turn]);

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
            if(engine.gameFinish && !result.winner){
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
            <div className={'flex flex-row justify-center items-center mt-10'}>
                <h3 className={'bg-amber-400'}>Now Player {turn} Turn</h3>
            </div>
            <br/>
            <div className={'flex flex-col items-center justify-center'}>
                { Box.map(function(arr){
                    return <div key={_.map(arr,(i)=>i.index).toString()} className={'flex flex-row items-center justify-center gap-3'}>{
                    arr.map(function (i){
                        return <div onClick={()=>selectBox(i)} className={'flex bg-gray-900 m-3 hover:bg-gray-700 text-white text-4xl font-bold py-10 px-10 w-10 h-10 rounded items-center justify-center '+(i.player==""?"":(i.player=='1'?"ply1":"ply2"))} key={i.index}>{i.sign}</div>;
                    })}
                    </div>
                  })
                }
            </div>
        </>
    );
}
