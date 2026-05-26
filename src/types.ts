export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  course: string;
  year: number;
  skills: {
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    category: string;
  }[];
  bio: string;
  about: string;
  rating: number;
  reviewCount: number;
  availability: {
    day: string;
    slots: string[];
  }[];
  portfolio: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  badges: string[];
}

export interface Review {
  id: string;
  tutorId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
  skillName: string;
}

export interface Session {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  skillName: string;
  date: string;
  timeSlot: string;
  type: "Online" | "Physical";
  notes?: string;
  status: "Upcoming" | "Completed" | "Pending Feedback";
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  fileUrl?: string;
  fileName?: string;
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

export interface ChatThread {
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorCourse: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  likes: number;
  hasLiked?: boolean;
  comments: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    createdAt: string;
  }[];
}
