import evaluate from "./Evaluation";

const bestMove = (chess, depth) => {
  const moves = chess.moves().sort(() => Math.random() - 0.5);
  const color = chess.fen().split(' ')[1];

  let bestMove = '';
  let bestEvaluation = color === 'w' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  let evaluation = 0;

  for (const move of moves) {
    chess.move(move);
    evaluation = evaluate(chess.board());
    chess.undo();
    if (color === 'w') {
      if (evaluation > bestEvaluation) {
        bestEvaluation = evaluation;
        bestMove = move;
      }
    } else if (color === 'b') {
      if (evaluation < bestEvaluation) {
        bestEvaluation = evaluation;
        bestMove = move;
      }
    } else {
      console.error('Invalid color');
    }
  }

  return bestMove;
};

export default bestMove;