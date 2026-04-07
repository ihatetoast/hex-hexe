import type { GameColors } from '../types';
import classes from './HexWordle.module.css'


const HexWordle = ({gameColor, contrastColor, userColor}: GameColors) => {
  console.log("target color is ", gameColor);
  console.log("user color is ", userColor);
  console.log("contrast color is ", contrastColor);
  return (
    <div className={classes.test}>MEDIUM MODE</div>
  )
}

export default HexWordle