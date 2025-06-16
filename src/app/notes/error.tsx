"use client";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <h2>Ошибка при загрузке</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Повторить попытку!</button>
    </div>
  );
};

export default Error;
