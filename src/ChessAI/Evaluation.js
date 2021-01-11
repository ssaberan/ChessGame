const evaluate = (board) => {
  let evaluation = 0;

  for (const row of board) {
    for (const square of row) {
      if (square === null) {
        continue;
      }
      if (square.color === 'w') {
        switch (square.type) {
          case 'r':
            evaluation = evaluation + 500;
            break;
          case 'n':
            evaluation = evaluation + 300;
            break;
          case 'b':
            evaluation = evaluation + 300;
            break;
          case 'q':
            evaluation = evaluation + 900;
            break;
          case 'k':
            evaluation = evaluation + 50000;
            break;
          case 'p':
            evaluation = evaluation + 100;
            break;
          default:
            break;
        }
      }
      if (square.color === 'b') {
        switch (square.type) {
          case 'r':
            evaluation = evaluation - 500;
            break;
          case 'n':
            evaluation = evaluation - 300;
            break;
          case 'b':
            evaluation = evaluation - 300;
            break;
          case 'q':
            evaluation = evaluation - 900;
            break;
          case 'k':
            evaluation = evaluation - 50000;
            break;
          case 'p':
            evaluation = evaluation - 100;
            break;
          default:
            break;
          }
      }
    }
  }

  return evaluation;
};

export default evaluate;