import { useState } from 'react';
import type { GameMode } from './types.ts';
import Header from './components/Header';
import HexeSquareSimple from './gameUI/HexeSquareSimple.tsx';
import HexeComplex from './gameUI/HexeComplex.tsx';
import HexWordle from './gameUI/HexWordle.tsx';

import classes from './App.module.css';

const MAX_GUESSES = 5;
function App() {
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [gameColor, setGameColor] = useState<string>(getRandomColor());
  const [userColor, setUserColor] = useState<string>('');
  const [contrastColor, setContrastColor] = useState<string>('');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [guesses, setGuesses] = useState<number>(0);

  // game is over as in player won lost. vs is running which means player engaged from color choice to end messages with options to restart or choose another mode
  let isGameOver = userColor === gameColor || guesses === MAX_GUESSES;

  // witch's hat (Hexenhut auf Deutsch) will get the initial color of the user
  // as user guesses, witch's body will change but hat stays the same so witch disappears underneath.

  // function for ensuring the initial hangman or hexe is visible no matter what the random color is.
  // once the user starts guessing, that setsUserColor.
  const getComplementaryColor = (color: string) => {
    // convert hex to rgb, subtract each rgb from 255
    // convert rgb to hex

    // rem #
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
    setUserColor(compColor);
    setContrastColor(compColor);
  };

  return (
    <>
      <Header color={gameColor} />
      <main>
        {gameMode === null && !gameRunning && (
          <section>
            <p>
              Instructions that explain the basics followed by three buttons
              that determine the game.
            </p>{' '}
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
          <section className={classes.colorSquareSection}>
            {gameMode === 'easy' && (
              <HexeSquareSimple
                gameColor={gameColor}
                contrastColor={contrastColor}
                userColor={userColor}
              />
            )}
            {gameMode === 'medium' && (
              <HexWordle
                gameColor={gameColor}
                contrastColor={contrastColor}
                userColor={userColor}
              />
            )}
            {gameMode === 'hard' && (
              <HexeComplex
                gameColor={gameColor}
                contrastColor={contrastColor}
                userColor={userColor}
              />
            )}
          </section>
        )}
        <div></div>
      </main>
    </>
  );
}

export default App;
