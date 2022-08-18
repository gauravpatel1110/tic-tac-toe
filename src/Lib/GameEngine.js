import _ from "lodash";

export default class GameEngine {
    data = [];
    attemptRemaining = 9;
    updateSelection = false;
    gameFinish = false;
    currentSelection = {};
    turn = "";
    playerSign=""

    addData(data){
        this.data = data;
        return this;
    }
    generateBoxData(){
       let box= Array.from(Array(9).keys(),i =>({'index':i,'sign':'','player':''}));
       return _.chunk(box,3);
    }

    setCurrentSelection(i){
        this.currentSelection = i;
        return this;
    }

    setPlayerSign(sign){
        this.playerSign = sign;
        return this;
    }

    setTurn (turn)
    {
        this.turn = turn;
        return this;
    }

    updateSelectionData(data) {
        const $this = this;
        this.data = data;
        return data.map(function (arr) {
            return arr.map(function (j) {
                if (j.index == $this.currentSelection.index && j.sign == '') {
                    $this.updateSelection = true;
                    j.sign = $this.playerSign;
                    j.player = $this.turn;
                }
                if (j.sign != "") {
                    $this.attemptRemaining--;
                }
                if ($this.attemptRemaining == 0) {
                    $this.gameFinish = true;
                }
                return j;
            });
        });
    }

    getUpdateSelectionStatus(){
        return this.updateSelection;
    }
    getWinner() {
        let winner = false;
        let player = '';
        let playerData = this.extractPlayerData();
        let rules = this.getWinningRule();
        rules.map((arr) => {
            let player1=_.intersection(playerData.p1,arr);
            let player2=_.intersection(playerData.p2,arr);
            if (player1.sort().toString() == arr.sort().toString()) {
                winner = true;
                player = "1";
            }
            if (player2.sort().toString() == arr.sort().toString()) {
                winner = true;
                player = "2";
            }
        });
        return {winner: winner, player: player};
    }

    extractPlayerData() {
        let playerData = {"p1": [], "p2": []};
        this.data.map((arr) => {
            arr.map((item) => {
                if (item.sign != "" && item.player == "1") {
                    playerData.p1.push(item.index);
                }
                if (item.sign != "" && item.player == "2") {
                    playerData.p2.push(item.index);
                }
            })
        });
        return playerData;
    }

    botTurn(turn){
        let playerData = this.extractPlayerData();
        let selectedData = [...playerData.p1,...playerData.p2];
        let oppositeTurnData = turn=="1"?playerData.p2:playerData.p1;
        let currentTurnData = turn=="1"?playerData.p1:playerData.p2;
        let selection = null;
        let random=true;
        if(oppositeTurnData.length >= 2){
           selection= this.getOppositePlayerWinningData(oppositeTurnData,currentTurnData);
           if(_.indexOf(selectedData,selection[0])==-1){
               return selection[0];
           }
        }
        if(random){
            selection= this.getRandomSelection(selectedData);
            if(selection != null){
                return selection[0];
            }
        }
    }
    getRandomSelection(selectedData){
        const arr = Array.from(Array(9).keys());
        return _.difference(arr,selectedData);
    }

    getOppositePlayerWinningData(oppositeTurnData,currentTurnData){
        let winningRules = this.getWinningRule();
        let selection = null;
        winningRules.map(function (rule){
            if(_.intersection(rule,oppositeTurnData).length >= 2){
                let diff= _.difference(rule,oppositeTurnData);
                if(_.indexOf(oppositeTurnData,diff) == -1){
                    selection = diff;
                }
            }
        });
        return selection;
    }
    getWinningRule() {
        return [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 4, 6],
            [3, 4, 5],
            [2, 5, 8],
            [6, 7, 8],
        ];
    }
}