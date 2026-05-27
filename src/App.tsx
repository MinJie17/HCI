import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ExploreSkills from "./components/ExploreSkills";
import StudentProfile from "./components/StudentProfile";
import BookingForm from "./components/BookingForm";
import CommunityBoard from "./components/CommunityBoard";
import MessagingUI from "./components/MessagingUI";
import FeedbackPage from "./components/FeedbackPage";
import Dashboard from "./components/Dashboard";
import AuthOnboarding from "./components/AuthOnboarding";
import BecomeTutor from "./components/BecomeTutor";
import { Tutor, Review, Session, CommunityPost, ChatThread, Message } from "./types";
import { INITIAL_TUTORS, INITIAL_REVIEWS, INITIAL_POSTS, INITIAL_THREADS } from "./data";

export default function App() {
  // App views: "home" | "explore" | "profile" | "booking" | "community" | "messages" | "feedback" | "dashboard"
  const [currentView, setCurrentView] = useState<string>("home");

  // Core synchronized application databases
  const [tutors, setTutors] = useState<Tutor[]>(INITIAL_TUTORS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["tutor_1", "tutor_4"]);
  
  // Showcase custom user sessions list (Upcoming vs Completed vs Pending Feedback)
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "ses_1",
      tutorId: "tutor_1",
      tutorName: "Ahmad Faiz",
      tutorAvatar: "https://picsum.photos/seed/faiz/150/150",
      skillName: "Programming",
      date: "Monday (Jun 1)",
      timeSlot: "14:00 - 15:30",
      type: "Online",
      status: "Upcoming",
      notes: "Please let me know if we need to pre-install react."
    },
    {
      id: "ses_2",
      tutorId: "tutor_4",
      tutorName: "Emily Watson",
      tutorAvatar: "https://picsum.photos/seed/emily/150/150",
      skillName: "Canva Design",
      date: "Friday (May 22)",
      timeSlot: "14:00 - 15:30",
      type: "Physical",
      status: "Completed",
      notes: "Want to audit my biotech marketing poster."
    },
    {
      id: "ses_3",
      tutorId: "tutor_2",
      tutorName: "Sarah Lim",
      tutorAvatar: "https://picsum.photos/seed/sarah/150/150",
      skillName: "Microsoft Excel",
      date: "Tuesday (May 19)",
      timeSlot: "11:00 - 12:30",
      type: "Online",
      status: "Pending Feedback",
      notes: "Need Pivot table tips."
    }
  ]);

  // View specific target selectors
  const [activeTutorId, setActiveTutorId] = useState<string>("tutor_1");
  const [activeThreadId, setActiveThreadId] = useState<string | null>("tutor_1");
  const [preselectedDay, setPreselectedDay] = useState<string | undefined>(undefined);
  const [preselectedSlot, setPreselectedSlot] = useState<string | undefined>(undefined);

  // Search parameters for preselected navigation
  const [preselectedCategory, setPreselectedCategory] = useState<string | undefined>(undefined);
  const [preselectedSearchText, setPreselectedSearchText] = useState<string | undefined>(undefined);

  // Notification and Modals states
  const [notifications, setNotifications] = useState<string[]>([
    "Sarah Lim accepted your Excel training invite for tomorrow!",
    "Faiz published a new UI/UX checklist on the discussion board."
  ]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Logged in as student MinJie by default
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userTutorProfile, setUserTutorProfile] = useState<Tutor | null>(null);

  // Navigate handler that wraps cleanup of preselection parameters
  const handleNavigate = (view: string) => {
    if (view !== "explore") {
      setPreselectedCategory(undefined);
      setPreselectedSearchText(undefined);
    }
    setCurrentView(view);
  };

  const handleSaveTutorProfile = (updatedProfile: Tutor) => {
    setUserTutorProfile(updatedProfile);
    setTutors(prev => {
      const exists = prev.some(t => t.id === updatedProfile.id);
      if (exists) {
        return prev.map(t => t.id === updatedProfile.id ? updatedProfile : t);
      } else {
        return [updatedProfile, ...prev];
      }
    });
    setNotifications(prev => ["Congratulations! Your dynamic peer tutor listing is now live! 🎓", ...prev]);
  };

  const currentActiveTutorObj = tutors.find(t => t.id === activeTutorId) || tutors[0];

  // Bookmark Toggle action
  const handleToggleBookmark = (tutorId: string) => {
    setBookmarkedIds((prev) => 
      prev.includes(tutorId) ? prev.filter(id => id !== tutorId) : [...prev, tutorId]
    );
  };

  // Chat initiation with a tutor
  const handleStartChat = (tutorId: string) => {
    const targetTutor = tutors.find(t => t.id === tutorId);
    if (!targetTutor) return;

    // Check if thread already exists
    const threadExists = threads.find(t => t.tutorId === tutorId);
    if (!threadExists) {
      const newThread: ChatThread = {
        tutorId: tutorId,
        tutorName: targetTutor.name,
        tutorAvatar: targetTutor.avatar,
        lastMessage: "Conversation opened. Type below to query!",
        timestamp: "Now",
        unreadCount: 0,
        isOnline: true,
        messages: []
      };
      setThreads(prev => [newThread, ...prev]);
    }
    setActiveThreadId(tutorId);
    handleNavigate("messages");
  };

  // Navigating with Search Category or Text preload fields
  const handleNavigateToExplore = (category?: string, searchText?: string) => {
    setPreselectedCategory(category);
    setPreselectedSearchText(searchText);
    setCurrentView("explore");
  };

  // Booking scheduling success handler and session additions
  const handleConfirmReservation = (booking: {
    tutorId: string;
    tutorName: string;
    tutorAvatar: string;
    skillName: string;
    date: string;
    timeSlot: string;
    type: "Online" | "Physical";
    notes: string;
  }) => {
    const newSession: Session = {
      id: `ses_user_${Date.now()}`,
      tutorId: booking.tutorId,
      tutorName: booking.tutorName,
      tutorAvatar: booking.tutorAvatar,
      skillName: booking.skillName,
      date: booking.date,
      timeSlot: booking.timeSlot,
      type: booking.type,
      notes: booking.notes,
      status: "Upcoming"
    };

    setSessions(prev => [newSession, ...prev]);
    setNotifications(prev => [
      `Your booked class for ${booking.skillName} with ${booking.tutorName} has been recorded!`,
      ...prev
    ]);

    // Send a message snippet automatically
    const targetThread = threads.find(t => t.tutorId === booking.tutorId);
    const textMsg = `Hi ${booking.tutorName.split(" ")[0]}! I just scheduled a peer-swap for ${booking.skillName} on ${booking.date} at ${booking.timeSlot}. Let's coordinate here.`;
    
    if (!targetThread) {
      const newThread: ChatThread = {
        tutorId: booking.tutorId,
        tutorName: booking.tutorName,
        tutorAvatar: booking.tutorAvatar,
        lastMessage: textMsg,
        timestamp: "Now",
        unreadCount: 0,
        isOnline: true,
        messages: [
          {
            id: `msg_auto_${Date.now()}`,
            senderId: "student_user",
            senderName: "Me",
            senderAvatar: "https://picsum.photos/seed/student/100/100",
            text: textMsg,
            timestamp: "Now"
          }
        ]
      };
      setThreads(prev => [newThread, ...prev]);
    } else {
      setThreads(prev => prev.map(t => {
        if (t.tutorId === booking.tutorId) {
          return {
            ...t,
            lastMessage: textMsg,
            timestamp: "Now",
            messages: [
              ...t.messages,
              {
                id: `msg_auto_${Date.now()}`,
                senderId: "student_user",
                senderName: "Me",
                senderAvatar: "https://picsum.photos/seed/student/100/100",
                text: textMsg,
                timestamp: "Now"
              }
            ]
          };
        }
        return t;
      }));
    }

    handleNavigate("dashboard");
  };

  // Navigating to profile view
  const handleViewTutorProfile = (tutorId: string) => {
    setActiveTutorId(tutorId);
    handleNavigate("profile");
  };

  // Navigating to booking view with preselection parameters
  const handleInitiateBooking = (tutorId: string, day?: string, slot?: string) => {
    setActiveTutorId(tutorId);
    setPreselectedDay(day);
    setPreselectedSlot(slot);
    handleNavigate("booking");
  };

  // Cancel Session list
  const handleCancelSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  // Directing review creation triggers
  const handleTriggerFeedback = (sessionId: string) => {
    handleNavigate("feedback");
  };

  // Submit dynamic review rating
  const handleSubmitReview = (review: {
    tutorId: string;
    rating: number;
    comment: string;
    skillName: string;
  }) => {
    const newRevItem: Review = {
      id: `new_rev_${Date.now()}`,
      tutorId: review.tutorId,
      studentName: "MinJie",
      studentAvatar: "https://picsum.photos/seed/student/100/100",
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split("T")[0],
      skillName: review.skillName
    };

    setReviews(prev => [newRevItem, ...prev]);

    // Update session status so it disappears from rating list
    setSessions(prev => prev.map(s => {
      if (s.tutorId === review.tutorId && s.skillName === review.skillName && s.status === "Pending Feedback") {
        return { ...s, status: "Completed" };
      }
      return s;
    }));

    // Recalculate average rating of peer
    setTutors(prev => prev.map(t => {
      if (t.id === review.tutorId) {
        const matchingRevs = [...reviews.filter(r => r.tutorId === t.id), newRevItem];
        const average = matchingRevs.reduce((acc, curr) => acc + curr.rating, 0) / matchingRevs.length;
        return {
          ...t,
          rating: parseFloat(average.toFixed(1)),
          reviewCount: matchingRevs.length
        };
      }
      return t;
    }));
  };

  // Composing a community board post
  const handleAddPost = (newPost: {
    title: string;
    content: string;
    category: string;
  }) => {
    const freshPost: CommunityPost = {
      id: `post_new_${Date.now()}`,
      authorName: "MinJie",
      authorAvatar: "https://picsum.photos/seed/student/100/100",
      authorCourse: "Bachelor of Computer Science",
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    setPosts(prev => [freshPost, ...prev]);
  };

  // Liking a forum post
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = !p.hasLiked;
        return {
          ...p,
          hasLiked: liked,
          likes: liked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  // Replying/Commenting on a forum post
  const handleAddComment = (postId: string, text: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: `com_new_${Date.now()}`,
              authorName: "MinJie",
              authorAvatar: "https://picsum.photos/seed/student/100/100",
              content: text,
              createdAt: "Just now"
            }
          ]
        };
      }
      return p;
    }));
  };

  // Sending a chat message in chat window
  const handleSendMessage = (tutorId: string, textMsg: string, fileInfo?: { name: string; url: string }) => {
    const newMessage: Message = {
      id: `msg_user_${Date.now()}`,
      senderId: "student_user",
      senderName: "Me",
      senderAvatar: "https://picsum.photos/seed/student/100/100",
      text: textMsg || "Sent an attachment.",
      timestamp: "Now",
      fileUrl: fileInfo?.url,
      fileName: fileInfo?.name
    };

    setThreads(prev => prev.map(t => {
      if (t.tutorId === tutorId) {
        return {
          ...t,
          lastMessage: textMsg || `Shared file: ${fileInfo?.name}`,
          timestamp: "Now",
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));
  };

  // React to a massage
  const handleReactToMessage = (tutorId: string, messageId: string, emoji: string) => {
    setThreads(prev => prev.map(t => {
      if (t.tutorId === tutorId) {
        return {
          ...t,
          messages: t.messages.map(m => {
            if (m.id === messageId) {
              const currentReactions = m.reactions || [];
              const existingReaction = currentReactions.find(r => r.emoji === emoji);

              let updatedReactions;
              if (existingReaction) {
                if (existingReaction.users.includes("student_user")) {
                  const updatedUsers = existingReaction.users.filter(u => u !== "student_user");
                  if (updatedUsers.length === 0) {
                    updatedReactions = currentReactions.filter(r => r.emoji !== emoji);
                  } else {
                    updatedReactions = currentReactions.map(r =>
                      r.emoji === emoji
                        ? { ...r, count: r.count - 1, users: updatedUsers }
                        : r
                    );
                  }
                } else {
                  updatedReactions = currentReactions.map(r =>
                    r.emoji === emoji
                      ? { ...r, count: r.count + 1, users: [...r.users, "student_user"] }
                      : r
                  );
                }
              } else {
                updatedReactions = [
                  ...currentReactions,
                  { emoji, count: 1, users: ["student_user"] }
                ];
              }

              return {
                ...m,
                reactions: updatedReactions
              };
            }
            return m;
          })
        };
      }
      return t;
    }));
  };

  // Filter out actual tutor profiles from bookmarked ids List
  const savedTutorsList = tutors.filter(t => bookmarkedIds.includes(t.id));

  // Toggle dark/light theme on base document element
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      
      {/* Dynamic Header Sticky Banner */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        notifications={notifications}
        onClearNotifications={() => setNotifications([])}
        bookmarkedCount={bookmarkedIds.length}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          setIsLoggedIn(false);
          setNotifications(prev => ["Logged out successfully.", ...prev]);
        }}
        onOpenLogin={() => setIsLoginOpen(true)}
        onStartTour={() => setIsTourActive(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Primary Dispatching Views */}
      <main className="flex-grow">
        {currentView === "home" && (
          <Homepage
            tutors={tutors}
            onNavigateToExplore={handleNavigateToExplore}
            onNavigateToProfile={handleViewTutorProfile}
            onOpenBeTutor={() => {
              if (!isLoggedIn) {
                setIsLoginOpen(true);
                setNotifications(prev => ["Please sign in to register as a custom peer tutor!", ...prev]);
              } else {
                handleNavigate("become-tutor");
                setNotifications(prev => ["Create or update your peer tutor listing here! 🎓", ...prev]);
              }
            }}
            isDarkMode={isDarkMode}
          />
        )}

        {currentView === "explore" && (
          <ExploreSkills
            tutors={tutors}
            onNavigateToProfile={handleViewTutorProfile}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            isDarkMode={isDarkMode}
            preselectedCategory={preselectedCategory}
            preselectedSearchText={preselectedSearchText}
          />
        )}

        {currentView === "profile" && (
          <StudentProfile
            tutor={currentActiveTutorObj}
            reviews={reviews}
            onNavigateBack={() => handleNavigate("explore")}
            onNavigateToBooking={handleInitiateBooking}
            onStartChat={handleStartChat}
            isBookmarked={bookmarkedIds.includes(activeTutorId)}
            onToggleBookmark={handleToggleBookmark}
            isDarkMode={isDarkMode}
          />
        )}

        {currentView === "booking" && (
          <BookingForm
            tutor={currentActiveTutorObj}
            onConfirmBooking={handleConfirmReservation}
            onCancel={() => handleNavigate("profile")}
            isDarkMode={isDarkMode}
            preselectedDay={preselectedDay}
            preselectedSlot={preselectedSlot}
          />
        )}

        {currentView === "community" && (
          <CommunityBoard
            posts={posts}
            onAddPost={handleAddPost}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            isDarkMode={isDarkMode}
          />
        )}

        {currentView === "messages" && (
          <MessagingUI
            threads={threads}
            activeThreadId={activeThreadId}
            onSendMessage={handleSendMessage}
            onReactToMessage={handleReactToMessage}
            onSelectThread={(tutorId) => setActiveThreadId(tutorId)}
            isDarkMode={isDarkMode}
          />
        )}

        {currentView === "feedback" && (
          <FeedbackPage
            sessions={sessions}
            onSubmitReview={handleSubmitReview}
            onCancel={() => handleNavigate("dashboard")}
            isDarkMode={isDarkMode}
          />
        )}

        {currentView === "dashboard" && (
          <Dashboard
            sessions={sessions}
            savedTutors={savedTutorsList}
            onNavigateToProfile={handleViewTutorProfile}
            onCancelSession={handleCancelSession}
            onTriggerFeedback={handleTriggerFeedback}
            isDarkMode={isDarkMode}
            onNavigateToBecomeTutor={() => handleNavigate("become-tutor")}
            hasTutorProfile={!!userTutorProfile}
          />
        )}

        {currentView === "become-tutor" && (
          <BecomeTutor
            existingTutor={userTutorProfile}
            onSaveTutor={handleSaveTutorProfile}
            onCancel={() => handleNavigate("dashboard")}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* Auth and Onboarding spotlight walkthrough modals */}
      <AuthOnboarding
        isLoginOpen={isLoginOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setNotifications(prev => ["Welcome back, study buddy!", ...prev]);
        }}
        isTourActive={isTourActive}
        onCloseTour={() => setIsTourActive(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
