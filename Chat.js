import { useState } from "react";
import { getGPTResponse } from "../utils/gpt";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    const reply = await getGPTResponse(newMessages);
    setMessages([...newMessages, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Talk with MyG</h1>
      <div className="h-80 overflow-y-auto border p-3 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <p className="bg-gray-100 inline-block p-2 my-1 rounded">
              {msg.content}
            </p>
          </div>
        ))}
        {loading && <p className="italic text-gray-500">MyG is typing...</p>}
      </div>
      <div className="mt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border flex-grow rounded-l px-3 py-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}
