import _ from "lodash";

export default class GameEngine {
    data = [];
    attemptRemaining = 9;
    updateSelection = false;
    gameFinish = false;
    currentSelection = {};
    turn = "";
    playerSign=""

    generateBoxData(){
       let box= Array.from(Array(9).keys(),i =>({'index':i,'sign':'','player':''}));
       return box=_.chunk(box,3);
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