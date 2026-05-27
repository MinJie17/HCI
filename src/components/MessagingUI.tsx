import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Paperclip, 
  Smile, 
  User, 
  FolderPlus, 
  CheckCheck,
  Search,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { ChatThread, Message } from "../types";

interface MessagingUIProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSendMessage: (tutorId: string, messageText: string, fileInfo?: { name: string; url: string }) => void;
  onReactToMessage: (tutorId: string, messageId: string, emoji: string) => void;
  onSelectThread: (tutorId: string) => void;
  isDarkMode: boolean;
}

export default function MessagingUI({
  threads,
  activeThreadId,
  onSendMessage,
  onReactToMessage,
  onSelectThread,
  isDarkMode
}: MessagingUIProps) {
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic file upload mock
  const [attachedFile, setAttachedFile] = useState<{name: string, url: string} | null>(null);

  const activeThread = threads.find(t => t.tutorId === activeThreadId) || threads[0] || null;

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages?.length]);

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread) return;
    if (!inputText.trim() && !attachedFile) return;

    onSendMessage(
      activeThread.tutorId, 
      inputText, 
      attachedFile || undefined
    );

    // clear fields
    setInputText("");
    setAttachedFile(null);
  };

  const handleSimulatedFileUpload = () => {
    // Inject a quick mock zip or pdf file
    setAttachedFile({
      name: "React_Cheat_Sheet.pdf",
      url: "#"
    });
  };

  const handleEmojiInsert = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  // Filter threads lists based on query
  const filteredThreads = threads.filter(t => 
    t.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`py-6 select-none ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container box */}
        <div className={`rounded-3xl border h-[620px] overflow-hidden flex ${
          isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-lg"
        }`}>
          
          {/* LEFT: Peer Thread list */}
          <div className="w-80 border-r border-slate-100 dark:border-slate-700 flex flex-col h-full bg-slate-50/20 dark:bg-slate-900/10">
            {/* Search thread box */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-700">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2.5 text-xs bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-505 rounded-xl border border-slate-205 dark:border-slate-700 w-full"
                />
              </div>
            </div>

            {/* Threads stack container */}
            <div className="flex-1 overflow-y-auto space-y-1 p-2">
              {filteredThreads.length === 0 ? (
                <p className="text-center text-slate-400 text-xs py-8">No chats active.</p>
              ) : (
                filteredThreads.map((thread) => {
                  const isActive = activeThread?.tutorId === thread.tutorId;
                  return (
                    <div
                      key={thread.tutorId}
                      onClick={() => onSelectThread(thread.tutorId)}
                      className={`p-3 rounded-2xl cursor-pointer flex gap-3 transition-all ${
                        isActive
                          ? "bg-indigo-650 bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={thread.tutorAvatar}
                          alt={thread.tutorName}
                          className="w-10 h-10 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {thread.isOnline && (
                          <span className="absolute -bottom-0.5 -right-0.5 bg-green-500 h-2.5 w-2.5 rounded-full ring-2 ring-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-extrabold text-xs truncate leading-none">{thread.tutorName}</h4>
                          <span className={`text-[9px] font-mono leading-none ${isActive ? "text-white/70" : "text-slate-400"}`}>{thread.timestamp}</span>
                        </div>
                        <p className={`text-[11px] truncate ${isActive ? "text-white/80" : "text-slate-500"}`}>{thread.lastMessage}</p>
                      </div>
                      {thread.unreadCount > 0 && !isActive && (
                        <span className="shrink-0 bg-red-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT: Active Chat frame */}
          <div className="flex-1 flex flex-col h-full">
            {activeThread ? (
              <>
                {/* Active Header details */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeThread.tutorAvatar}
                      alt={activeThread.tutorName}
                      className="w-10 h-10 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-display font-bold text-xs sm:text-sm">{activeThread.tutorName}</h3>
                      <div className="flex items-center space-x-1.5 mt-0.5 text-[10px]">
                        <span className={`h-1.5 w-1.5 rounded-full ${activeThread.isOnline ? "bg-green-500" : "bg-slate-400"}`}></span>
                        <span className="text-slate-400">{activeThread.isOnline ? "Online now" : "Offline"}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold px-2 py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">SkillLink Room</span>
                </div>

                {/* Messages stream box */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="text-center">
                    <span className="inline-block text-[10px] text-slate-400 font-bold px-3 py-1 bg-slate-100/30 dark:bg-slate-900/30 rounded-full">Conversation initiated safely with HCI controls</span>
                  </div>

                  {activeThread.messages.map((msg) => {
                    const isOwnMessage = msg.senderId === "student_user";
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 max-w-[80%] relative group ${
                          isOwnMessage ? "ml-auto flex-row-reverse" : "mr-auto"
                        }`}
                      >
                        {!isOwnMessage && (
                          <img
                            src={msg.senderAvatar}
                            alt={msg.senderName}
                            className="w-8 h-8 rounded-full shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="relative">
                          {/* Hover Emoji Reaction Picker */}
                          <div className={`absolute -top-8 z-20 hidden group-hover:flex items-center gap-1 p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg transition-all animate-in fade-in zoom-in-95 duration-100 ${
                            isOwnMessage ? "right-0" : "left-0"
                          }`}>
                            {["👍", "❤️", "😂", "😮", "😢", "🔥"].map((emo) => {
                              const currentReaction = msg.reactions?.find(r => r.emoji === emo);
                              const isSelected = currentReaction?.users.includes("student_user");
                              return (
                                <button
                                  key={emo}
                                  type="button"
                                  onClick={() => onReactToMessage(activeThread.tutorId, msg.id, emo)}
                                  className={`w-6.5 h-6.5 flex items-center justify-center text-xs rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all hover:scale-120 cursor-pointer ${
                                    isSelected ? "bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-805" : ""
                                  }`}
                                  title={`React with ${emo}`}
                                >
                                  {emo}
                                </button>
                              );
                            })}
                          </div>

                          <div className={`rounded-2xl p-3 text-xs leading-relaxed ${
                            isOwnMessage
                              ? "bg-indigo-600 text-white rounded-tr-none"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none"
                          }`}>
                            <p>{msg.text}</p>
                            
                            {/* Attachement if any */}
                            {msg.fileUrl && (
                              <div className={`mt-2 p-2 rounded-lg border text-[10px] flex items-center justify-between ${
                                isOwnMessage ? "bg-white/10 border-white/20 text-white" : "bg-white dark:bg-slate-850 border-slate-100 text-slate-800"
                              }`}>
                                <span className="underline font-mono">{msg.fileName}</span>
                                <span className="text-[9px] opacity-70">Shared Attachment</span>
                              </div>
                            )}
                          </div>

                          {/* Existing reactions list */}
                          {msg.reactions && msg.reactions.length > 0 && (
                            <div className={`flex flex-wrap gap-1 mt-1 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                              {msg.reactions.map((react, rIdx) => {
                                const hasReacted = react.users.includes("student_user");
                                return (
                                  <button
                                    key={rIdx}
                                    type="button"
                                    onClick={() => onReactToMessage(activeThread.tutorId, msg.id, react.emoji)}
                                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                                      hasReacted
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-805 dark:text-indigo-300"
                                        : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                                    }`}
                                  >
                                    <span>{react.emoji}</span>
                                    <span>{react.count}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                          
                          {/* Timestamp info line */}
                          <div className={`flex items-center gap-1 mt-1 text-[9px] text-slate-400 ${
                            isOwnMessage ? "justify-end" : "justify-start"
                          }`}>
                            <span>{msg.timestamp}</span>
                            {isOwnMessage && <CheckCheck className="w-3 h-3 text-indigo-500" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* File Attachment preview if any */}
                {attachedFile && (
                  <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700 bg-amber-500/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px]">Preparing to send: <strong>{attachedFile.name}</strong></span>
                    <button onClick={() => setAttachedFile(null)} className="text-red-500 font-semibold hover:underline">Cancel</button>
                  </div>
                )}

                {/* Chat Input form box */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/10">
                  <form onSubmit={handleSendSubmit} className="flex gap-2">
                    {/* Attachments pin */}
                    <button
                      type="button"
                      onClick={handleSimulatedFileUpload}
                      className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                      title="Simulate pdf/zip upload"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>

                    <input
                      type="text"
                      placeholder={`Type message to ${activeThread.tutorName}...`}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="flex-1 text-xs px-3 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-501 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
                    />

                    {/* Emoji suggestions strip trigger */}
                    <div className="flex gap-1.5 px-1 items-center">
                      {["👍", "🙌", "🔥", "🤝"].map((emo, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleEmojiInsert(emo)}
                          className="hover:scale-110 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 h-7 w-7 rounded-sm flex items-center justify-center border"
                        >
                          {emo}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="p-3 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] text-white rounded-xl shadow-md transition-all flex items-center justify-center shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/10">
                <MessageSquare className="w-12 h-12 text-slate-400 mb-2.5" />
                <h4 className="font-semibold text-sm">No Active Conversation selected</h4>
                <p className="text-slate-400 text-xs mt-1">Please select a peer connection from the left pane or go directory to view biographical schedule boards.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
