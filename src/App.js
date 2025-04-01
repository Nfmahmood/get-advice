import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getAdvice() {
    setLoading(true);
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);
      setCount((c) => c + 1);
    } catch (error) {
      console.error("Error fetching advice", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">WANT SOME ADVICE?</h1>
      <div className="advice-card">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <h2 className="advice-text">{advice}</h2>
        )}

        <button
          className="advice-button"
          onClick={getAdvice}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Advice!"}
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
