import type {HexDigit} from '../types.ts'

import classes from './HexadecimalBoard.module.css'


type Props = {
  userColor:  HexDigit[]
};

const HexadecimalBoard = ({userColor}: Props) => {
  return (
    <div className={classes.guessesContainer}>
      {userColor.map((el, idx) => {
        const resultsClass = el.correct ? 'correct' : 'incorrect';
        return (
          <span
            key={idx}
            className={`${classes.guessBox} ${classes[resultsClass]}`}
          >
            {el.val}
          </span>
        );
      })}
    </div>
  );
};

export default HexadecimalBoard;
