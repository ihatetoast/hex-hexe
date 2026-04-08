import { useState } from 'react';
import type { GameMode, HexDigit } from './types.ts';
import Header from './components/Header';
import HexeSquareSimple from './gameUI/HexeSquareSimple.tsx';
import HexeComplex from './gameUI/HexeComplex.tsx';
import HexWordle from './gameUI/HexWordle.tsx';

import classes from './App.module.css';

const MAX_GUESSES = 6;
function App() {
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [gameColor, setGameColor] = useState<string>(getRandomColor());
  const [userColor, setUserColor] = useState<HexDigit[]>(
    Array.from({ length: 6 }, () => ({ val: '0', correct: false })),
  );
  const [contrastColor, setContrastColor] = useState<string>('');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [guesses, setGuesses] = useState<number>(0);

  // game is over as in player won lost. vs is running which means player engaged from color choice to end messages with options to restart or choose another mode
  const isGameOver = `#${userColor}` === gameColor || guesses === MAX_GUESSES;

  // witch's hat (Hexenhut auf Deutsch) will get the initial color of the user
  // as user guesses, witch's body will change but hat stays the same so witch disappears underneath.

  // function for ensuring the initial hangman or hexe is visible no matter what the random color is.
  // once the user starts guessing, that setsUserColor.
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

  return (
    <>
      <Header color={gameColor} mode={gameMode}/>
      <main>
        {gameMode === null && !gameRunning && (
          <section>
            
              <p>
                Hex color codes are a 6-digit combination ranging from 0 – 9
                then A – F. These digits are paired to represent red, green, and
                blue.
              </p>
              <p>
                The color you are trying to guess is the background of the
                square. Your guesses will be reflected in the witch's body.{' '}
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
              <div className={classes.inputContainer}>
                <label htmlFor='userGuess'>Your guess: </label>
                <input type='text' id='userGuess' placeholder='e.g. B or 3' />
                <button onClick={()=>{console.log("dude")}}>enter</button>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
