import { useState, useEffect, useRef, RefObject } from 'react';
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
  const [message, setMessage] = useState<string | null>(null);

  //color state
  const [gameColor, setGameColor] = useState<string>(getRandomColor());
  const [contrastColor, setContrastColor] = useState<string>('');
  const [userColor, setUserColor] = useState<HexDigit[]>(
    Array.from({ length: 6 }, () => ({ val: '0', correct: false })),
  );

  // game play, guess validation state
  const [inputVal, setInputVal] = useState<string>('');
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [badGuesses, setBadGuesses] = useState<string[]>([]);
  
  // game over state 
  const [userWon, setUserWon] =  useState<boolean>(false) ;
  const [userLost, setUserLost] = useState<boolean>(false);
  const isGameOver = userWon || userLost;

  const getComplementaryColor = (color: string) => {
    // convert hex to rgb, subtract each rgb from 255
    // convert rgb to hex
    const stripped = color.replace('#', '');
    // get red, green, blue: and conv to hex (0-255)
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

   useEffect(() => {
    inputRef.current?.focus(); 
  }, [])
  

  useEffect(() => {
    if (!gameColor.includes(currentGuess)) {
      // add to bad guesses array
      setBadGuesses((prev) => [currentGuess, ...prev]);
      return;
    }
    const tempUserHex = userColor.map((deepEl) => ({ ...deepEl }));
    gameColor
      .replace('#', '')
      .split('')
      .map((el, idx) => {
        if (el === currentGuess) {
          tempUserHex[idx].val = el;
          tempUserHex[idx].correct = true;
        }
      });
    setUserColor(tempUserHex);
  }, [currentGuess, gameColor]);

// needs work
  useEffect(() =>{
    // check for user won or lost
    if(userLost){
      setMessage("You were not worthy!")
    }
    if(userWon) {
      setMessage("You helped the Hex Hexe to hexcape!")
    }
  },[userColor, badGuesses])
  console.log(isGameOver); // bug

  const handleHexaDecChange = (userGuess: string) => {
    const hexRegex = /^[0-9a-fA-F]*$/;

    if (hexRegex.test(userGuess)) {
      const guess = userGuess.toUpperCase();

      setCurrentGuess(guess);
    } else {
      setMessage('Whoops! Input is invalid');
    }
  };

  const checkGuess = () => {
    handleHexaDecChange(inputVal);
    setInputVal('');
    inputRef?.current?.focus();
  };

  const getUserColorHex = (arr: HexDigit[]) => {
    const hexVal = arr.map((el) => el.val).join('');
    return `#${hexVal}`;
  };

  return (
    <>
      <Header color={gameColor} mode={gameMode} />
      <main className={classes.gameBoard}>
        {gameMode === null && !gameRunning && (
          <section>
            <p>
              Hex color codes are a 6-digit combination ranging from 0 – 9 then
              A – F. These digits are paired to represent red, green, and blue.
            </p>
            <p>
              The color you are trying to guess is the background of the square.
              Your guesses will be reflected in the witch's body.{' '}
            </p>
            <p>
              Correctly guess the hexadecimal to help the Hex Hexe vanish. If
              you fail, expect some biting sarcasm.
            </p>

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
                  currentGuess === ''
                    ? contrastColor
                    : getUserColorHex(userColor)
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
              <MessageBlock guesses={badGuesses} message={message}/>

              <HexadecimalBoard userColor={userColor} />
              <div>
                <p>Enter a valid hexadecimal digit (0—9 or A–F)</p>
                <div className={classes.inputContainer}>
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
                    onFocus={() => setMessage(null)}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    autoComplete="off"
                  />
                  <button
                    onClick={checkGuess}
                    onKeyDown={(e) => (e.key === 'Enter' ? checkGuess() : '')}
                  >
                    enter
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
