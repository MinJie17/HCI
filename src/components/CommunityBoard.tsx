import React, { useState } from "react";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus, 
  SlidersHorizontal, 
  Flame, 
  Users, 
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen
} from "lucide-react";
import { CommunityPost } from "../types";
import { CATEGORIES } from "../data";

interface CommunityBoardProps {
  posts: CommunityPost[];
  onAddPost: (newPost: {
    title: string;
    content: string;
    category: string;
  }) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentContent: string) => void;
  isDarkMode: boolean;
}

export default function CommunityBoard({
  posts,
  onAddPost,
  onLikePost,
  onAddComment,
  isDarkMode
}: CommunityBoardProps) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState(CATEGORIES[0] || "Programming");
  const [postContent, setPostContent] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Track comments inputs per post
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});

  const filteredPosts = activeCategoryFilter
    ? posts.filter(p => p.category === activeCategoryFilter)
    : posts;

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      setSubmitError("Please provide both a title and descriptive post elements!");
      return;
    }

    setSubmitError(null);
    onAddPost({
      title: postTitle,
      content: postContent,
      category: postCategory
    });

    // Reset parameters
    setPostTitle("");
    setPostContent("");
    setIsSubmitModalOpen(false);
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    onAddComment(postId, text);
    // clear input
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  const trendingTopics = [
    { title: "#ReactHooks", count: "14 peers talking" },
    { title: "#BiotechExcelSlices", count: "9 references" },
    { title: "#StagePresencePrep", count: "11 meetings" },
    { title: "#TEDxQIUDesigners", count: "8 requests" }
  ];

  return (
    <div className={`py-10 ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Compose CTA button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-extrabold tracking-tight">QIU Peer Discussion</h1>
            <p className="text-sm text-slate-500 mt-2">Request specific guidance, review student dashboard frameworks, or swap advice on courses.</p>
          </div>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center space-x-1.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/10"
          >
            <Plus className="w-5 h-5" />
            <span>Create Request Post</span>
          </button>
        </div>

        {/* Master layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: List of Posts */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Category filter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveCategoryFilter("")}
                className={`px-4 py-2 text-xs font-semibold rounded-full shrink-0 transition-all ${
                  activeCategoryFilter === ""
                    ? "bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-650"
                }`}
              >
                All feeds
              </button>
              {CATEGORIES.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full shrink-0 transition-all ${
                    activeCategoryFilter === cat
                      ? "bg-indigo-650 bg-indigo-600 text-white"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-650"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List */}
            {filteredPosts.length === 0 ? (
              <div className={`p-16 text-center rounded-3xl border border-dashed ${
                isDarkMode ? "bg-slate-800 border-slate-705" : "bg-white border-slate-200"
              }`}>
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h4 className="font-semibold text-lg">No post matching department filter</h4>
                <p className="text-slate-400 text-xs mt-1 mb-5">Be the first to prompt a swap! Click above to create a custom search post.</p>
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl"
                >
                  Create request post
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  {/* Author meta row */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full border border-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-semibold text-sm leading-none">{post.authorName}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{post.authorCourse} • Requested swap</p>
                    </div>
                  </div>

                  {/* Title and Content text */}
                  <h3 className="font-display font-extrabold text-base mb-2.5 hover:text-indigo-600 cursor-pointer">{post.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 whitespace-pre-line">{post.content}</p>

                  {/* Tag badge with Likes buttons */}
                  <div className="flex justify-between items-center py-2.5 border-y border-slate-100 dark:border-slate-700/50 mb-4 text-xs">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => onLikePost(post.id)}
                        className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                          post.hasLiked ? "text-red-500" : "text-slate-400"
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={post.hasLiked ? "currentColor" : "none"} />
                        <span>{post.likes}</span>
                      </button>
                      <span className="flex items-center space-x-1 text-slate-400">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.length}</span>
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Comments List */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3 mb-4 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl max-h-48 overflow-y-auto">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="text-xs">
                          <div className="flex items-center gap-2 mb-1">
                            <img
                              src={comment.authorAvatar}
                              alt={comment.authorName}
                              className="w-5 h-5 rounded-full"
                              referrerPolicy="no-referrer"
                            />
                            <span className="font-semibold text-[10px]">{comment.authorName}</span>
                          </div>
                          <p className="text-slate-500 text-[11px] leading-relaxed pl-7">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment Input Composer Form */}
                  <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Offer your help or leave a comment..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      className="flex-1 text-xs p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800"
                    />
                    <button
                      type="submit"
                      disabled={!commentInputs[post.id]?.trim()}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold disabled:opacity-50"
                    >
                      Comment
                    </button>
                  </form>
                </article>
              ))
            )}
          </div>

          {/* Right Sidebar: Topics & Leaderboard */}
          <div className="space-y-6">
            
            {/* Trending Topics card */}
            <div className={`p-6 rounded-2xl border ${
              isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className="font-display font-extrabold text-sm mb-4 flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span>Trending Exchange tags</span>
              </h3>
              <div className="space-y-3.5">
                {trendingTopics.map((topic, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">{topic.title}</span>
                    <span className="text-slate-400 text-[10px] font-mono">{topic.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Peer Learning Code of Conduct card */}
            <div className={`p-6 rounded-2xl border bg-gradient-to-br from-indigo-500/10 to-transparent ${
              isDarkMode ? "border-slate-800" : "border-indigo-100"
            }`}>
              <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-500 mb-2">QIU Safety Guidelines</h3>
              <ul className="space-y-2 text-[10px] text-slate-500 leading-normal">
                <li>• No money swaps allowed. Only skills, references and educational guides are traded.</li>
                <li>• Respect scheduling agreements—notify peers 1 hour beforehand if canceling.</li>
                <li>• Leave truthful, objective ratings to build academic trust.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compose Post Modal Overlay */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className={`w-full max-w-lg rounded-3xl p-6 shadow-xl border ${
              isDarkMode ? "bg-slate-800 border-slate-700 text-slate-100" : "bg-white border-slate-100 text-slate-900"
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-display font-bold">Write a Student Request</h3>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleCreatePostSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Request Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Short, direct summary (e.g., Seeking basic portrait photography tips)"
                    value={postTitle}
                    onChange={(e) => {
                      setPostTitle(e.target.value);
                      setSubmitError(null);
                    }}
                    className="w-full text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-910 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Topic Specialty Directory</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-910 border border-slate-150 dark:border-slate-800 cursor-pointer text-slate-800 dark:text-slate-100"
                  >
                    {CATEGORIES.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Post Content Notes</label>
                  <textarea
                    required
                    placeholder="Describe what specific curriculum you want to explore. What skills can you offer to teach in return?"
                    rows={5}
                    value={postContent}
                    onChange={(e) => {
                      setPostContent(e.target.value);
                      setSubmitError(null);
                    }}
                    className="w-full text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-910 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  ></textarea>
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-505/20 text-red-650 dark:text-red-400 text-xs flex items-center gap-2">
                    <span className="font-extrabold text-sm">⚠️</span>
                    <span className="font-semibold">{submitError}</span>
                  </div>
                )}

                <div className="flex gap-2 justify-end pt-3 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitModalOpen(false);
                      setSubmitError(null);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-all"
                  >
                    Post Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
