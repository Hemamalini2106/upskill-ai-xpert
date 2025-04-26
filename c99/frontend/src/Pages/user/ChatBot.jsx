import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { ImSpinner8 } from "react-icons/im";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle message send
  const handleSendMessage = async () => {
    setLoading(true);
    if (!userMessage.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      // Send the message to the ML endpoint
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        message: userMessage,
      });

      // Add the bot response to the chat
      setMessages([
        ...newMessages,
        { sender: "bot", text: response.data.response },
      ]);
      setLoading(false);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error: Unable to fetch response." },
      ]);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <div className=" bg-white shadow-lg rounded-lg p-6 h-[600px] w-[900px]">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            ChatBot
          </h2>
          <div className="h-[450px] overflow-y-scroll p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none h-[50px]"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg ml-5"
            >
              {loading ? (
                <ImSpinner8 size={25} className="animate-spin text-center " />
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
