import { useState, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  Star, 
  Layers, 
  SlidersHorizontal,
  Bookmark,
  BookOpen,
  ArrowRight,
  FilterX
} from "lucide-react";
import { Tutor } from "../types";
import { CATEGORIES } from "../data";

interface ExploreSkillsProps {
  tutors: Tutor[];
  onNavigateToProfile: (tutorId: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (tutorId: string) => void;
  isDarkMode: boolean;
  preselectedCategory?: string;
  preselectedSearchText?: string;
}

export default function ExploreSkills({
  tutors,
  onNavigateToProfile,
  bookmarkedIds,
  onToggleBookmark,
  isDarkMode,
  preselectedCategory,
  preselectedSearchText
}: ExploreSkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(preselectedCategory || "");
  const [searchQuery, setSearchQuery] = useState<string>(preselectedSearchText || "");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // Category Filter: matches if at least one tutor skill category matches
      const matchesCategory = selectedCategory 
        ? tutor.skills.some(s => s.category === selectedCategory)
        : true;

      // Level Filter: matches matches selected level
      const matchesLevel = selectedLevel
        ? tutor.skills.some(s => s.level === selectedLevel)
        : true;

      // Text Search Filter: matches name, bio, course, skills, or biography details
      const query = searchQuery.toLowerCase();
      const matchesSearch = query
        ? (
            tutor.name.toLowerCase().includes(query) ||
            tutor.course.toLowerCase().includes(query) ||
            tutor.bio.toLowerCase().includes(query) ||
            tutor.skills.some(s => s.name.toLowerCase().includes(query))
          )
        : true;

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [tutors, selectedCategory, selectedLevel, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setSelectedLevel("");
  };

  return (
    <div className={`py-10 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page title and description */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-extrabold tracking-tight">
            Explore Peer Specialties
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Discover peer mentors studying at QIU. Refine your search by department categories or target expertise scopes to unlock direct scheduling.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className={`p-4 rounded-2xl border mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between ${
          isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"
        }`}>
          {/* Text Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tutor name, department or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-wrap gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
            {/* Dept Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-3 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-indigo-500 text-slate-600 dark:text-slate-300 font-medium cursor-pointer"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Level Select */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3.5 py-3 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-indigo-500 text-slate-600 dark:text-slate-300 font-medium cursor-pointer"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Clear Button */}
            {(selectedCategory || selectedLevel || searchQuery) && (
              <button
                onClick={resetFilters}
                className="px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-red-50 text-red-650 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 transition-colors flex items-center space-x-1"
                title="Reset All Filters"
              >
                <FilterX className="w-4 h-4" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Category Quick Links Row */}
        <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none mb-8">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 text-xs font-semibold rounded-full shrink-0 transition-all cursor-pointer ${
              selectedCategory === ""
                ? "bg-blue-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All Specialties
          </button>
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result grid */}
        {filteredTutors.length === 0 ? (
          <div className={`p-16 text-center rounded-3xl border border-dashed ${
            isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
          }`}>
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
              <FilterX className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">No peers found</h3>
            <p className="text-slate-400 text-sm mt-1 mb-6 max-w-sm mx-auto">
              We couldn't match any students with your current filters. Make a custom requested skill post in our Community board!
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
            >
              View Entire Directory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((t) => {
              const isBookmarked = bookmarkedIds.includes(t.id);
              return (
                <div
                  key={t.id}
                  className={`rounded-2xl border p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                    isDarkMode 
                      ? "bg-slate-800 border-slate-700 hover:shadow-2xl hover:shadow-slate-950/20" 
                      : "bg-white border-slate-200 shadow-md hover:shadow-xl"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-505 border-2 border-white"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h3 className="font-semibold text-sm line-clamp-1">{t.name}</h3>
                          <p className="text-[10px] text-slate-400 leading-normal line-clamp-1">{t.course}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleBookmark(t.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isBookmarked
                            ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                            : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400 hover:text-slate-600"
                        }`}
                        title={isBookmarked ? "Delete from bookmarks" : "Save Peer"}
                      >
                        <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Bio text */}
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed mb-4">
                      {t.bio}
                    </p>

                    {/* Skills badges */}
                    <div className="space-y-1.5 mb-6">
                      <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">SKILLS TAUGHT:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.skills.map((skill, index) => (
                          <span
                            key={index}
                            className={`text-[10px] items-center inline-flex font-medium px-2 py-0.5 rounded-full ${
                              isDarkMode ? "bg-slate-700 text-slate-100" : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {skill.name} • <span className="text-indigo-600 dark:text-indigo-400 font-bold ml-1">{skill.level}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Rating and Availability slots info */}
                    <div className="flex items-center justify-between text-xs py-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl px-3 mb-4">
                      <div className="flex items-center space-x-1.5 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold">{t.rating}</span>
                        <span className="text-slate-400 text-[10px]">({t.reviewCount} calls)</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span>Slots: {t.availability.map(av => av.day.slice(0, 3)).join(", ")}</span>
                      </div>
                    </div>

                    {/* CTA row */}
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => onNavigateToProfile(t.id)}
                        className="flex-1 py-2 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-705 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all hover:border-slate-300"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => onNavigateToProfile(t.id)}
                        className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all text-center"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
