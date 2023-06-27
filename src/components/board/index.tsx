import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Pile from "../ui-components/pile/pile";
import styles from "./index.module.css";
export const oResultContext = createContext(0);
export const xResultContext = createContext(0);
export default function GameBoard() {
  const dummyArray: Array<string> = new Array(9).fill(null);
  const [pilesArray, setPilesArray] = useState(dummyArray);
  const [xTurn, setXTurn] = useState(false);
  const [winner, setWinner] = useState("");
  const [xResult, setXResult] = useState(0);
  const [oResult, setOResult] = useState(0);
  const changeTurn = () => {
    if (xTurn) {
      setXTurn(!xTurn);
    } else {
      setXTurn(!xTurn);
    }
  };
  useEffect(() => {
    const winner = checkForWinner(pilesArray);
    if (winner) {
      setWinner(winner);
      swal(`Congrats ${winner} You Won`).then((res) => {
        if (res.isConfirmed) {
          startNewGame();
        }
      });
      switch (winner) {
        case "X":
          setXResult(xResult + 1);
          return;
        case "O":
          setOResult(oResult + 1);
          return;
        default:
          break;
      }
    }
  }, [xTurn]);

  async function clickHandler(v: number) {
    const isWinner = checkForWinner(pilesArray);
    if (isWinner || pilesArray[v]) {
      return;
    }
    const newPilesArray = pilesArray.slice();
    newPilesArray[v] = xTurn ? "X" : "O";
    setPilesArray(newPilesArray);
    changeTurn();
  }
  function startNewGame() {
    setPilesArray(dummyArray);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>X-Result : {xResult}</h3>
        <h3>O-Result : {oResult}</h3>
        <h3>Winner : {winner}</h3>

        <button className={styles.newBtn} onClick={startNewGame}>
          New Game
        </button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.row}>
              <Pile
                value={pilesArray[0]}
                key={0}
                index={0}
                onClick={() => clickHandler(0)}
              />
              <Pile
                value={pilesArray[1]}
                key={1}
                index={1}
                onClick={() => {
                  clickHandler(1);
                }}
              />
              <Pile
                value={pilesArray[2]}
                key={2}
                index={2}
                onClick={() => clickHandler(2)}
              />
            </tr>
            <tr className={styles.row}>
              <Pile
                value={pilesArray[3]}
                key={3}
                index={3}
                onClick={() => clickHandler(3)}
              />
              <Pile
                value={pilesArray[4]}
                key={4}
                index={4}
                onClick={() => clickHandler(4)}
              />
              <Pile
                value={pilesArray[5]}
                key={5}
                index={5}
                onClick={() => clickHandler(5)}
              />
            </tr>
            <tr>
              <Pile
                value={pilesArray[6]}
                key={6}
                index={6}
                onClick={() => clickHandler(6)}
              />
              <Pile
                value={pilesArray[7]}
                key={7}
                index={7}
                onClick={() => clickHandler(7)}
              />
              <Pile
                value={pilesArray[8]}
                key={8}
                index={8}
                onClick={() => clickHandler(8)}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
function swal(message: string) {
  return Swal.fire({
    title: message,
    icon: "success",
    confirmButtonText: "Start New Game",
  });
}
function checkForWinner(piles: any) {
  const options = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let index = 0; index < options.length; index++) {
    const element = options[index];
    const a = element[0];
    const b = element[1];
    const c = element[2];
    if (piles[a] && piles[a] === piles[b] && piles[a] === piles[c]) {
      return piles[a];
    }
  }
  return null;
}
