"use client";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <p>Could not fetch the list of notes.{error.message}</p>
      <button onClick={reset}>Повторить попытку!</button>
    </div>
  );
};

export default Error;
