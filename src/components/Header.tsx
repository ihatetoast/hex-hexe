import classes from './Header.module.css';

type Props = {
  color: string;
}

const Header = ({color}: Props) => {

  return (
    <header className={classes.header} style={{borderBottomColor: `${color}`}}>
      <h1>Hex Hexe</h1>
      <p>Save Hazel the Hex Hexe by correctly guessing the color's hex value within five guesses.</p>
    </header>
  )
}

export default Header