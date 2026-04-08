export type GameMode = 'easy' | 'medium' | 'hard';
export type GameColors = {
  gameColor: string;
  userColor: string;
  contrastColor: string;
};

export type HexDigit = { val: string; correct: boolean };
