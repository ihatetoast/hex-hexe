import React from 'react';
import { useState } from 'react';
import type { GameMode, HexDigit } from './types.ts';
import Header from './components/Header';
import HexeSquareSimple from './gameUI/HexeSquareSimple.tsx';
import HexeComplex from './gameUI/HexeComplex.tsx';
import HexWordle from './gameUI/HexWordle.tsx';
import HexadecimalBoard from './gameUI/HexadecimalBoard.tsx';

import classes from './App.module.css';

const MAX_GUESSES = 6;
function App() {
  // general game state
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [guesses, setGuesses] = useState<number>(0); 

  //color state
  const [gameColor, setGameColor] = useState<string>(getRandomColor());  
  const [contrastColor, setContrastColor] = useState<string>('');
  const [userColor, setUserColor] = useState<HexDigit[]>(
    Array.from({ length: 6 }, () => ({ val: '0', correct: false })),
  );

// game play, guess validation state
  const [inputVal, setInputVal] = useState<string>('');
  const [easyHexVals, setEasyHexVals] = useState<string[]>([]);

  const isGameOver = `#${userColor}` === gameColor || guesses === MAX_GUESSES;


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

// TODO: 
// when a user inputs a digit, validate that it is 0-F (in input and via logic, trust no one)
// IFF there was an error message, clear when the user clicks in the input or after it's valid?
// if that is a valid option, check if it's in the guesses array
// if it IS in the guesses array, address error message (replace label text or add class to a note about valid input options)
// if it IS NOT in the guesses array, add it 
// AND check guesses array with goalColor to replace digits, setUserColor to this color, clear input
// add to bad guesses arr if it is not in the hexadecimal and display bad guesses so they know what they have done. 
// ?? let bad guess length be how we derive game over?

// later TODO (game over todo)
// if they won, the hexe should be same color as surrounding field. animate hat falling to the floor
// if they lost, display a meh look to the witch and have a random set of comments.
// change gmae mode to null to return to home

  const handleHexaDecChange = (userGuess: string) => {
    const hexRegex = /^[0-9a-fA-F]*$/;

    if (hexRegex.test(userGuess)) {
      console.log('input is valid');
      const guess = userGuess.toUpperCase();

      // only push valit ones to array.
      if (!easyHexVals.includes(guess)) {
        setEasyHexVals((prev) => [guess, ...prev]);
      }
    } else {
      console.log('input is invalid');
    }
  };

  const checkGuess = () => {
    console.log('game color is ', gameColor);
    console.log(' easy hex vals is ', easyHexVals);
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
                  guesses === 0 ? contrastColor : `#${userColor.join('')}`
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
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value) }
                  />
                  <button
                    onClick={checkGuess}
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
