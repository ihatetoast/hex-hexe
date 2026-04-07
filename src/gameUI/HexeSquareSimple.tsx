import type { GameColors } from '../types';
import classes from './HexeSquareSimple.module.css';

const HexeSquareSimple = ({
  gameColor,
  contrastColor,
  userColor,
}: GameColors) => {
  console.log('target color is ', gameColor);
  console.log('user color is ', userColor);
  console.log('contrast color is ', contrastColor);
  return (
    <div
      className={classes.gameColorSquare}
      style={{ backgroundColor: gameColor }}
    >
      <div className={classes.witch}>
        <div
          className={classes.witchHead}
          style={{ backgroundColor: userColor }}
        ></div>
        <div
          className={classes.witchBody}
          style={{ backgroundColor: userColor }}
        ></div>
      </div>
      <div className={classes.witchHat}>
        <div
          className={classes.witchHatPoint}
          style={{ backgroundColor: contrastColor }}
        ></div>
        <div
          className={classes.witchHatBrim}
          style={{ backgroundColor: contrastColor }}
        ></div>
      </div>
    </div>
  );
};

export default HexeSquareSimple;
