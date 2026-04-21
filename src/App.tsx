import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import type { GameMode, HexDigit } from './types.ts';
import Header from './components/Header';
import MessageBlock from './components/MessageBlock.tsx';
import HexeSquareSimple from './gameUI/HexeSquareSimple.tsx';
import HexeComplex from './gameUI/HexeComplex.tsx';
import HexWordle from './gameUI/HexWordle.tsx';
import HexadecimalBoard from './gameUI/HexadecimalBoard.tsx';

import classes from './App.module.css';

const MAX_GUESSES = 10;
function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  // general game state
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  //color state
  const [gameColor, setGameColor] = useState<string>(getRandomColor());
  const [contrastColor, setContrastColor] = useState<string>('');
  const [userColor, setUserColor] = useState<HexDigit[]>(
    Array.from({ length: 6 }, () => ({ val: '0', correct: false })),
  );

  // game play, guess validation state
  const [inputVal, setInputVal] = useState<string>('');
  const [badGuesses, setBadGuesses] = useState<string[]>([]);
  const [inputError, setInputError] = useState<string | null>(null);

  // game over state
  const userWon = getUserColorHex(userColor) === gameColor;
  const userLost = badGuesses.length === MAX_GUESSES;
  const isGameOver = userWon || userLost;

  const message = userLost
    ? `The correct formula to help her disappear into the smoke was ${gameColor}. Alas, she is stuck here to be tortured by khakis and ecru.`
    : userWon
      ? 'You helped the Hex Hexe to hexcape!'
      : null;

  const getComplementaryColor = (color: string) => {
    const stripped = color.replace('#', '');
    const [r, g, b] = (stripped.match(/.{2}/g) ?? []).map((colVal) => {
      const chan = 255 - parseInt(colVal, 16);
      return chan.toString(16).padStart(2, '0');
    });
    return `#${r}${g}${b}`;
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const onStartGame = () => {
    const compColor = getComplementaryColor(gameColor);
    setGameRunning(true);
    setContrastColor(compColor);
  };

  const handleStartSameGame = () => {
    // game colors
    const newColor = getRandomColor();
    const newContrastColor = getComplementaryColor(newColor);
    setGameColor(newColor);
    setContrastColor(newContrastColor);
    setUserColor(
      Array.from({ length: 6 }, () => ({ val: '0', correct: false })),
    );
    // rest of game state
    setBadGuesses([]);
    setInputVal('');
  };

  const handleStartNewGame = () => {
    handleStartSameGame();
    setGameRunning(false);
    setGameMode(null);
  };

  const checkGuess = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputVal === '') return;

    const guess = inputVal.toUpperCase();
    if (!gameColor.includes(guess)) {
      setBadGuesses((prev) => [guess, ...prev]);
    } else {
      const tempUserHex = userColor.map((deepEl) => ({ ...deepEl }));
      gameColor
        .replace('#', '')
        .split('')
        .map((el, idx) => {
          if (el === guess) {
            tempUserHex[idx].val = el;
            tempUserHex[idx].correct = true;
          }
        });
      setUserColor(tempUserHex);
    }
    setInputVal('');
    inputRef?.current?.focus();
  };

  function getUserColorHex(arr: HexDigit[]): string {
    const hexVal = arr.map((el) => el.val).join('');
    return `#${hexVal}`;
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const hexRegex = /^[0-9a-fA-F]*$/;
    if (!hexRegex.test(val)) {
      setInputError('Whoops! Please enter a valid hexidecimal value: ');
      return;
    }
    setInputVal(val);
    setInputError(null);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Header color={gameColor} mode={gameMode} />
      <main className={classes.gameBoard}>
        {gameMode === null && !gameRunning && (
          <section>
            <div className={classes.gameIntro}>
              <p>
                Hex color codes are a 6-digit combination ranging from 0–9
                then A–F. These digits are paired to represent red, green, and
                blue.
              </p>
              <p>
                The color you are trying to guess is the background of the
                square. Your guesses will be reflected in the witch's body.
              </p>
              <p>
                Correctly guess the hexadecimal to help the Hex Hexe vanish. If
                you fail, expect some biting sarcasm.
              </p>
            </div>

            <div>
              <div>
                <button onClick={() => setGameMode('easy')}>Easy</button>
                <p>short desc of hangman 1 style</p>
              </div>
              <div>
                <button onClick={() => setGameMode('medium')}>Medium</button>
                <p>short desc of wordle style</p>
              </div>
              <div>
                <button onClick={() => setGameMode('hard')}>Hard</button>
                <p>short desc of hangman 2 style</p>
              </div>
            </div>
          </section>
        )}
        {gameMode !== null && !gameRunning && (
          <section>
            <p>
              Excellent! You've chosen {gameMode}. I've chosen a color at random
              below. Accept it or choose another. Once you've accepted a color,
              the game will begin.
            </p>
            <div>
              <div
                className={classes.targetColorSample}
                style={{ backgroundColor: gameColor }}
              ></div>
              <div>
                <p>Yass or Pass?</p>
                <button onClick={() => onStartGame()}>
                  Gurl, yass. Let's play!
                </button>
                <button onClick={() => setGameColor(getRandomColor())}>
                  Hurl! Pass. New color, please.
                </button>
              </div>
            </div>
          </section>
        )}
        {gameMode !== null && gameRunning && (
          <section className={classes.gameDisplay}>
            {gameMode === 'easy' && (
              <HexeSquareSimple
                gameColor={gameColor}
                contrastColor={contrastColor}
                userColor={
                  userColor.some((d) => d.correct)
                    ? getUserColorHex(userColor)
                    : contrastColor
                }
              />
            )}
            {gameMode === 'medium' && (
              <HexWordle
                gameColor={gameColor}
                contrastColor={contrastColor}
                userColor={`#${userColor.join('')}`}
              />
            )}
            {gameMode === 'hard' && (
              <HexeComplex
                gameColor={gameColor}
                contrastColor={contrastColor}
                userColor={`#${userColor.join('')}`}
              />
            )}
          </section>
        )}
        <section className={classes.gameControls}>
          {gameMode === 'easy' && gameRunning && (
            <>
              <MessageBlock guesses={badGuesses} message={message} />
              {!isGameOver && <HexadecimalBoard userColor={userColor} />}
              <div>
                {isGameOver && (
                  <>
                    <p>Play the same game or a new game?</p>
                    <button onClick={handleStartSameGame}>Same game!</button>
                    <button onClick={handleStartNewGame}>New game!</button>
                  </>
                )}
                {!isGameOver && (
                  <p
                    className={`${classes.inputInstructions} ${inputError ? classes.error : ''}`}
                  >
                    {inputError ? (
                      <span>{inputError}</span>
                    ) : (
                      <span>Enter a valid hexadecimal digit: </span>
                    )}
                    (0—9 or A–F)
                  </p>
                )}
                <form className={classes.inputContainer} onSubmit={checkGuess}>
                  {' '}
                  <label htmlFor='userGuess'>Your guess: </label>
                  <input
                    type='text'
                    id='userGuess'
                    style={{ borderColor: gameColor ?? '#ffffff' }}
                    maxLength={1}
                    pattern='[0-9a-fA-F]+'
                    placeholder='?'
                    ref={inputRef}
                    value={inputVal}
                    autoFocus
                    onChange={handleOnChange}
                    autoComplete='off'
                  />
                  <input type='submit' value='enter' />
                </form>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
