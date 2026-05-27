import { useState } from "react";
import { 
  BookOpen, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Compass, 
  MessageSquare, 
  Users, 
  LayoutDashboard, 
  Compass as Globe,
  HelpCircle,
  Sun,
  Moon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  notifications: string[];
  onClearNotifications: () => void;
  bookmarkedCount: number;
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenLogin: () => void;
  onStartTour: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({
  currentView,
  onNavigate,
  notifications,
  onClearNotifications,
  bookmarkedCount,
  isLoggedIn,
  onLogout,
  onOpenLogin,
  onStartTour,
  isDarkMode,
  onToggleDarkMode
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: BookOpen },
    { id: "explore", label: "Explore Skills", icon: Compass },
    { id: "community", label: "Community", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      isDarkMode 
        ? "bg-slate-900/90 border-slate-800 text-slate-100" 
        : "bg-white/90 border-slate-200 text-slate-900"
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => handleLinkClick("home")}>
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-606 to-indigo-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              <span>Q</span>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QIU SkillLink
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-205/30 dark:border-blue-900/30 font-bold shadow-xs"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.id === "messages" && (
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Direct Onboarding Guide button */}
            <button
              onClick={onStartTour}
              title="Interactive Tour Guide"
              className="p-2 space-x-1 flex items-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs font-semibold">Tour</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Pane */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 relative rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-indigo-600 h-2.5 w-2.5 rounded-full animate-ping"></span>
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg border p-4 z-50 ${
                      isDarkMode ? "bg-slate-800 border-slate-700 text-slate-100" : "bg-white border-slate-100 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700 mb-2">
                      <span className="font-semibold text-sm">Session Notifications</span>
                      {notifications.length > 0 && (
                        <button onClick={onClearNotifications} className="text-xs text-indigo-500 hover:underline">
                          Clear all
                        </button>
                      )}
                    </div>
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">Your schedule is currently up to date!</p>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {notifications.map((notif, index) => (
                          <div key={index} className="text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border-l-2 border-indigo-500">
                            {notif}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Authentication Avatar */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div onClick={() => handleLinkClick("dashboard")} className="cursor-pointer group flex items-center space-x-2">
                  <img
                    src="https://picsum.photos/seed/student/100/100"
                    alt="User Profile"
                    className="w-8 h-8 rounded-full ring-2 ring-indigo-500 border border-white"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-sm font-medium hover:text-indigo-500 transition-colors hidden lg:inline">MinJie</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center space-x-2 px-4.5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${
              isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            } overflow-hidden`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 pb-2 border-t border-slate-200 dark:border-slate-800 mx-3">
                <button
                  onClick={onStartTour}
                  className="flex items-center space-x-3 w-full py-2 text-slate-600 dark:text-slate-300"
                >
                  <HelpCircle className="w-5 h-5 text-indigo-500" />
                  <span className="font-semibold">Interactive Academy Tour</span>
                </button>
              </div>

              {isLoggedIn ? (
                <div className="pt-4 pb-2 border-t border-slate-200 dark:border-slate-800 px-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://picsum.photos/seed/student/100/100"
                      alt="User Profile"
                      className="w-10 h-10 rounded-full border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="block font-medium text-slate-800 dark:text-slate-100">MinJie</span>
                      <span className="block text-xs text-slate-400">Bachelor of Computer Science</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="pt-4 px-3 pb-2 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => {
                      onOpenLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-base font-medium shadow-md shadow-indigo-500/15"
                  >
                    Sign In to Portal
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
