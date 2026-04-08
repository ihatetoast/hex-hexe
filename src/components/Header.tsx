import type { GameMode } from '../types.ts';
import classes from './Header.module.css';

type HeaderProps = {
  color: string;
  mode: GameMode | null;
}

const Header = ({color, mode}:HeaderProps) => {

  return (
    <header className={classes.header} style={{borderBottomColor: `${color}`}}>
      <h1>Hex Hexe</h1>
      {!mode && <p>Save Hazel the Hex Hexe by correctly guessing the color's hex value within six guesses.</p>}
      {mode === 'easy' && <p>Easy hangman style: guess one digit at a time <span style={{whiteSpace: 'nowrap'}}>(e.g. "D" or "1").</span></p>}
        {mode === 'medium' && <p>Wordle style: guess 6 digits at a time and see if a digit is in the right spot or is in the hexadecimal but the wrong spot.</p>}
       {mode === 'hard' && <p>Hard hangman style: guess 6 digits at a time <span style={{whiteSpace: 'nowrap'}}>(e.g. "9E86FA").</span></p>}
    </header>
  )
}

export default Header