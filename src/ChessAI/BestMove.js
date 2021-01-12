import evaluate from "./Evaluation";

const bestMove = (chess, depth) => {
  const moves = chess.moves().sort(() => Math.random() - 0.5);
  const color = chess.fen().split(' ')[1];

  let bestAct = '';
  let bestEvaluation = color === 'w' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  let evaluation = 0;
  let _ = {};

  for (const move of moves) {
    if (depth === 1) {
      chess.move(move);
      evaluation = evaluate(chess.board());
      chess.undo();
    } else if (depth > 1) {
      chess.move(move);
      // eslint-disable-next-line no-unused-vars
      [_, evaluation] = bestMove(chess, depth - 1);
      chess.undo();
    } else {
      console.error('Invalid depth');
    }

    if (color === 'w') {
      if (evaluation > bestEvaluation) {
        bestEvaluation = evaluation;
        bestAct = move;
      }
    } else if (color === 'b') {
      if (evaluation < bestEvaluation) {
        bestEvaluation = evaluation;
        bestAct = move;
      }
    } else {
      console.error('Invalid color');
    }
  }

  return [bestAct, bestEvaluation];
};

export default bestMove;