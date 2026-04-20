import classes from './MessageBlock.module.css';

type GuessesProps = {
  message: string | null;
  guesses: string[];
};

const MessageBlock = ({ message, guesses }: GuessesProps) => {
  return (
    <div className={classes.guessesContainer}>
      {message ? (
        message
      ) : (
        <p>
          Bad guesses:{' '}
          {guesses.length === 0
            ? ' ... '
            : guesses.map((el, idx) => <span key={idx}>{el}</span>)}{' '}
        </p>
      )}
    </div>
  );
};

export default MessageBlock;
