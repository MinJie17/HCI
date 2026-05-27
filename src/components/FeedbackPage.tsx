import React, { useState } from "react";
import { 
  Star, 
  BookOpen, 
  MessageSquare, 
  CheckCircle, 
  ArrowLeft,
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";
import { Session } from "../types";

interface FeedbackPageProps {
  sessions: Session[];
  onSubmitReview: (reviewData: {
    tutorId: string;
    rating: number;
    comment: string;
    skillName: string;
  }) => void;
  onCancel: () => void;
  isDarkMode: boolean;
}

export default function FeedbackPage({
  sessions,
  onSubmitReview,
  onCancel,
  isDarkMode
}: FeedbackPageProps) {
  // Filter sessions that are pending feedback, or use standard completed ones as sandbox
  const reviewableSessions = sessions.filter(s => s.status === "Pending Feedback" || s.status === "Completed");

  const [selectedSessionId, setSelectedSessionId] = useState(reviewableSessions[0]?.id || "");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeSessionItem = reviewableSessions.find(s => s.id === selectedSessionId) || reviewableSessions[0];

  const handleReviewFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSessionItem) {
      setErrorMsg("Please select a completed session to assign ratings!");
      return;
    }
    if (!comment.trim()) {
      setErrorMsg("Please offer a brief written comment on the session experience!");
      return;
    }

    setErrorMsg(null);
    onSubmitReview({
      tutorId: activeSessionItem.tutorId,
      rating: rating,
      comment: comment,
      skillName: activeSessionItem.skillName
    });

    setIsSuccessSubmitted(true);
  };

  return (
    <div className={`py-12 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back and header */}
        <button
          onClick={onCancel}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Back</span>
        </button>

        {isSuccessSubmitted ? (
          <div className={`p-8 rounded-3xl text-center border ${
            isDarkMode ? "bg-slate-800 border-slate-705" : "bg-white border-slate-200"
          }`}>
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-500">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-display font-extrabold">Peer Review Submitted!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
              Thank you for providing constructive feedback! Your rating has been integrated into their biography score. This helps verify trust and high standards in QIU SkillLink.
            </p>
            <button
              onClick={onCancel}
              className="w-full mt-6 py-3 bg-indigo-650 bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              Return to User Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleReviewFormSubmit} className={`p-6 sm:p-8 rounded-3xl border ${
            isDarkMode ? "bg-slate-800 border-slate-705" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="mb-6">
              <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">HCI FEEDBACK GATEWAY</span>
              <h1 className="text-xl sm:text-2xl font-display font-extrabold mt-1">Rate Your Learning Session</h1>
              <p className="text-slate-400 text-xs mt-1">Share helpful reviews and help your peer-instructor grow their academic credentials.</p>
            </div>

            {/* Session dropdown picker */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">1. Select Swapped Class</label>
              {reviewableSessions.length === 0 ? (
                <div className="p-4 rounded-xl text-center bg-slate-100 text-slate-500 text-xs">
                  Review sandbox: You do not have any pending feedback sessions currently. Book and complete a peer swap first!
                </div>
              ) : (
                <select
                  value={selectedSessionId}
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                  className="w-full text-xs p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl cursor-pointer"
                >
                  {reviewableSessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.skillName} with {session.tutorName} - {session.date}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Active tutor meta box */}
            {activeSessionItem && (
              <div className={`p-4 rounded-2xl border mb-6 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/60 ${
                isDarkMode ? "border-slate-750" : "border-slate-150"
              }`}>
                <div className="flex items-center gap-2.5">
                  <img
                    src={activeSessionItem.tutorAvatar}
                    alt={activeSessionItem.tutorName}
                    className="w-10 h-10 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-semibold text-xs">{activeSessionItem.tutorName}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Category: {activeSessionItem.skillName}</p>
                  </div>
                </div>
                <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-lg px-2.5 py-1 font-bold">Pending Review</span>
              </div>
            )}

            {/* Star Picker */}
            <div className="mb-6 text-center">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">2. Choose Rating Stars</label>
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = hoveredStar !== null ? star <= hoveredStar : star <= rating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      onClick={() => setRating(star)}
                      className="p-1.5 focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          filled ? "text-amber-500 fill-current" : "text-slate-300 dark:text-slate-700"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] block mt-2 font-semibold text-slate-400">
                {rating === 5 && "⭐ Excellent - Unbelievably supportive and clear!"}
                {rating === 4 && "⭐ Very Good - Highly recommended peer mentor."}
                {rating === 3 && "⭐ Satisfactory - Covered everything as promised."}
                {rating === 2 && "⭐ Needs Improvement - Slow to communicate."}
                {rating === 1 && "⭐ Disappointed - Did not attend slot."}
              </span>
            </div>

            {/* Written Comment Area */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">3. Share Written Experience notes</label>
              <textarea
                placeholder="Explanation: Ahmad explains index matches clearly. We set up an excel regression analysis plot and saved hours on our biotech report tasks."
                rows={4}
                required
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full text-xs p-3.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50/50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800 rounded-xl"
              ></textarea>
            </div>

            {/* Submit triggers */}
            {errorMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-505/20 text-red-650 dark:text-red-400 text-xs flex items-center gap-2">
                <span className="font-extrabold text-sm">⚠️</span>
                <span className="font-semibold">{errorMsg}</span>
              </div>
            )}
            <div className="flex gap-2.5 justify-end items-center">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-550 dark:text-slate-400 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
