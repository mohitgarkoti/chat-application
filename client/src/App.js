import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('https://chat-application-xt1n.onrender.com');

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleJoin = () => {
    if (username.trim()) {
      socket.emit('join', username);
      setJoined(true);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { message });
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!joined) {
        handleJoin();
      } else {
        handleSend();
      }
    }
  };

  return (
    <div className="app" style={{
    background: "url('/bg.png') no-repeat center center fixed",
    backgroundSize: "cover",
    height: "100vh",
  }}>
      {!joined ? (
        <div className="join-container">
          <h2>Enter your name</h2>
          <input 
            type="text"
            placeholder="Your name"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleJoin}>Join Chat</button>
        </div>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <h2>Global Chat</h2>
          </div>
          <div className="chat-box">
            {chat.map((msg, i) => (
              <div key={i} className={`message ${msg.user === 'System' ? 'system' : 'user'}`}>
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-container">
            <input 
              type="text"
              placeholder="Type a message..."
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;