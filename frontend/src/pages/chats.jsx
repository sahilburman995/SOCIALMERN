import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import "./chats.css";

const Chats = () => {
  const socket = useMemo(() => io("http://localhost:5000"), []);

  const [socketid, setsocketid] = useState("");
  const [senderms, setsenderms] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [room, setroom] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("message", { message, room });
    socket.emit("send", message, room);

    setsenderms((prevMessages) => [...prevMessages, { message, sentByCurrentUser: true }]);
    setMessage("");
  };

  useEffect(() => {
    const socket = io("http://localhost:5000");
  
    socket.on("connect", () => {
      setsocketid(socket.id);
      console.log("connected", socket.id);
    });
  
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  
    socket.on("welcome", (s) => {
      console.log(s);
    });
    socket.on("send", (s) => {
      console.log(s);
    });
    socket.on("recive", (a) => {
      console.log(a);
      setReceivedMessages((prevMessages) => [...prevMessages, { message: a, sentByCurrentUser: false }]);
    });
  
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to ensure this effect runs only once on component mount
  
  return (
    <>
      <div className="navbar">
        <span>WEBCHAT</span>
      </div>
      <div className="myid" style={{ display: "flex", alignItems: "center" }}>
        <div className="myids">
          <h2>Room ID </h2> {socketid}
        </div>
      </div>

      <div className="chat-interface">
        <form onSubmit={handleSubmit} className="send-message-form">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter room id"
            value={room}
            onChange={(e) => setroom(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        <div className="received-messages">
          {[...receivedMessages, ...senderms].map((msg, index) => (
            <div
              key={index}
              className={msg.sentByCurrentUser ? "message-bubbles-sent" : "message-bubble-received"}
            >
              {msg.message}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Chats;
