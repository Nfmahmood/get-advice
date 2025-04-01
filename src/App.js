import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">WANT SOME ADVICE?</h1>
      <div className="advice-card">
        <h2 className="advice-text">{advice}</h2>
        <button className="advice-button" onClick={getAdvice}>
          Get Advice!
        </button>
        <Message count={count} />
      </div>
    </div>
  );

  function Message({ count }) {
    return (
      <p className="message-text">
        You have read <strong>{count}</strong> piece{count > 1 ? "s" : ""} of
        advice
      </p>
    );
  }
}
