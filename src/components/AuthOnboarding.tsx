import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Star, 
  User, 
  Lock, 
  CheckCircle,
  HelpCircle,
  ArrowRight,
  BookOpen
} from "lucide-react";

interface AuthOnboardingProps {
  isLoginOpen: boolean;
  onCloseLogin: () => void;
  onLoginSuccess: () => void;
  isTourActive: boolean;
  onCloseTour: () => void;
  isDarkMode: boolean;
}

export default function AuthOnboarding({
  isLoginOpen,
  onCloseLogin,
  onLoginSuccess,
  isTourActive,
  onCloseTour,
  isDarkMode
}: AuthOnboardingProps) {
  // Auth parameters
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Guided Tour parameters (steps 0 to 5 matching flow requested)
  const [tourStep, setTourStep] = useState(0);

  const tourStepsList = [
    {
      title: "Welcome to QIU SkillSwap! 🎓",
      description: "This interactive guide will walk you through our standard peer-to-peer exchange flow. Learn skills directly from high-achieving classmates!",
      actionLabel: "Start Tour Guide"
    },
    {
      title: "Step 1: Discover Specialized Skill Sets 🔍",
      description: "From the Homepage, enter keywords in our search box or browse specific department categories (Programming, PowerPoint, Photoshop, or Microsoft Excel).",
      actionLabel: "Next Step"
    },
    {
      title: "Step 2: Inspect Student Biography Cards ⭐️",
      description: "Tap any peer card in the Explore directory to view their complete portfolio items, student courses, peer reviews, and real-time open weekly availability.",
      actionLabel: "Next Step"
    },
    {
      title: "Step 3: Schedule Day & Time Slots 📅",
      description: "Click any green slot inside their calendar page, specify Online (Google Meet) or Physical (Library Commons), and click Book Peer Swap!",
      actionLabel: "Next Step"
    },
    {
      title: "Step 4: Engage in Dynamic Chat Rooms ✉️",
      description: "Connect on the Messaging screen. Discuss requirements, type message text, and attach mock data worksheets or slide outlines securely.",
      actionLabel: "Next Step"
    },
    {
      title: "Step 5: Write Supportive Reviews ⭐️",
      description: "After completing your session, visit the feedback screen to leave star ratings and written reviews. Help confirm trust on campus!",
      actionLabel: "Unlock Campus Portal!"
    }
  ];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) return;
    onLoginSuccess();
    onCloseLogin();
  };

  const handleNextTourStep = () => {
    if (tourStep < tourStepsList.length - 1) {
      setTourStep(prev => prev + 1);
    } else {
      setTourStep(0);
      onCloseTour();
    }
  };

  return (
    <>
      {/* 1. Login Authentication Overlay Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-sm rounded-3xl p-6 shadow-xl border relative ${
            isDarkMode ? "bg-slate-800 border-slate-700 text-slate-100" : "bg-white border-slate-100 text-slate-900"
          }`}>
            <button
              onClick={onCloseLogin}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:bg-slate-150 rounded"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QIU SkillSwap
              </span>
              <p className="text-slate-400 text-xs mt-1">Quest International University peer access</p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">QIU Student Email ID</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="student@qiu.edu.my"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-505 rounded-xl border border-slate-150 dark:border-slate-800 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Portal Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-505 rounded-xl border border-slate-150 dark:border-slate-800 w-full"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 pl-1">
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <button type="button" onClick={() => setIsForgotPassword(true)} className="hover:underline hover:text-indigo-500">Forgot Password?</button>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
              >
                <span>Authorize Student Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-center text-[10px] text-slate-400 mt-4 leading-normal">
                New to Campus Swap? Sign up with your university registrar registration block automatically.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* 2. Interactive Guided spotlight User Tour */}
      {isTourActive && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${
            isDarkMode ? "bg-slate-850 border-slate-700 text-slate-100" : "bg-white border-indigo-150 text-slate-900"
          }`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4 text-purple-500 animate-spin" />
                <span className="font-bold text-[10px] uppercase tracking-wider">QIU SkillSwap Interactive Academy Tour</span>
              </div>
              <button
                onClick={onCloseTour}
                className="p-1 px-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 rounded-lg text-slate-400 text-xs font-semibold"
                title="Exit guidance"
              >
                Exit Tour
              </button>
            </div>

            {/* Visual indicators timeline bullets */}
            <div className="flex gap-1.5 justify-center mb-5">
              {tourStepsList.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === tourStep ? "w-6 bg-indigo-600" : "w-1.5 bg-slate-200 dark:bg-slate-700"
                  }`}
                ></span>
              ))}
            </div>

            {/* Step text content */}
            <div className="text-center md:text-left min-h-[140px]">
              <h3 className="font-display font-bold text-sm sm:text-base">{tourStepsList[tourStep].title}</h3>
              <p className="text-slate-505 text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                {tourStepsList[tourStep].description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 text-[10px] font-mono">Step {tourStep + 1} of {tourStepsList.length}</span>
              <button
                onClick={handleNextTourStep}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-600/10 flex items-center space-x-1"
              >
                <span>{tourStepsList[tourStep].actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
