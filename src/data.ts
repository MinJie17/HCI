import { Tutor, Review, CommunityPost, ChatThread } from "./types";

export const CATEGORIES = [
  "Programming",
  "Graphic Design",
  "Video Editing",
  "Public Speaking",
  "Photography",
  "Language Learning",
  "Microsoft Excel",
  "Canva Design",
  "PowerPoint Presentation",
  "UI/UX Design"
];

export const INITIAL_TUTORS: Tutor[] = [
  {
    id: "tutor_1",
    name: "Ahmad Faiz",
    avatar: "https://picsum.photos/seed/faiz/150/150",
    course: "Bachelor of Computer Science (Hons)",
    year: 3,
    skills: [
      { name: "Programming", level: "Advanced", category: "Programming" },
      { name: "UI/UX Design", level: "Intermediate", category: "UI/UX Design" }
    ],
    bio: "Full-stack developer student. Love building interactive react projects and designing clean interfaces.",
    about: "Hey peers! I'm Ahmad. I have been coding in JavaScript/TypeScript and Python for 3 years. I've built 4 web apps used by university students and would love to help you grasp React, Tailwind, and general programming paradigms. Together we can code something cool!",
    rating: 4.9,
    reviewCount: 18,
    availability: [
      { day: "Monday", slots: ["14:00 - 15:30", "16:00 - 17:30"] },
      { day: "Wednesday", slots: ["10:00 - 11:30", "14:00 - 15:30"] },
      { day: "Friday", slots: ["15:00 - 16:30"] }
    ],
    portfolio: [
      {
        title: "QIU Campus Food App",
        description: "Mobile ordering application designed for campus cafeteria.",
        imageUrl: "https://picsum.photos/seed/foodapp/400/300"
      },
      {
        title: "Smart Classroom Manager",
        description: "A scheduler that tracks empty slots in university labs.",
        imageUrl: "https://picsum.photos/seed/classman/400/300"
      }
    ],
    badges: ["Top Rated", "Python Guru", "Creative Architect"]
  },
  {
    id: "tutor_2",
    name: "Sarah Lim",
    avatar: "https://picsum.photos/seed/sarah/150/150",
    course: "Bachelor of Business Administration",
    year: 2,
    skills: [
      { name: "Microsoft Excel", level: "Advanced", category: "Microsoft Excel" },
      { name: "PowerPoint Presentation", level: "Advanced", category: "PowerPoint Presentation" }
    ],
    bio: "Excel formulas wizard and slide design specialist. I make boards look corporate & polished.",
    about: "Hi everyone! Sarah here. Don't let Excel spreadsheets frustrate you. I can teach you everything from VLOOKUP and Index Match to Pivot Tables and dynamic charts. Let's make your business reports outstanding!",
    rating: 4.8,
    reviewCount: 12,
    availability: [
      { day: "Tuesday", slots: ["09:00 - 10:30", "11:00 - 12:30"] },
      { day: "Thursday", slots: ["14:00 - 15:30", "16:00 - 17:30"] }
    ],
    portfolio: [
      {
        title: "Micro-finance Dashboard",
        description: "Financial analysis dashboard built for regional SME clients.",
        imageUrl: "https://picsum.photos/seed/finance/400/300"
      }
    ],
    badges: ["Excel Expert", "Structure Master"]
  },
  {
    id: "tutor_3",
    name: "Jason Raj",
    avatar: "https://picsum.photos/seed/jason/150/150",
    course: "Bachelor of Arts in Communication (Hons)",
    year: 2,
    skills: [
      { name: "Public Speaking", level: "Advanced", category: "Public Speaking" },
      { name: "Photography", level: "Intermediate", category: "Photography" }
    ],
    bio: "Debater and portrait enthusiast. Happy to share tricks about tone, presence and composition.",
    about: "Hello! Jason here. Public presentations can be nerve-wracking, but with simple structural templates and breathing practices, you can captivate any auditorium. Reach out and let's structure your next semester pitch!",
    rating: 4.7,
    reviewCount: 9,
    availability: [
      { day: "Wednesday", slots: ["11:00 - 12:30", "16:00 - 17:30"] },
      { day: "Thursday", slots: ["10:00 - 11:30", "15:00 - 16:30"] }
    ],
    portfolio: [
      {
        title: "National Debate Finals",
        description: "Delivering speech on educational policy alternatives.",
        imageUrl: "https://picsum.photos/seed/debate/400/300"
      }
    ],
    badges: ["Vocal Pioneer", "Empathetic Peer"]
  },
  {
    id: "tutor_4",
    name: "Emily Watson",
    avatar: "https://picsum.photos/seed/emily/150/150",
    course: "Bachelor of Graphic Design & Digital Media",
    year: 3,
    skills: [
      { name: "Graphic Design", level: "Advanced", category: "Graphic Design" },
      { name: "Canva Design", level: "Advanced", category: "Canva Design" },
      { name: "Video Editing", level: "Intermediate", category: "Video Editing" }
    ],
    bio: "Visual storyteller. Specialized in modern branding, postering, and snappy social media cuts.",
    about: "Hey guys, Emily here! I will share my complete workflow from brainstorming layouts in Figma and Adobe Illustrator to assembling rapid but gorgeous Canva vectors. Let's make your project posters turn heads!",
    rating: 5.0,
    reviewCount: 22,
    availability: [
      { day: "Monday", slots: ["10:00 - 11:30"] },
      { day: "Tuesday", slots: ["14:00 - 15:30", "15:45 - 17:15"] },
      { day: "Friday", slots: ["11:00 - 12:30", "14:00 - 15:30"] }
    ],
    portfolio: [
      {
        title: "TEDxQIU Branding",
        description: "Official visual design poster and banner style-guide.",
        imageUrl: "https://picsum.photos/seed/tedx/400/300"
      },
      {
        title: "Campus Fest Promo Film",
        description: "1-minute hype reel edited with custom visual effects.",
        imageUrl: "https://picsum.photos/seed/promo/400/300"
      }
    ],
    badges: ["Super Designer", "Detail Obsessive"]
  },
  {
    id: "tutor_5",
    name: "Kenzhe Malik",
    avatar: "https://picsum.photos/seed/malik/150/150",
    course: "Bachelor of Engineering (Hons) Mechatronics",
    year: 4,
    skills: [
      { name: "Programming", level: "Advanced", category: "Programming" },
      { name: "Language Learning", level: "Advanced", category: "Language Learning" }
    ],
    bio: "Multilingual roboticist. Teaches advanced C++ and Japanese conversational dialogue.",
    about: "Welcome! Malik here. I love translating block designs into functional logic, both in microcontrollers and human speech. I speaking Russian, English, and conversational Japanese with N2 proficiency.",
    rating: 4.6,
    reviewCount: 7,
    availability: [
      { day: "Wednesday", slots: ["09:00 - 10:30"] },
      { day: "Friday", slots: ["09:00 - 10:30", "13:00 - 14:30"] }
    ],
    portfolio: [
      {
        title: "Line Tracking Robot Code",
        description: "Optimized PID loops in C++.",
        imageUrl: "https://picsum.photos/seed/robot/400/300"
      }
    ],
    badges: ["Polyglot", "Code Artisan"]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev_1",
    tutorId: "tutor_1",
    studentName: "Chloe Ooi",
    studentAvatar: "https://picsum.photos/seed/chloe/100/100",
    rating: 5,
    comment: "Faiz explains React concepts so much better than textbook slides! We did a hands-on dynamic todo app during our call. Highly recommended!",
    date: "2026-05-24",
    skillName: "Programming"
  },
  {
    id: "rev_2",
    tutorId: "tutor_1",
    studentName: "Daniel Tan",
    studentAvatar: "https://picsum.photos/seed/daniel/100/100",
    rating: 5,
    comment: "Excellent mentoring on UI prototyping. Very patient and gave solid Figma tips.",
    date: "2026-05-20",
    skillName: "UI/UX Design"
  },
  {
    id: "rev_3",
    tutorId: "tutor_2",
    studentName: "Meor Hafiz",
    studentAvatar: "https://picsum.photos/seed/meor/100/100",
    rating: 4,
    comment: "Great step-by-step Excel instruction! Sarah showed me Pivot table shortcuts that will save me hours for my accounting project.",
    date: "2026-05-22",
    skillName: "Microsoft Excel"
  },
  {
    id: "rev_4",
    tutorId: "tutor_4",
    studentName: "Siti Aminah",
    studentAvatar: "https://picsum.photos/seed/siti/100/100",
    rating: 5,
    comment: "Emily is incredibly energetic and creative. She audited my group presentation design on Canva and totally transformed the color scheme. Love it!",
    date: "2026-05-25",
    skillName: "Canva Design"
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: "post_1",
    authorName: "Divya Prakash",
    authorAvatar: "https://picsum.photos/seed/divya/100/100",
    authorCourse: "BSc Biotechnology",
    title: "Looking for an Excel crash course before our Thursday lab analysis!",
    content: "Hi active peers! Our Biotech lab requires plotting dynamic regression lines and standard deviation bars in Excel. I am super confused with spreadsheets. Anyone up for a quick 1-hour swap? I can teach core DSLR photography or basic video editing in Premiere Pro!",
    category: "Microsoft Excel",
    createdAt: "2026-05-25T14:30:00Z",
    likes: 5,
    comments: [
      {
        id: "com_11",
        authorName: "Sarah Lim",
        authorAvatar: "https://picsum.photos/seed/sarah/100/100",
        content: "Hey Divya! I'm Sarah, I can totally show you standard curves and standard error plot setups. Let's book a session on Tuesday morning!",
        createdAt: "2026-05-25T15:10:00Z"
      }
    ]
  },
  {
    id: "post_2",
    authorName: "Ahmad Faiz",
    authorAvatar: "https://picsum.photos/seed/faiz/100/100",
    authorCourse: "BCompSc (Hons)",
    title: "Check out this awesome UI checklist I compiled for university dashboards",
    content: "When designing student systems, remember to follow visual hierarchy: 1. Keep metrics visible without scroll, 2. Keep navigation simple, 3. Highlight current session indicators clearly. Let me know if anyone wants to do a UI feedback critique!",
    category: "UI/UX Design",
    createdAt: "2026-05-24T09:12:00Z",
    likes: 12,
    hasLiked: true,
    comments: [
      {
        id: "com_21",
        authorName: "Emily Watson",
        authorAvatar: "https://picsum.photos/seed/emily/100/100",
        content: "This is super solid. I love the feedback guidelines. Especially consistency!",
        createdAt: "2026-05-24T10:05:00Z"
      }
    ]
  },
  {
    id: "post_3",
    authorName: "Liew Mun Kit",
    authorAvatar: "https://picsum.photos/seed/munkit/100/100",
    authorCourse: "Bachelor of Mass Communication",
    title: "Need help with Public Speaking prep for my final year pitch!",
    content: "Hello study buddy community! Our pitch is in 10 days and I have severe stage fright. Seeking peers who can run dry-runs and give supportive structural feedback. I can share graphic design and poster layout ideas in return!",
    category: "Public Speaking",
    createdAt: "2026-05-23T18:40:00Z",
    likes: 8,
    comments: []
  }
];

export const INITIAL_THREADS: ChatThread[] = [
  {
    tutorId: "tutor_1",
    tutorName: "Ahmad Faiz",
    tutorAvatar: "https://picsum.photos/seed/faiz/100/100",
    lastMessage: "No problem! Let's meet at building B level 2 student commons.",
    timestamp: "10:30 AM",
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: "msg_1",
        senderId: "student_user",
        senderName: "Me",
        senderAvatar: "https://picsum.photos/seed/student/100/100",
        text: "Hey Faiz, can we choose 'Physical' option for our coding prep session?",
        timestamp: "10:15 AM",
        reactions: [
          { emoji: "👍", count: 1, users: ["tutor_1"] }
        ]
      },
      {
        id: "msg_2",
        senderId: "tutor_1",
        senderName: "Ahmad Faiz",
        senderAvatar: "https://picsum.photos/seed/faiz/100/100",
        text: "No problem! Let's meet at building B level 2 student commons.",
        timestamp: "10:30 AM"
      }
    ]
  },
  {
    tutorId: "tutor_2",
    tutorName: "Sarah Lim",
    tutorAvatar: "https://picsum.photos/seed/sarah/100/100",
    lastMessage: "Hey! Let me know which spreadsheets you need help with.",
    timestamp: "Yesterday",
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: "msg_3",
        senderId: "tutor_2",
        senderName: "Sarah Lim",
        senderAvatar: "https://picsum.photos/seed/sarah/100/100",
        text: "Hey! Let me know which spreadsheets you need help with.",
        timestamp: "Yesterday"
      }
    ]
  }
];
