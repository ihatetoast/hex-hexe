import type { GameColors } from '../types';
import classes from './HexeSquareSimple.module.css';

const HexeSquareSimple = ({
  gameColor,
  contrastColor,
  userColor,
  className,
}: GameColors & { className?: string }) => {
  // classname prop for when this component is solo (easy mode) or with another square (hard mode)

  return (
    <div
      className={`${classes.gameColorSquare} ${className ?? ''}`}
      style={{ backgroundColor: gameColor }}
    >
      <div
        className={classes.witchHead}
        style={{ backgroundColor: userColor }}
      />
      <div className={classes.witchBody}>
        <div
          className={classes.witchDress}
          style={{ backgroundColor: userColor }}
        />

        <span
          className={classes.rArm}
          style={{ backgroundColor: userColor }}
        ></span>
        <span
          className={classes.lArm}
          style={{ backgroundColor: userColor }}
        ></span>
        <span
          className={classes.rLeg}
          style={{ backgroundColor: userColor }}
        ></span>
        <span
          className={classes.lLeg}
          style={{ backgroundColor: userColor }}
        ></span>
      </div>
      <div className={classes.witchHat}>
        <div
          className={classes.witchHatPeak}
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
