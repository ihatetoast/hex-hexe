# Hex Hexe

## What?
"Hex" in English can be a spell or curse (noun) or to cast a spell or bewitch (verb). And if the language your using is CSS, you know that hex is for hexidecimal and one way to get a color. In German, a witch is a "Hexe".

Hex Hexe is a game that mixes hangman-style and Wordle-style guessing for the user to test her knowledge of hexidecimal colors. The user will first see the level options with a short description. Once the user picks a level, a random target color will appear. The user can accept that or get another color. Once the user accepts the color, that becomes the game color and the initial user color is its complementary color.


The levels:

* Easy: hangman style and user guesses by digit
    * The target color is the background color of a square with a witch in the complementary color inside
    * The user will then see 6 "blanks" (0's) and the border color of the blanks with 0's will be red, green, or blue to give some hex color clue
    * The user guesses one digit at a time. If the user guesses C and the actual color is "#C83D95", the user's guess will be entered as "#C00000". The letter or number will appear wherever it appears in the game color.
    * Incorrect guesses will be shown so the user doesn't repeat. 
    * The witch's body color is now the user's color
    * If the user's color matches the game color, the witch disappears. The user wins, helping the witch to escape. 


* Medium: Wordle style
    * The target color will be one square
    * Inside target will be another square with the user's color (initially the complementary color)
    * Inside the user square will be the 5 lines of boxes like Wordle
    * User guesses full hex option and gets yellow or green cues like Wordle
    * If the user's color finally matches, the inner square will match the outer
  

* Difficult: hangman style and user guesses full hex
    * Similar to "Easy", but the user guesses full hex. 
    * If the target is "#FF00FF" and the user guesses "#F1A0FD", the user's guess will show as a square that is #F1A0FD along side any other incorrect guesses but the witch's body will be "#F000F0"
    * In order to differentiate right and wrong 0's, the border of the correct digits will disappear: [0] is a space that needs the right digit and 0 is a space that is correctly 0.
    * The blanks are still boxes of 0's, but there is no RGB hint using the border colors
    * The user wins like the easy level, i.e. the witch's body disappears into the target color.


## What if ...
What if the user cheats by looking at inspect element? I don't care. Anyone can find the answer to Wordle, Connections, Strands etc on the internet. Anyone can cheat on a test. This isn't a character test. Let them. If they just guess on their own and want the last one, let them. Who cares? I'd rather haved a random hex generator than to limit by having photos of colors and also maybe not matching completely. 

## Where am I now?
Working on easy level

