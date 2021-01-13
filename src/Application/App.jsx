import React, {Fragment, useState} from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import bestMove from "../ChessAI/BestMove";
import blackOpeningBook from "../ChessAI/OpeningBook/BlackOpeningBook";

const Chess = require("chess.js");

const App = () => {
  const [chess] = useState(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move) => {
    if (chess.move(move)) {
      const moves = chess.moves();
      if (moves.length > 0) {
        console.log('fen', chess.fen());
        if (blackOpeningBook[chess.fen()]) {
          chess.move(blackOpeningBook[chess.fen()]);
        } else {
          // eslint-disable-next-line no-unused-vars
          const [computerMove, _] = bestMove(chess, 2);
          chess.move(computerMove);
        }
      }
      setFen(chess.fen());
    }
  };

  const boardWidth = (screenWidth, screenHeight) => {
    if (screenWidth > screenHeight) {
      return Math.floor(0.75 * screenHeight);
    } else {
      return Math.floor(0.75 * screenWidth);
    }
  };

  return (
    <div className="Center">
      {chess.turn() === "w" ? (
        <Fragment>
          {chess.game_over() ? (
            <Fragment>
              {chess.in_checkmate() ? (
                <h1>Checkmate. Black wins.</h1>
              ) : (
                <h1>Draw</h1>
              )}
            </Fragment>
          ) : (
            <h1>White's turn</h1>
          )}
        </Fragment>
      ) : (
        <Fragment>
          {chess.game_over() ? (
            <Fragment>
              {chess.in_checkmate() ? (
                <h1>Checkmate. White wins.</h1>
              ) : (
                <h1>Draw</h1>
              )}
            </Fragment>
          ) : (
            <h1>Black's turn</h1>
          )}
        </Fragment>
      )}
      <Chessboard
        calcWidth={({screenWidth, screenHeight}) =>
          boardWidth(screenWidth, screenHeight)
        }
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />
    </div>
  );
};

export default App;
