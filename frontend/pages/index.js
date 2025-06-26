import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:3001/messages");
        setMessages(res.data);
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.error(err);
      }
    };
    load();
    const iv = setInterval(load, 2000);
    return () => clearInterval(iv);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await axios.post("http://localhost:3001/messages", { message: text });
      setText("");
      const res = await axios.get("http://localhost:3001/messages");
      setMessages(res.data);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chatPage">
      <div className="inner">
        <h1>🍕 MyPizzeria Chat 🍕</h1>
        <div className="messages">
          {messages.map((msg, i) => {
            const who = msg.sentBy === "user" ? "user" : "agent";
            return (
              <div key={i} className={`message ${who}`}>
                {msg.content || msg.message}
              </div>
            );
          })}
        </div>
        <form onSubmit={sendMessage}>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your order…"
            style={{
              flex: 1,
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px 0 0 4px",
              resize: "vertical",
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
        }
      `}</style>

      <style jsx>{`
        .chatPage {
          position: relative;
          width: 100vw;
          height: 100vh;
          margin: 0;
          background-image: url("/pizza-background.png");
          background-size: cover;
          background-position: center;
        }

        .inner {
          max-width: 30%;
          height: 95vh;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          color: #fff;
          background-color: rgba(255, 255, 255, 0);
          backdrop-filter: blur(50px);
          box-shadow: 0px 8px 16px 30px rgba(0, 0, 0, 0.76);
          border-radius: 16px;
        }

        h1 {
          text-align: center;
          margin-bottom: 1rem;
          color: rgba(7, 7, 7, 0.93);
          font-weight: bold;
          font-size: 300%;
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          scroll-behavior: smooth;
          scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
        }

        .messages::-webkit-scrollbar {
          width: 6px;
        }

        .messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .messages::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }

        .message {
          max-width: 75%;
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          line-height: 1.4;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          white-space: pre-wrap;
        }

        .message.user {
          align-self: flex-end;
          background-color: #ffe680;
          color: #333;
          border-bottom-right-radius: 0;
        }

        .message.agent {
          align-self: flex-start;
          background-color: rgba(235, 71, 71, 0.93);
          color: #fff;
          border-bottom-left-radius: 0;
        }

        form {
          display: flex;
          margin-top: 1rem;
        }

        input {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 4px 0 0 4px;
        }

        button {
          padding: 0 1.5rem;
          border: none;
          border-radius: 0 4px 4px 0;
          background: rgba(235, 71, 71, 0.93);
          color: #fff;
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
