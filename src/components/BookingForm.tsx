import React, { useState } from "react";
import { 
  X, 
  MapPin, 
  Globe, 
  Video, 
  Clipboard, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { Tutor } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface BookingFormProps {
  tutor: Tutor;
  onConfirmBooking: (bookingDetails: {
    tutorId: string;
    tutorName: string;
    tutorAvatar: string;
    skillName: string;
    date: string;
    timeSlot: string;
    type: "Online" | "Physical";
    notes: string;
  }) => void;
  onCancel: () => void;
  isDarkMode: boolean;
  preselectedDay?: string;
  preselectedSlot?: string;
}

export default function BookingForm({
  tutor,
  onConfirmBooking,
  onCancel,
  isDarkMode,
  preselectedDay,
  preselectedSlot
}: BookingFormProps) {
  // Simple realistic calendar generation (Next 7 days)
  const daysOption = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const [selectedDayObj, setSelectedDayObj] = useState<{
    dayName: string;
    dateStr: string;
  }>(() => {
    const today = new Date();
    // Default to preselected or today's weekday
    const preDay = preselectedDay || "Monday";
    
    // Quick helper to generate formatted dates
    const dateListStr = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() + i + 1);
      const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return { dayName, dateStr };
    });

    const found = dateListStr.find(d => d.dayName === preDay);
    return found || dateListStr[0] || { dayName: "Monday", dateStr: "Jun 1" };
  });

  const [selectedSlot, setSelectedSlot] = useState(preselectedSlot || "");
  const [sessionType, setSessionType] = useState<"Online" | "Physical">("Online");
  const [notes, setNotes] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(tutor.skills[0]?.name || "");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Generate date list again for visual selection
  const upcomingDates = (() => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() + i + 1);
      const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return { dayName, dateStr };
    });
  })();

  // Retrieve active slots from the tutor availability matching selected dayName
  const availableSlots = tutor.availability.find(av => av.day === selectedDayObj.dayName)?.slots || [];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setErrorMsg("Please select an available afternoon or morning slot to proceed!");
      return;
    }

    setErrorMsg(null);
    // Trigger success state first
    setIsSuccessModalOpen(true);
  };

  const handleFinalSuccessConfirm = () => {
    setIsSuccessModalOpen(false);
    onConfirmBooking({
      tutorId: tutor.id,
      tutorName: tutor.name,
      tutorAvatar: tutor.avatar,
      skillName: selectedSkill,
      date: `${selectedDayObj.dayName} (${selectedDayObj.dateStr})`,
      timeSlot: selectedSlot,
      type: sessionType,
      notes: notes
    });
  };

  return (
    <div className={`py-12 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Booking Banner Info */}
        <div className={`p-6 rounded-3xl border mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDarkMode ? "bg-indigo-950/20 border-indigo-900" : "bg-indigo-50/50 border-indigo-100"
        }`}>
          <div className="flex items-center gap-3.5">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="w-12 h-12 rounded-xl object-cover border"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-500">SCHEDULING SWAP WITH</span>
              <h2 className="text-base sm:text-lg font-display font-extrabold">{tutor.name}</h2>
              <p className="text-xs text-slate-400">{tutor.course}</p>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Choose relative
          </button>
        </div>

        {/* Master Form */}
        <form onSubmit={handleBookingSubmit} className={`p-6 sm:p-8 rounded-3xl border ${
          isDarkMode ? "bg-slate-800 border-slate-705" : "bg-white border-slate-200 shadow-sm"
        }`}>
          {/* Skill Selector */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Subject matter</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tutor.skills.map((s, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedSkill(s.name)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedSkill === s.name
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-semibold">{s.name}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    selectedSkill === s.name ? "bg-white/25 text-white" : "bg-indigo-50 dark:bg-slate-800 text-indigo-600"
                  }`}>
                    {s.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Date Selector */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">Select Date</label>
            <div className="flex gap-2.5 overflow-x-auto pb-2.5 scrollbar-thin">
              {upcomingDates.map((item, id) => {
                const isActive = selectedDayObj.dayName === item.dayName;
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setSelectedDayObj(item);
                      setSelectedSlot(""); // Clear slot when date changes
                      setErrorMsg(null);
                    }}
                    className={`p-3 w-20 text-center rounded-xl shrink-0 cursor-pointer border transition-all ${
                      isActive
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-slate-50 dark:bg-slate-900 border-slate-150 dark:border-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block text-[10px] text-slate-400 uppercase leading-none mb-1">{item.dayName.slice(0, 3)}</span>
                    <span className="block text-xs font-extrabold">{item.dateStr}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time slot selectors */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select Available Time Slot</label>
            {availableSlots.length === 0 ? (
              <div className="p-4 rounded-xl text-center bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs flex items-center justify-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{tutor.name} has no matching open slots on {selectedDayObj.dayName}. Feel free to propose a custom time in messages!</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setErrorMsg(null);
                    }}
                    className={`p-2.5 text-center text-xs font-semibold rounded-lg border cursor-pointer transition-all ${
                      selectedSlot === slot
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Session Location format */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Class Format</label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setSessionType("Online")}
                className={`p-3 rounded-xl border cursor-pointer flex items-center space-x-2.5 transition-all ${
                  sessionType === "Online"
                    ? "bg-indigo-600/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
                }`}
              >
                <Video className="w-5 h-5 shrink-0" />
                <div className="leading-none">
                  <span className="text-xs block">Online Call</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Google Meet / Discord</span>
                </div>
              </div>

              <div
                onClick={() => setSessionType("Physical")}
                className={`p-3 rounded-xl border cursor-pointer flex items-center space-x-2.5 transition-all ${
                  sessionType === "Physical"
                    ? "bg-indigo-600/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
                }`}
              >
                <MapPin className="w-5 h-5 shrink-0" />
                <div className="leading-none">
                  <span className="text-xs block">Physical Meetup</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Building B Commons, Lab</span>
                </div>
              </div>
            </div>
          </div>

          {/* Special request notes */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Session notes (optional)</label>
            <textarea
              placeholder="Ex: Please let me know if we need to pre-install React or download any special spreadsheet dataset beforehand."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850"
            ></textarea>
          </div>

          {/* Confirm CTAs */}
          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-505/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 animate-pulse">
              <span className="font-extrabold text-sm">⚠️</span>
              <span className="font-semibold">{errorMsg}</span>
            </div>
          )}
          <div className="flex gap-3 justify-end items-center">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-650 dark:text-slate-300 font-semibold text-xs rounded-xl cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all"
            >
              Book Peer Swap
            </button>
          </div>
        </form>

        {/* Success Modal Overlay */}
        <AnimatePresence>
          {isSuccessModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`w-full max-w-md rounded-3xl p-6 text-center shadow-xl border ${
                  isDarkMode ? "bg-slate-800 border-slate-700 text-slate-100" : "bg-white border-slate-100 text-slate-900"
                }`}
              >
                <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold">Booking Request Submitted!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                  Your session request with <strong>{tutor.name}</strong> for <strong>{selectedSkill}</strong> has been successfully booked for <strong>{selectedDayObj.dayName} {selectedDayObj.dateStr} at {selectedSlot}</strong>.
                </p>

                <div className={`mt-5 p-3 rounded-xl border text-left flex gap-2.5 items-start ${
                  isDarkMode ? "bg-slate-900/60 border-slate-700" : "bg-slate-50 border-slate-100"
                }`}>
                  <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block text-slate-750 dark:text-slate-200">What happens next?</span>
                    <span className="text-[10px] text-slate-400 leading-normal block mt-0.5">We have automatically sent a message block to Ahmad on your behalf. Keep an eye on your Messages box!</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinalSuccessConfirm}
                  className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
