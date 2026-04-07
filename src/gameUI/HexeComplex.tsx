
import type { GameColors } from '../types';
import classes from './HexeComplex.module.css';
import HexeSquareSimple from './HexeSquareSimple';


const HexeComplex = ({ gameColor, userColor, contrastColor }: GameColors) => {
  console.log('target color is ', gameColor);
  console.log('user color is ', userColor);
  console.log('contrast color is ', contrastColor);
  return <div className={classes.test}>HARD MODE
    <HexeSquareSimple gameColor={gameColor} userColor={userColor} contrastColor={contrastColor}/>
  </div>;
};

export default HexeComplex;
