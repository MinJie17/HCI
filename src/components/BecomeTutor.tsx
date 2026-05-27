import React, { useState } from "react";
import { 
  BookOpen, 
  Plus, 
  Trash, 
  Check, 
  Sparkles, 
  Calendar, 
  Award, 
  Briefcase, 
  ArrowLeft, 
  Clock, 
  User, 
  GraduationCap,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { Tutor } from "../types";
import { CATEGORIES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface BecomeTutorProps {
  existingTutor: Tutor | null;
  onSaveTutor: (tutorData: Tutor) => void;
  onCancel: () => void;
  isDarkMode: boolean;
}

const PRESET_AVATARS = [
  "https://picsum.photos/seed/student_minjie/150/150",
  "https://picsum.photos/seed/scholar1/150/150",
  "https://picsum.photos/seed/scholar2/150/150",
  "https://picsum.photos/seed/scholar3/150/150",
  "https://picsum.photos/seed/scholar4/150/150",
];

export default function BecomeTutor({
  existingTutor,
  onSaveTutor,
  onCancel,
  isDarkMode
}: BecomeTutorProps) {
  // Form states initialized with existing tutor info (if any) or defaults
  const [name, setName] = useState(existingTutor?.name || "");
  const [course, setCourse] = useState(existingTutor?.course || "");
  const [year, setYear] = useState<number>(existingTutor?.year || 1);
  const [avatar, setAvatar] = useState(existingTutor?.avatar || PRESET_AVATARS[0]);
  const [bio, setBio] = useState(existingTutor?.bio || "");
  const [about, setAbout] = useState(existingTutor?.about || "");
  
  // Custom states for draft skills
  const [skills, setSkills] = useState<Tutor["skills"]>(
    existingTutor?.skills || [
      { name: "Programming", level: "Intermediate", category: "Programming" }
    ]
  );
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState(CATEGORIES[0]);
  const [newSkillLevel, setNewSkillLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");

  // Availability schedule Draft state
  const [availability, setAvailability] = useState<Tutor["availability"]>(
    existingTutor?.availability || [
      { day: "Monday", slots: ["14:00 - 15:30"] },
      { day: "Wednesday", slots: ["10:00 - 11:30"] }
    ]
  );

  const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const TIME_SLOTS = ["09:00 - 10:30", "11:00 - 12:30", "14:00 - 15:30", "16:05 - 17:35"];

  // Custom portfolio item state
  const [portfolio, setPortfolio] = useState<Tutor["portfolio"]>(
    existingTutor?.portfolio || [
      {
        title: "Academic Term Project",
        description: "Co-authored review on user experience best practices.",
        imageUrl: "https://picsum.photos/seed/academic/400/300"
      }
    ]
  );
  const [newPortTitle, setNewPortTitle] = useState("");
  const [newPortDesc, setNewPortDesc] = useState("");
  const [newPortImage, setNewPortImage] = useState("https://picsum.photos/seed/termproj/400/300");

  const [badges, setBadges] = useState<string[]>(existingTutor?.badges || ["QIU Peer Mentor"]);
  const [newBadge, setNewBadge] = useState("");

  const [isEditMode, setIsEditMode] = useState(!existingTutor);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const renderSuccessModal = () => {
    return (
      <AnimatePresence>
        {showSuccessModal && (
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
              
              <h3 className="text-xl font-display font-bold">Tutor Profile Registered!</h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                Congratulations! Your peer tutor listing for <strong>{name || "MinJie Chen"}</strong> has been successfully saved. Classmates can now discover your shared skills and book peer swap sessions from their directory!
              </p>

              <div className={`mt-5 p-3 rounded-xl border text-left flex gap-2.5 items-start ${
                isDarkMode ? "bg-slate-900/60 border-slate-700" : "bg-slate-50 border-slate-100"
              }`}>
                <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs block text-slate-700 dark:text-slate-200">What happens next?</span>
                  <span className="text-[10px] text-slate-400 leading-normal block mt-0.5">
                    Your profile is now live in the active-search directory! You will receive real-time updates as soon as other students book sessions with you. Keep an eye on your Messages box!
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  onCancel(); // Back to dashboard
                }}
                className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Add individual custom skill
  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const isDuplicate = skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase());
    if (isDuplicate) return;

    setSkills(prev => [
      ...prev,
      {
        name: newSkillName.trim(),
        level: newSkillLevel,
        category: newSkillCategory
      }
    ]);
    setNewSkillName("");
  };

  // Remove skill
  const handleRemoveSkill = (index: number) => {
    setSkills(prev => prev.filter((_, idx) => idx !== index));
  };

  // Handle availability check toggles
  const handleToggleSlot = (day: string, slot: string) => {
    setAvailability(prev => {
      const existingDay = prev.find(d => d.day === day);
      if (existingDay) {
        let updatedSlots;
        if (existingDay.slots.includes(slot)) {
          updatedSlots = existingDay.slots.filter(s => s !== slot);
        } else {
          updatedSlots = [...existingDay.slots, slot];
        }

        if (updatedSlots.length === 0) {
          return prev.filter(d => d.day !== day);
        } else {
          return prev.map(d => d.day === day ? { ...d, slots: updatedSlots } : d);
        }
      } else {
        return [...prev, { day, slots: [slot] }];
      }
    });
  };

  // Check if specific day and slot is active
  const isSlotSelected = (day: string, slot: string) => {
    const dayObj = availability.find(d => d.day === day);
    return dayObj ? dayObj.slots.includes(slot) : false;
  };

  // Add portfolio project
  const handleAddPortfolio = () => {
    if (!newPortTitle.trim() || !newPortDesc.trim()) return;
    setPortfolio(prev => [
      ...prev,
      {
        title: newPortTitle.trim(),
        description: newPortDesc.trim(),
        imageUrl: newPortImage || `https://picsum.photos/seed/${Date.now()}/400/300`
      }
    ]);
    setNewPortTitle("");
    setNewPortDesc("");
  };

  // Remove portfolio project
  const handleRemovePortfolio = (index: number) => {
    setPortfolio(prev => prev.filter((_, idx) => idx !== index));
  };

  // Add badge tags
  const handleAddBadge = () => {
    if (!newBadge.trim()) return;
    if (badges.includes(newBadge.trim())) return;
    setBadges(prev => [...prev, newBadge.trim()]);
    setNewBadge("");
  };

  // Remove badge tag
  const handleRemoveBadge = (val: string) => {
    setBadges(prev => prev.filter(b => b !== val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !course.trim() || !bio.trim() || !about.trim()) {
      alert("Please fill in all core fields!");
      return;
    }

    if (skills.length === 0) {
      alert("Please add at least one custom skill you can share with peers!");
      return;
    }

    if (availability.length === 0) {
      alert("Please configure at least one availability schedule slot!");
      return;
    }

    const tutorProfile: Tutor = {
      id: existingTutor?.id || `user_tutor_${Date.now()}`,
      name: name.trim(),
      avatar,
      course: course.trim(),
      year,
      skills,
      bio: bio.trim(),
      about: about.trim(),
      rating: existingTutor?.rating || 5.0,
      reviewCount: existingTutor?.reviewCount || 0,
      availability,
      portfolio,
      badges
    };

    onSaveTutor(tutorProfile);
    setIsEditMode(false);
    setShowSuccessModal(true);
  };

  // Render view profile vs Edit Form
  if (existingTutor && !isEditMode) {
    return (
      <div className={`py-10 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
        <div className="max-w-4xl mx-auto px-4">
          {renderSuccessModal()}
          {/* Header Back Link */}
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-500 mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          {/* Active Tutor Bio Panel */}
          <div className={`p-8 rounded-3xl border mb-8 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent ${
            isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-md"
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center gap-5">
                <img
                  src={existingTutor.avatar}
                  alt={existingTutor.name}
                  className="w-18 h-18 rounded-2xl object-cover ring-4 ring-indigo-500/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-display font-extrabold">{existingTutor.name}</h1>
                    <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full dark:bg-indigo-950 dark:text-indigo-400">
                      Active Peer Tutor 🎓
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{existingTutor.course} • Year {existingTutor.year}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {existingTutor.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-slate-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditMode(true)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
                >
                  Edit Profile Listing
                </button>
              </div>
            </div>

            {/* Quick Peer Bio & Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Punchy Bio</h3>
                <p className="text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                  "{existingTutor.bio}"
                </p>

                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-6 mb-1.5">Detailed Summary</h3>
                <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {existingTutor.about}
                </p>
              </div>

              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">My Offered Skills</h3>
                <div className="space-y-2">
                  {existingTutor.skills.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex justify-between items-center"
                    >
                      <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">{s.name}</span>
                      <span className="text-[9px] font-bold text-slate-405 bg-slate-100/50 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {s.level}
                      </span>
                    </div>
                  ))}
                </div>

                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-6 mb-2">Configured Calendar</h3>
                <div className="space-y-1.5 text-xs text-slate-500">
                  {existingTutor.availability.map((av, idx) => (
                    <div key={idx} className="flex gap-2">
                      <strong className="min-w-20 text-slate-600 dark:text-slate-400">{av.day}:</strong>
                      <span className="text-slate-400">{av.slots.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio listing */}
            {existingTutor.portfolio.length > 0 && (
              <div className="border-t border-slate-100 dark:border-slate-800/80 mt-8 pt-6">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">Sample Showcase Projects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {existingTutor.portfolio.map((port, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 flex gap-3 p-2.5"
                    >
                      <img
                        src={port.imageUrl}
                        alt={port.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-bold text-xs">{port.title}</h4>
                        <p className="text-[10px] text-slate-450 mt-1 leading-relaxed line-clamp-2">{port.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 text-center text-xs text-slate-500">
            💡 <strong>Peer Advice:</strong> Your custom tutor listing is active, live, and instantly discoverable by other scholars on the <strong>Explore Skills</strong> tab. You will receive notification pings listed on your navbar as soon as peers book slots on your calendar!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-10 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-4xl mx-auto px-4">
        {renderSuccessModal()}
        
        {/* Navigation Action */}
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-500 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>

        {/* Hero Title */}
        <div className="mb-8 flex items-start gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block">Quest Exchange Program</span>
            <h1 className="text-3xl font-display font-extrabold tracking-tight mt-1">Become a Peer Tutor</h1>
            <p className="text-xs text-slate-405 mt-1">Register your profile to host peer workshops, help classmates master tough modules, and raise your biography trust score.</p>
          </div>
        </div>

        {/* Dynamic Interactive Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Bio Info card */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-xs"}`}>
            <h2 className="text-sm font-display font-bold mb-4 border-b border-slate-100 dark:border-slate-700 pb-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-indigo-500" />
              <span>1. Bio & Custom Persona Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wider mb-1.5">Full Listing Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MinJie Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wider mb-1.5">Course / Major *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bachelor of Biotechnology (Hons)"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wider mb-1.5">Level / Year of Study *</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-slate-800"
                >
                  <option value={1}>Year 1 (Freshman)</option>
                  <option value={2}>Year 2 (Sophomore)</option>
                  <option value={3}>Year 3 (Junior)</option>
                  <option value={4}>Year 4 (Senior)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wider mb-1.5">Tutor Profile Avatar</label>
                <div className="flex gap-2.5 items-center">
                  <img
                    src={avatar}
                    alt="Current selection"
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex gap-1.5 flex-wrap">
                    {PRESET_AVATARS.map((avUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatar(avUrl)}
                        className={`w-7.5 h-7.5 rounded bg-slate-100 hover:scale-[1.05] transition-all overflow-hidden border ${
                          avatar === avUrl ? "border-indigo-500 ring-2 ring-indigo-500/10" : "border-transparent"
                        }`}
                      >
                        <img src={avUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wider mb-1.5">One-line Catchy Slogan/Bio *</label>
              <input
                type="text"
                required
                placeholder="e.g. Photoshop design explorer and general biology lab assistant."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={100}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-slate-800"
              />
            </div>

            <div className="mt-4">
              <label className="block text-[10px] font-bold text-slate-405 uppercase tracking-wider mb-1.5">Detailed Summary (About Me) *</label>
              <textarea
                required
                rows={4}
                placeholder="Hey classmates! Talk about your history, module performance, or specific tools you have mastered. Let peers know why studying with you is highly effective."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-slate-800 whitespace-pre-wrap"
              />
            </div>
          </div>

          {/* Section 2: Offered Skills management card */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-xs"}`}>
            <h2 className="text-sm font-display font-bold mb-4 border-b border-slate-100 dark:border-slate-700 pb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>2. Offered Academic/Practical Skills Directory</span>
            </h2>

            {/* Render added skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((sk, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 dark:border-indigo-950 dark:bg-indigo-950/20 text-xs"
                >
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{sk.name}</span>
                  <span className="text-[9px] text-slate-400">({sk.level})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="p-0.5 rounded-full hover:bg-red-100 hover:text-red-650 transition-colors cursor-pointer"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {skills.length === 0 && (
                <p className="text-xs text-slate-400 italic">No custom skills specified. Add at least one skill below to launch your card.</p>
              )}
            </div>

            {/* Custom skill add panel */}
            <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div className="sm:col-span-2">
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Add Skill Topic Name</label>
                <input
                  type="text"
                  placeholder="e.g. React Native, Gel Electrophoresis"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-150 focus:outline-none dark:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Skill Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-150 focus:outline-none dark:border-slate-800"
                >
                  {CATEGORIES.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <div className="flex-grow">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Your Level</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-150 focus:outline-none dark:border-slate-800"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="p-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                  title="Add Skill"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Availability Schedule Selection slots */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-xs"}`}>
            <h2 className="text-sm font-display font-bold mb-4 border-b border-slate-100 dark:border-slate-700 pb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>3. Offered Swap Weekly Calendar Schedule</span>
            </h2>
            <p className="text-[10px] text-slate-500 mb-4 font-medium">Select specific day and hour intervals where peers are allowed to secure booking requests with you:</p>

            <div className="space-y-4">
              {WEEK_DAYS.map((day) => (
                <div
                  key={day}
                  className="p-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <strong className="font-bold min-w-28 text-slate-650 dark:text-slate-350">{day}:</strong>

                  <div className="flex flex-wrap gap-1.5">
                    {TIME_SLOTS.map((slot) => {
                      const selected = isSlotSelected(day, slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleToggleSlot(day, slot)}
                          className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            selected
                              ? "bg-indigo-600 border-indigo-650 text-white shadow-xs"
                              : "bg-white dark:bg-slate-900 text-slate-500 border-slate-150 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Sample projects portfolio list */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-xs"}`}>
            <h2 className="text-sm font-display font-bold mb-4 border-b border-slate-100 dark:border-slate-700 pb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              <span>4. Practical Showcase Projects (Optional)</span>
            </h2>

            {/* Showcase projects rendered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {portfolio.map((port, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 flex gap-3 p-3 text-xs justify-between"
                >
                  <div className="flex gap-2.5">
                    <img
                      src={port.imageUrl}
                      alt={port.title}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold leading-tight">{port.title}</h4>
                      <p className="text-[10px] text-slate-450 mt-1 line-clamp-2 leading-relaxed">{port.description}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePortfolio(idx)}
                    className="p-1 text-slate-400 hover:text-red-500 capitalize transition-colors self-start cursor-pointer"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Custom project add elements */}
            <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. Lab Bio-Reactor Chart"
                  value={newPortTitle}
                  onChange={(e) => setNewPortTitle(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-150 focus:outline-none dark:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Brief Description</label>
                <input
                  type="text"
                  placeholder="e.g. Generated an Excel analytics dataset for 4 biotechnology labs."
                  value={newPortDesc}
                  onChange={(e) => setNewPortDesc(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-150 focus:outline-none dark:border-slate-800"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-grow">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Showcase Image Type/Seed</label>
                  <input
                    type="text"
                    placeholder="e.g. biotech, engineering"
                    value={newPortImage}
                    onChange={(e) => setNewPortImage(`https://picsum.photos/seed/${e.target.value || "termproj"}/450/350`)}
                    className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-150 focus:outline-none dark:border-slate-800"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddPortfolio}
                  className="p-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                  title="Add Project"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Section 5: Badges configuration */}
          <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-xs"}`}>
            <h2 className="text-sm font-display font-bold mb-4 border-b border-slate-100 dark:border-slate-700 pb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-500" />
              <span>5. Custom Peer Badge Credentials</span>
            </h2>

            <div className="flex flex-wrap gap-2 mb-3">
              {badges.map((b, idx) => (
                <div key={idx} className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold border rounded bg-slate-50/50 text-slate-500 dark:bg-slate-900/50 dark:border-slate-800">
                  <span>{b}</span>
                  <button type="button" onClick={() => handleRemoveBadge(b)} className="hover:text-red-500 cursor-pointer">
                    <Trash className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Sigma Scholar, Matlab Master"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                className="text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-150 focus:outline-none dark:border-slate-800 flex-grow"
              />
              <button
                type="button"
                onClick={handleAddBadge}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-slate-200 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Prompt Action Buttons */}
          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={onCancel}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                isDarkMode ? "border-slate-800" : "border-slate-200 bg-white shadow-xs"
              }`}
            >
              Cancel Register
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Register Custom Tutor Listing</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
