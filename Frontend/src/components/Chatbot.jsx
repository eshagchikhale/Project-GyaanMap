import React, { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m your career assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // block emojis
  const sanitizeInput = (value) => {
    return value.replace(/[\u{1F300}-\u{1FAFF}]/gu, "");
  };

  // render clickable links
 const renderMessage = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split("\n").map((line, i) => {
    const trimmed = line.trim();

    // Section headings
    if (
      trimmed === "Career Overview:" ||
      trimmed === "What You Will Do:" ||
      trimmed === "Free Resources:" ||
      trimmed === "Next Step:"
    ) {
      return (
        <div
          key={i}
          className="mt-3 font-semibold text-gray-900"
        >
          {trimmed}
        </div>
      );
    }

    // Bullet points
    if (trimmed.startsWith("-")) {
      return (
        <div key={i} className="ml-3 flex gap-2">
          <span>•</span>
          <span>
            {trimmed.replace("-", "").split(urlRegex).map((part, j) =>
              part.match(urlRegex) ? (
                <a
                  key={j}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {part}
                </a>
              ) : (
                part
              )
            )}
          </span>
        </div>
      );
    }

    // Normal text
    return (
      <div key={i} className="leading-relaxed text-gray-800">
        {line.split(urlRegex).map((part, j) =>
          part.match(urlRegex) ? (
            <a
              key={j}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {part}
            </a>
          ) : (
            part
          )
        )}
      </div>
    );
  });
};



  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);

    setTyping(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("Chat API failed");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-30 animate-ping"></span>

        <button
          onClick={() => setOpen(true)}
          className="relative bg-gradient-to-r from-blue-500 to-indigo-600 
          text-white p-5 rounded-full shadow-2xl 
          hover:scale-110 transition transform animate-bounce"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[520px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <div>
              <h3 className="font-semibold">GyaanMap Career Assistant</h3>
              <p className="text-xs opacity-90">Online</p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-500 text-white"
                    : "mr-auto bg-gray-200 text-gray-800"
                }`}
              >
                {/* Bot message with quiz CTA */}
                {msg.sender === "bot" && msg.text.includes("Next Step") ? (
                  <div className="space-y-2">
                    <div>{renderMessage(msg.text)}</div>
                    <button
                      onClick={() => navigate("/quiz")}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 
                      text-white rounded-full text-sm hover:scale-105 transition"
                    >
                      Take Career Interest Quiz
                    </button>
                  </div>
                ) : (
                  renderMessage(msg.text)
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="mr-auto bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded-xl">
                Bot is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(sanitizeInput(e.target.value))}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 border rounded-full 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 
              text-white p-2 rounded-full hover:scale-105 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
