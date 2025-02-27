/*BACKEND IMPLEMENTED CODE-----------------------------------

"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("ws://localhost:4000", {
  autoConnect: false,
});

interface Message {
  text: string;
  sender: "user" | "driver";
  timestamp: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.connect();

    const messageListener = (message: Message) => {
      console.log("Message received in frontend:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("receiveMessage", messageListener);

    return () => {
      socket.off("receiveMessage", messageListener);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const myMessage: Message = { text: newMessage, sender: "user", timestamp };
      setMessages((prevMessages) => [...prevMessages, myMessage]);

      socket.emit("sendMessage", myMessage);

      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-2 text-center">Chat with Driver</h2>
      <div
        ref={chatContainerRef}
        className="border p-2 h-64 overflow-y-auto flex flex-col space-y-2"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`p-2 max-w-[75%] rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white" // ✅ User messages are blue (right)
                  : "bg-gray-300 text-black" // ✅ Driver messages are gray (left)
              }`}
            >
              <strong>{msg.sender === "user" ? "You" : "Driver"}:</strong> {msg.text}
            </div>
            <span className="text-xs text-gray-500">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border p-2 rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

BACKEND IMPLEMENTED CODE-----------------------------*/

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react"; // Minimal chat icon

interface Message {
  sender: "user" | "rider";
  text: string;
  timestamp: string;
}

const predefinedMessages = [
  "Hello 👋",
  "Where are you? 📍",
  "Thank you! 🙏",
  "Okay 👍",
  "Wait for me ⏳",
  "I'm waiting at the location 📍",
  "I'm unable to call you 📵",
  "I'll be there in 5 minutes 🚗💨",
];

const predefinedReplies: { [key: string]: string } = {
  "Hello 👋": "Hey! How can I assist you? 😊",
  "Where are you? 📍": "I'm nearby, arriving in 2 mins! 🚗",
  "Thank you! 🙏": "You're welcome! Have a great ride! 🎉",
  "Okay 👍": "Got it! See you soon. 👋",
  "Wait for me ⏳": "Sure, I'll wait! Let me know when you're ready. ⏳",
  "I'm waiting at the location 📍": "Got it! I'll be there shortly. 🚗",
  "I'm unable to call you 📵": "No worries, let's chat here. 💬",
  "I'll be there in 5 minutes 🚗💨": "Perfect! See you soon. 🚖",
};

export default function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replyText = predefinedReplies[text] || "I'm on the way! 🏎️";
      const riderMessage: Message = {
        sender: "rider",
        text: replyText,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, riderMessage]);
    }, 1500);
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-black dark:text-gray-50 shadow-xl rounded-2xl h-[550px] flex flex-col border border-gray-500 overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageCircle size={50} className="mb-2 opacity-70" />
            <p className="text-sm dark:text-gray-50">Start a conversation with your rider</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg max-w-xs border ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end text-right border-blue-700 shadow-md"
                  : "bg-gray-100 dark:bg-black dark:text-gray-50 text-black self-start text-left border-gray-600 shadow-sm"
              }`}
              style={{
                borderRadius: "12px",
                padding: "10px 15px",
                maxWidth: "70%",
              }}
            >
              <span
                className={`block font-semibold text-sm ${
                  msg.sender === "user" ? "text-white" : "text-gray-600"
                }`}
              >
                {msg.sender === "user" ? "You" : "Rider"}
              </span>
              <span className="block text-md">{msg.text}</span>
              <span
                className="block text-xs mt-1"
                style={{
                  color: msg.sender === "user" ? "#FFD700" : "#FF4500",
                }}
              >
                {msg.timestamp}
              </span>
            </motion.div>
          ))
        )}

        {isTyping && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="text-gray-500 self-start"
          >
            Rider is typing...
          </motion.div>
        )}
        <div ref={chatRef} />
      </div>

      {/* Predefined Message Buttons */}
      <div className="grid grid-cols-2 gap-2 p-2">
        {predefinedMessages.map((msg, index) => (
          <button
            key={index}
            onClick={() => sendMessage(msg)}
            className="px-3 py-2 bg-gray-300 text-black dark:bg-gray-900 dark:text-gray-50 rounded-lg hover:bg-gray-400 transition duration-200 text-sm shadow-sm"
          >
            {msg}
          </button>
        ))}
      </div>
    </div>
  );
}
