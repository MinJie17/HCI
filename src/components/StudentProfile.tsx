import { useState } from "react";
import { 
  Star, 
  BookOpen, 
  MapPin, 
  Award, 
  MessageSquare, 
  Calendar, 
  Heart, 
  ArrowLeft, 
  ExternalLink, 
  Briefcase,
  CheckCircle,
  ThumbsUp
} from "lucide-react";
import { Tutor, Review } from "../types";

interface StudentProfileProps {
  tutor: Tutor;
  reviews: Review[];
  onNavigateBack: () => void;
  onNavigateToBooking: (tutorId: string, preselectedDay?: string, preselectedSlot?: string) => void;
  onStartChat: (tutorId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (tutorId: string) => void;
  isDarkMode: boolean;
}

export default function StudentProfile({
  tutor,
  reviews,
  onNavigateBack,
  onNavigateToBooking,
  onStartChat,
  isBookmarked,
  onToggleBookmark,
  isDarkMode
}: StudentProfileProps) {
  const [activeTab, setActiveTab] = useState<"about" | "portfolio" | "reviews">("about");

  // Filter reviews matching current tutor ID
  const tutorReviews = reviews.filter(r => r.tutorId === tutor.id);

  return (
    <div className={`py-10 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onNavigateBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>

        {/* Profile Card Overlay */}
        <div className={`rounded-3xl border overflow-hidden mb-8 ${
          isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-md"
        }`}>
          {/* Cover gradient background */}
          <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-650 to-purple-600 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => onToggleBookmark(tutor.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 border ${
                  isBookmarked
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-white/95 text-slate-800 border-slate-200"
                } shadow-sm`}
              >
                <span>{isBookmarked ? "Saved Peer" : "Save Peer"}</span>
              </button>
            </div>
          </div>

          <div className="px-6 pb-6 relative">
            {/* Avatar positioning */}
            <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-4 gap-4">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-28 h-28 rounded-2xl border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="flex gap-2.5 w-full md:w-auto">
                <button
                  onClick={() => onStartChat(tutor.id)}
                  className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Chat</span>
                </button>
                <button
                  onClick={() => onNavigateToBooking(tutor.id)}
                  className="flex-1 md:flex-initial px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-600/10"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Slot</span>
                </button>
              </div>
            </div>

            {/* Profile Info details */}
            <div>
              <h1 className="text-2xl font-display font-extrabold">{tutor.name}</h1>
              <p className="text-xs text-slate-400 mt-1">{tutor.course} • Year {tutor.year}</p>

              <div className="flex flex-wrap gap-2 mt-3 items-center">
                <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold leading-normal">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{tutor.rating}</span>
                  <span className="text-slate-400 font-normal">({tutorReviews.length} reviewed swaps)</span>
                </div>
                {tutor.badges.map((b, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-[10px] font-bold text-blue-600 dark:text-blue-400"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-6">
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all relative ${
              activeTab === "about" ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span>About & Schedule</span>
            {activeTab === "about" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all relative ${
              activeTab === "portfolio" ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span>Porfolio / Showcase</span>
            {activeTab === "portfolio" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all relative ${
              activeTab === "reviews" ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span>Student Reviews ({tutorReviews.length})</span>
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "about" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About Card Left */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`p-6 rounded-2xl border ${
                isDarkMode ? "bg-slate-800/40 border-slate-705" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <h3 className="font-semibold text-sm mb-3">Tutor biography</h3>
                <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">
                  {tutor.about}
                </p>
              </div>

              {/* Skills Card */}
              <div className={`p-6 rounded-2xl border ${
                isDarkMode ? "bg-slate-800/40 border-slate-705" : "bg-white border-slate-100 shadow-sm"
              }`}>
                <h3 className="font-semibold text-sm mb-3">Skills Offered</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tutor.skills.map((s, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex justify-between items-center"
                    >
                      <div>
                        <span className="text-xs font-semibold block">{s.name}</span>
                        <span className="text-[10px] text-slate-400">{s.category} department</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                        {s.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Schedule Right */}
            <div>
              <div className={`p-6 rounded-2xl border ${
                isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <h3 className="font-semibold text-sm mb-3 flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span>Availability Schedule</span>
                </h3>
                <p className="text-[10px] text-slate-400 mb-4">Click any open time slot below to start booking directly.</p>

                <div className="space-y-4">
                  {tutor.availability.map((av, i) => (
                    <div key={i} className="border-b border-dashed border-slate-200 dark:border-slate-700 pb-3 last:border-0 last:pb-0">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-2">{av.day}</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {av.slots.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => onNavigateToBooking(tutor.id, av.day, s)}
                            className="p-2 text-center text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/65 rounded-lg border border-indigo-150 border-slate-200 dark:border-indigo-900 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tutor.portfolio.length === 0 ? (
              <div className="sm:col-span-2 text-center py-12 text-slate-400 text-xs">
                No portfolio has been uploaded yet. Ask {tutor.name} in chat to share screenshots or references!
              </div>
            ) : (
              tutor.portfolio.map((p, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border overflow-hidden transition-all hover:shadow-md ${
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                  }`}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-48 object-cover border-b border-slate-150"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-sm mb-1">{p.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {tutorReviews.length === 0 ? (
              <p className="text-center py-12 text-slate-400 text-xs">
                No reviews yet. Be the first to schedule a session and leave dynamic feedback!
              </p>
            ) : (
              tutorReviews.map((r) => (
                <div
                  key={r.id}
                  className={`p-4 rounded-xl border ${
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={r.studentAvatar}
                        alt={r.studentName}
                        className="w-8 h-8 rounded-full"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-semibold text-xs leading-none">{r.studentName}</h4>
                        <span className="text-[9px] text-slate-400 block mt-1">Swapped for: {r.skillName}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">{r.date}</span>
                      <div className="flex gap-0.5 text-amber-500 justify-end">
                        {Array.from({ length: r.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic font-normal px-1 leading-normal">
                    "{r.comment}"
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
