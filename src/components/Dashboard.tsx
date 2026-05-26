import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Bookmark, 
  MessageSquare, 
  Star, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  AlertCircle,
  Brain,
  Zap,
  BookOpen
} from "lucide-react";
import { Session, Tutor } from "../types";

interface DashboardProps {
  sessions: Session[];
  savedTutors: Tutor[];
  onNavigateToProfile: (tutorId: string) => void;
  onCancelSession: (sessionId: string) => void;
  onTriggerFeedback: (sessionId: string) => void;
  isDarkMode: boolean;
}

export default function Dashboard({
  sessions,
  savedTutors,
  onNavigateToProfile,
  onCancelSession,
  onTriggerFeedback,
  isDarkMode
}: DashboardProps) {
  // AI recommendations state
  const [aiInterests, setAiInterests] = useState("");
  const [aiGoal, setAiGoal] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<{
    recommendations: {
      skill: string;
      reason: string;
      difficulty: string;
      nextSteps: string;
    }[];
    aiTips?: string;
  } | null>(null);

  const fetchAiRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInterests.trim() || !aiGoal.trim()) {
      setAiError("Please specify your current interests and learning goals!");
      return;
    }

    setAiLoading(true);
    setAiResults(null);
    setAiError(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests: aiInterests, goal: aiGoal }),
      });
      const data = await res.json();
      setAiResults(data);
    } catch (err) {
      console.error(err);
      setAiError("Failed to connect to the recommendation server. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const getFormatIcon = (format: "Online" | "Physical") => {
    return format === "Online" ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />;
  };

  // Divide sessions into Upcoming vs Completed/Feedback pending
  const upcomingSwaps = sessions.filter(s => s.status === "Upcoming");
  const completedSwaps = sessions.filter(s => s.status === "Completed" || s.status === "Pending Feedback");

  return (
    <div className={`py-10 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-extrabold tracking-tight">Student Dashboard</h1>
          <p className="text-sm text-slate-500 mt-2">Track your upcoming collaborative sessions, manage saved mentors, or seek conversational Gemini Recommendations.</p>
        </div>

        {/* Top progression metrics counters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-205 shadow-sm"}`}>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Total Exchange Hours</span>
            <span className="text-2xl font-extrabold font-display block mt-1">12.5 hrs</span>
            <span className="text-[9px] text-slate-400 block mt-1">+2.0 hrs from last week</span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-250 shadow-sm"}`}>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Completed Swaps</span>
            <span className="text-2xl font-extrabold font-display block mt-1">{completedSwaps.length} sessions</span>
            <span className="text-[9px] text-green-500 font-bold block mt-1">100% attendance rate</span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-205 shadow-sm"}`}>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Skills Acquired</span>
            <span className="text-2xl font-extrabold font-display block mt-1">3 directories</span>
            <span className="text-[9px] text-slate-400 block mt-1">Excel, Canva, Powerpoint</span>
          </div>

          <div className={`p-4 rounded-2xl border bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-transparent ${
            isDarkMode ? "border-slate-800" : "border-indigo-100 shadow-sm"
          }`}>
            <span className="text-[10px] font-bold text-indigo-505 dark:text-indigo-400 block uppercase tracking-wider">Streak Badge</span>
            <span className="text-2xl font-extrabold font-display block mt-1 flex items-center gap-1">
              <Zap className="w-5 h-5 text-amber-500 fill-current animate-bounce" />
              <span>4 Days</span>
            </span>
            <span className="text-[9px] text-slate-400 block mt-1">Active swap scholar badge</span>
          </div>
        </div>

        {/* Left Side: Sessions and Saved, Right Side: AI Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming sessions card */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-705" : "bg-white border-slate-200 shadow-sm"}`}>
              <h2 className="text-base font-display font-bold mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>Upcoming Swaps ({upcomingSwaps.length})</span>
              </h2>

              {upcomingSwaps.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/30 rounded-xl">
                  <p className="text-xs text-slate-400">You don't have any booked sessions planned. Explore the skill directory and secure a slot with a peer!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingSwaps.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-150 dark:border-slate-700 bg-slate-50/20 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.tutorAvatar}
                          alt={item.tutorName}
                          className="w-10 h-10 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-xs">{item.skillName} session</h4>
                          <span className="text-[10px] text-slate-400 mt-1 block">Taught by {item.tutorName}</span>
                          <div className="flex flex-wrap gap-2.5 mt-2 text-[10px] text-slate-500">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-500" /> {item.date} • {item.timeSlot}</span>
                            <span className="flex items-center gap-1 capitalize">{getFormatIcon(item.type)} {item.type} standard</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2.5 sm:justify-end self-end sm:self-center">
                        <button
                          onClick={() => onCancelSession(item.id)}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded bg-red-50 text-red-650 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Swaps / Pending feedback */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-705" : "bg-white border-slate-205 shadow-sm"}`}>
              <h2 className="text-base font-display font-bold mb-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Completed & History Swaps</span>
              </h2>

              {completedSwaps.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">No historical records found.</p>
              ) : (
                <div className="space-y-3">
                  {completedSwaps.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-700/50 flex justify-between items-center text-xs"
                    >
                      <div>
                        <span className="font-semibold block">{item.skillName} swapped</span>
                        <span className="text-[10px] text-slate-400">Class with {item.tutorName} • {item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === "Pending Feedback" ? (
                          <button
                            onClick={() => onTriggerFeedback(item.id)}
                            className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 text-indigo-500 rounded font-semibold text-[10px] tracking-wide"
                          >
                            ⭐ Leave Review
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Review Posted ✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Bookmarked Peer Tutors */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-705" : "bg-white border-slate-200 shadow-sm"}`}>
              <h2 className="text-base font-display font-bold mb-4 flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-indigo-500" />
                <span>Saved Peers ({savedTutors.length})</span>
              </h2>

              {savedTutors.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Your bookmark list is empty. Click the bookmark pin on any peer card to track them here!</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedTutors.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => onNavigateToProfile(t.id)}
                      className="p-3.5 rounded-xl border border-slate-150 hover:border-slate-350 dark:border-slate-700 hover:scale-[1.01] transition-all cursor-pointer flex gap-3 bg-slate-50/50 dark:bg-slate-900/30"
                    >
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-semibold text-xs leading-none">{t.name}</h4>
                        <span className="text-[9px] text-slate-450 mt-1 block leading-normal line-clamp-1">{t.course}</span>
                        <div className="flex items-center space-x-1 mt-1 font-bold text-[9px] text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{t.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: AI Gemini Skill Recommendations Panel */}
          <div>
            <div className={`p-6 rounded-2xl border bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent z-10 relative overflow-hidden ${
              isDarkMode ? "bg-slate-850 border-slate-700" : "bg-white border-indigo-100 shadow-lg"
            }`}>
              <div className="absolute top-2 right-2 flex text-indigo-500/10 h-14 w-14">
                <Brain className="w-full h-full stroke-1 animate-pulse" />
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-4 h-4 text-purple-500 animate-spin" />
                  <span className="font-bold text-xs uppercase tracking-wider">Secure Server AI recommendations</span>
                </div>
                <h3 className="text-base sm:text-lg font-display font-extrabold mt-1">What should I learn next?</h3>
                <p className="text-[10px] text-slate-550 dark:text-slate-400 mt-1">Tell us your current goals or major, and we will query Gemini server-side securely to recommend custom learning plans.</p>
              </div>

              {/* Form Input areas */}
              <form onSubmit={fetchAiRecommendations} className="space-y-3.5 mb-6">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Your Major / Interests</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Biotech, photography, mobile development"
                    value={aiInterests}
                    onChange={(e) => {
                      setAiInterests(e.target.value);
                      setAiError(null);
                    }}
                    className="w-full text-xs p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Learning Goal</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Plotting lab regression lines, landing internship"
                    value={aiGoal}
                    onChange={(e) => {
                      setAiGoal(e.target.value);
                      setAiError(null);
                    }}
                    className="w-full text-xs p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800"
                  />
                </div>

                {aiError && (
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-650 dark:text-red-400 text-[10px] font-semibold flex items-center gap-1.5 leading-tight">
                    <span>⚠️</span>
                    <span>{aiError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={aiLoading}
                  className="w-full py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white shadow-xs transition-all flex items-center justify-center space-x-1 cursor-pointer"
                >
                  {aiLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Thinking...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 shrink-0" />
                      <span>Request AI Plan</span>
                    </>
                  )}
                </button>
              </form>

              {/* AI Gemini Output */}
              {aiResults && (
                <div className="space-y-4">
                  <div className="border-t border-dashed border-slate-200 dark:border-slate-700 pt-4">
                    <span className="text-[10px] font-bold uppercase text-indigo-500 block mb-3 animate-pulse">Personalized Match Path:</span>
                    
                    <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
                      {aiResults.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="font-extrabold text-xs text-indigo-650 dark:text-indigo-400">{rec.skill}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-50 dark:bg-violet-955/20 text-indigo-600 font-bold">{rec.difficulty}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed"><strong>Rationale:</strong> {rec.reason}</p>
                          <p className="text-[10px] text-slate-400 mt-1 border-t border-slate-150 dark:border-slate-800 pt-1.5 font-medium"><strong>Next step:</strong> {rec.nextSteps}</p>
                        </div>
                      ))}
                    </div>

                    {aiResults.aiTips && (
                      <p className="text-[10px] italic text-indigo-501 bg-indigo-50/40 p-2 border rounded-lg mt-3 text-indigo-650 dark:text-indigo-400">
                        {aiResults.aiTips}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
