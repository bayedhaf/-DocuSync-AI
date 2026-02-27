 "use client";

  import { useState } from "react";
  import { Send, FileText, Trash2, Bot } from "lucide-react";

  type Message = {
    role: "user" | "assistant";
    content: string;
  };

  export default function DocumentBot() {
        const [messages, setMessages] = useState<Message[]>([]);
        const [input, setInput] = useState("");
        const [loading, setLoading] = useState(false);
        const [isProcessing, setIsProcessing] = useState(false);
        const [extractedContext, setExtractedContext] = useState("");

        const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setIsProcessing(true);
          const formData = new FormData();
          formData.append("file", file);

          try {
            const res = await fetch("/api/process", { method: "POST", body: formData });
            const data = await res.json();
            setExtractedContext(data.fullText);
            alert("Knowledge Base Updated!");
          } catch {
            alert("Upload failed");
          } finally {
            setIsProcessing(false);
          }
        };

        const askQuestion = async () => {
          if (!input || !extractedContext) {
            alert("Please upload a document first!");
            return;
          }

          const question = input;
          setMessages((prev) => [...prev, { role: "user", content: question }]);
          setInput("");
          setLoading(true);

          try {
            const res = await fetch("/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ question, context: extractedContext }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error ?? "Chat request failed");
            setMessages((prev) => [...prev, { role: "assistant", content: data.answer ?? "No answer" }]);
          } catch (error) {
            const message = error instanceof Error ? error.message : "Chat failed";
            setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${message}` }]);
          } finally {
            setLoading(false);
          }
        };

        return (
          <div className="h-screen flex bg-[#0b1724] text-white relative">

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex md:w-80 flex-col border-r border-slate-700 p-6 bg-[#0f2236]">
              <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <FileText size={18} /> Documents
              </h2>

              <label className="cursor-pointer">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-200">
                  <FileText size={36} />
                  <p className="text-sm mt-2">Upload Document</p>
                </div>
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>

              {isProcessing && (
                <p className="text-xs text-teal-400 mt-3 animate-pulse">Processing document...</p>
              )}

              <div className="mt-auto">
                <button
                  onClick={() => setMessages([])}
                  className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 p-3 rounded-lg w-full transition"
                >
                  <Trash2 size={16} /> Clear Chat
                </button>
              </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex flex-col flex-1 overflow-hidden relative">

              {/* Header */}
              <header className="border-b border-slate-700 p-5 bg-[#0f2236]">
                <h1 className="font-semibold text-lg">AI Document Assistant</h1>
              </header>

              {/* Mobile Upload */}
              <div className="md:hidden p-4">
                <label className="cursor-pointer">
                  <div className="bg-gradient-to-br from-teal-600 to-teal-900 rounded-xl p-6 flex flex-col items-center text-center">
                    <FileText size={32} />
                    <p className="text-sm mt-2">Upload Document</p>
                  </div>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
                {isProcessing && (
                  <p className="text-xs text-teal-400 mt-2 animate-pulse">Processing document...</p>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 max-w-4xl w-full mx-auto">
                {!extractedContext && (
                  <div className="flex flex-col items-center justify-center text-center h-full text-slate-400 space-y-4">
                    <Bot size={50} className="opacity-60" />
                    <h2 className="text-lg font-semibold text-slate-300">Upload a Document to Start</h2>
                    <p className="text-sm max-w-sm">
                      Upload a PDF or document and ask questions about it. The AI will read the content and generate answers for you.
                    </p>
                    <div className="text-xs text-slate-500 mt-2">
                      Example questions:
                      <div className="mt-2 space-y-1">
                        <p>• What is this document about?</p>
                        <p>• Summarize the main points</p>
                        <p>• Extract key information</p>
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((m, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-xs text-slate-400">{m.role === "assistant" ? "AI Assistant" : "You"}</span>
                    <div className={`p-4 rounded-xl text-sm max-w-[75%] break-words ${
                    m.role === "assistant" 
        ? "bg-[#1f2a3f] text-slate-200 border border-indigo-500/20 shadow-lg" 
        : "bg-gradient-to-br from-indigo-600 to-blue-600 ml-auto text-white shadow-lg shadow-blue-600/20"
                                }`}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {loading && <p className="text-sm text-slate-400 italic">AI analyzing document...</p>}
              </div>

              {/* Floating Input */}
              <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#161e31] via-[#0f172a] to-transparent backdrop-blur-md z-10">
                <div className="flex items-center gap-3 bg-slate-700/80 backdrop-blur-sm rounded-3xl px-5 py-3 max-w-4xl mx-auto shadow-lg">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && askQuestion()}
                    placeholder="Ask about your document..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-300 placeholder-gray-400"
                  />
                  <button
                    onClick={askQuestion}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors rounded-full p-3 shadow-md"
                  >
                    <Send size={20} className="text-white" />
                  </button>
                </div>
              </div>

            </main>
          </div>
        );
      }