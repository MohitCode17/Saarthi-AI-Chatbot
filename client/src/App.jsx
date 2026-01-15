import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TypingIndicator from "./component/TypingIndicator";

const App = () => {
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      agent: "Frontdesk",
      content:
        "Hi 👋 I’m Saarthi, SIT Support Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const callServer = async (message) => {
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    return res.json();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await callServer(input);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            agent: res.agent || "Frontdesk",
            content: res.message,
          },
        ]);
        setLoading(false);
      }, 500);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          agent: "System",
          content: "Something went wrong. Please try again.",
        },
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="h-screen flex bg-neutral-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-4">
        <h2 className="text-lg font-semibold">Saarthi</h2>
        <p className="text-xs text-neutral-400 mb-6 border-b border-neutral-700 pb-2">
          SIT Official Support Assistant
        </p>

        <div className="space-y-2 text-sm">
          <div className="text-neutral-300">Home</div>
          <div className="text-neutral-400">Learning & Courses</div>
          <div className="text-neutral-400">About Saarthi</div>
        </div>
      </aside>

      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
                msg.role === "user" ? "ml-auto bg-indigo-600" : "bg-neutral-800"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="mb-1 text-xs text-neutral-400">
                  Saarthi • {msg.agent}
                </div>
              )}

              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {/* 🔹 Quick actions (only at start) */}
          {messages.length === 1 && (
            <div className="flex gap-2 flex-wrap">
              {[
                "What courses do you offer?",
                "Any discounts available?",
                "How can I take admission?",
              ].map((text) => (
                <button
                  key={text}
                  onClick={() => setInput(text)}
                  className="text-xs px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
                >
                  {text}
                </button>
              ))}
            </div>
          )}

          {/* 🔹 Typing animation */}
          {loading && <TypingIndicator />}

          <div ref={chatEndRef} />
        </main>

        {/* Input */}
        <footer className="border-t border-white/10 p-4">
          <div className="flex gap-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 resize-none rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2 text-sm overflow-hidden"
              placeholder="Ask about courses, offers, or support…"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-indigo-600 px-5 py-2 rounded-lg text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
