import React, { useState } from "react";
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  Users, 
  Award, 
  Calendar,
  Star,
  Quote,
  Flame,
  Globe,
  Monitor,
  Heart
} from "lucide-react";
import { Tutor } from "../types";
import { CATEGORIES } from "../data";
import { motion } from "motion/react";

interface HomepageProps {
  tutors: Tutor[];
  onNavigateToExplore: (searchCategory?: string, searchText?: string) => void;
  onNavigateToProfile: (tutorId: string) => void;
  onOpenBeTutor: () => void;
  isDarkMode: boolean;
}

export default function Homepage({
  tutors,
  onNavigateToExplore,
  onNavigateToProfile,
  onOpenBeTutor,
  isDarkMode
}: HomepageProps) {
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToExplore(undefined, searchVal);
  };

  // Pre-mapped category icons
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Programming": return "💻";
      case "Graphic Design": return "🎨";
      case "Video Editing": return "🎬";
      case "Public Speaking": return "🎙️";
      case "Photography": return "📸";
      case "Language Learning": return "🗣️";
      case "Microsoft Excel": return "📈";
      case "Canva Design": return "📐";
      case "PowerPoint Presentation": return "📊";
      case "UI/UX Design": return "✨";
      default: return "📚";
    }
  };

  // Limit featured tutors to top rated/active ones
  const featuredTutors = tutors.slice(0, 3);

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-lg from-blue-600/10 via-indigo-600/10 to-transparent">
        {/* Abstract background blobs for premium feel */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-400/25 rounded-full filter blur-3xl animate-bounce"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Cooperative Peer Learning Platform for QIU</span>
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Learn Skills From <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Peers
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed"
          >
            Quest International University's student resource. Unlock your peers' expertise or teach your own skills in programming, design, photography, or Excel. Trade digital sessions, grow credentials, and excel together!
          </motion.p>

          {/* Search bar */}
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex-1 flex items-center px-3 gap-2">
                <Search className="w-5 h-5 text-blue-600 shrink-0" />
                <input
                  type="text"
                  placeholder="What would you like to learn? (e.g., Python, Figma, Excel...)"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm py-2.5"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
              >
                <span>Search Peers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>

          {/* Core CTAs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => onNavigateToExplore()}
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm tracking-wide transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Explore Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenBeTutor}
              className={`px-7 py-3.5 font-semibold rounded-xl text-sm border transition-all cursor-pointer ${
                isDarkMode 
                  ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white" 
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs"
              }`}
            >
              Become a Peer Tutor
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className={`py-12 border-y ${isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="flex justify-center text-indigo-600 mb-2">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display">420+</div>
              <div className="text-sm text-slate-500 mt-1">Active Students Connected</div>
            </div>
            <div className="p-4 border-y sm:border-y-0 sm:border-x border-slate-200 dark:border-slate-800">
              <div className="flex justify-center text-indigo-600 mb-2">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display">10</div>
              <div className="text-sm text-slate-500 mt-1">Specialized Skill Directories</div>
            </div>
            <div className="p-4">
              <div className="flex justify-center text-indigo-600 mb-2">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display">1,248</div>
              <div className="text-sm text-slate-500 mt-1">Learning Sessions Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              Skill Categories
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Browse structured specialties to accelerate your college projects.
            </p>
          </div>
          <button
            onClick={() => onNavigateToExplore()}
            className="text-xs sm:text-sm text-indigo-600 font-semibold hover:underline flex items-center gap-1 mt-4 md:mt-0"
          >
            <span>See Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => (
            <div
              key={i}
              onClick={() => onNavigateToExplore(cat)}
              className={`p-6 rounded-2xl border text-center cursor-pointer hover:-translate-y-1 hover:scale-[1.02] shadow-sm transition-all duration-300 ${
                isDarkMode 
                  ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800" 
                  : "bg-white border-slate-100 hover:bg-indigo-50/30"
              }`}
            >
              <span className="text-4xl block mb-4">{getCategoryIcon(cat)}</span>
              <span className="font-semibold text-sm block line-clamp-1">{cat}</span>
              <span className="text-xs text-slate-400 mt-1 block">Learn peer-style</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Peer Tutors */}
      <section className={`py-16 ${isDarkMode ? "bg-slate-900/40" : "bg-indigo-50/20"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                Featured Peer Tutors
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Engage with these highly active and supportive campus-creators.
              </p>
            </div>
            <button
              onClick={() => onNavigateToExplore()}
              className="text-xs sm:text-sm text-indigo-600 font-semibold hover:underline flex items-center gap-1 mt-4 md:mt-0"
            >
              <span>View All Tutors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className={`rounded-2xl border overflow-hidden p-6 transition-all duration-300 group hover:shadow-xl ${
                  isDarkMode 
                    ? "bg-slate-800 border-slate-700" 
                    : "bg-white border-slate-100 shadow-md"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/10 group-hover:border-indigo-500 transition-colors"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base line-clamp-1">{tutor.name}</h3>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{tutor.course}</p>
                    <div className="flex items-center space-x-1 mt-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold">{tutor.rating}</span>
                      <span className="text-slate-400 text-[10px]">({tutor.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-3 mb-6">
                  {tutor.bio}
                </p>

                {/* Skill Level Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tutor.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] items-center inline-flex font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700"
                    >
                      {s.name} • <span className="text-indigo-600 dark:text-indigo-400 font-bold ml-1">{s.level}</span>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onNavigateToProfile(tutor.id)}
                    className="flex-1 py-2.5 text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-600/20 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    View Biography
                  </button>
                  <button
                    onClick={() => onNavigateToProfile(tutor.id)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-extrabold text-center mb-12">
          What QIU Students Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-8 rounded-2xl border relative ${isDarkMode ? "bg-slate-800/30 border-slate-700" : "bg-white border-slate-100 shadow-sm"}`}>
            <Quote className="absolute top-6 right-6 text-indigo-500/10 w-12 h-12" />
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://picsum.photos/seed/chloe/100/100"
                alt="Chloe"
                className="w-10 h-10 rounded-full"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-semibold text-sm">Chloe Ooi</h4>
                <span className="text-[10px] text-slate-400">Marketing Year 3</span>
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed italic">
              "Figma designs used to look so confusing, but after Emily Watson spend an hour explaining layout constraints and responsive grid alignments, I finally built my portfolio prototype safely! The Peer learning format is extremely engaging."
            </p>
          </div>

          <div className={`p-8 rounded-2xl border relative ${isDarkMode ? "bg-slate-800/30 border-slate-700" : "bg-white border-slate-100 shadow-sm"}`}>
            <Quote className="absolute top-6 right-6 text-indigo-500/10 w-12 h-12" />
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://picsum.photos/seed/meor/100/100"
                alt="Meor"
                className="w-10 h-10 rounded-full"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-semibold text-sm">Meor Hafiz</h4>
                <span className="text-[10px] text-slate-400">Computer Science Year 1</span>
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed italic">
              "Ahmad Faiz helped me debug my JavaScript assignments of the web design course. Instead of just giving the answer, he explained loops. This is 100 times better than generic tutorials!"
            </p>
          </div>
        </div>
      </section>

      {/* University Branding & HCI Footer */}
      <footer className={`border-t py-12 ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-500"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div className="sm:col-span-2">
            <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
              QIU SkillLink
            </span>
            <p className="text-xs mt-2 max-w-sm leading-relaxed">
              Quest International University design-approved academic exchange program built by students for students. Powered by Gemini AI recommendations and built with robust Human-Computer Interaction principles.
            </p>
            <div className="flex gap-4 mt-4">
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300">HCI Visbility</span>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300">Consistent UI</span>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300">User Control</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-3">Core Views</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigateToExplore()} className="hover:underline text-left">Explore Skills Directory</button></li>
              <li><button onClick={() => onNavigateToExplore(undefined, "Excel")} className="hover:underline text-left">Excel Bootcamps</button></li>
              <li><button onClick={() => onNavigateToExplore(undefined, "Programming")} className="hover:underline text-left">React Developers Guild</button></li>
              <li><button onClick={onOpenBeTutor} className="hover:underline text-left">Apply as Peer Mentor</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-3">Campus Contact</h4>
            <p className="text-xs leading-relaxed">
              Building B, Quest Commons Area<br />
              Email: peerlearning@qiu.edu.my<br />
              Tel: +60 5-249 0500
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[10px] mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
          &copy; {new Date().getFullYear()} QIU SkillLink. Quest International University. All rights reserved. Made under strict HCI standards.
        </div>
      </footer>
    </div>
  );
}
