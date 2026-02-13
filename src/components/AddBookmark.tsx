// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export default function AddBookmark({ user }: any) {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   const addBookmark = async () => {
//     if (!title.trim() || !url.trim()) {
//       alert("Please fill both fields!");
//       return;
//     }

//     setLoading(true);

//     const { error } = await supabase.from("bookmarks").insert([
//       {
//         title: title.trim(),
//         url: url.trim(),
//         user_id: user.id,
//       },
//     ]);

//     if (error) {
//       console.error("Error adding bookmark:", error);
//       alert("Failed to add bookmark");
//     } else {
//       setTitle("");
//       setUrl("");
//     }

//     setLoading(false);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !loading) {
//       addBookmark();
//     }
//   };

//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 mb-10">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-2xl">
//           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">
//           Add New Bookmark
//         </h2>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <input
//           className="border-2 border-gray-300 p-4 rounded-2xl flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
//           placeholder="Bookmark Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />

//         <input
//           className="border-2 border-gray-300 p-4 rounded-2xl flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
//           placeholder="https://example.com"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />

//         <button
//           onClick={addBookmark}
//           disabled={loading}
//           className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
//         >
//           {loading ? (
//             <span className="flex items-center gap-2">
//               <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//               Adding...
//             </span>
//           ) : (
//             "Add Bookmark"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }


// components/AddBookmark.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBookmark({ user, onAdded }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const addBookmark = async () => {
    if (!title.trim() || !url.trim()) {
      alert("Please fill both fields!");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("bookmarks").insert([
      {
        title: title.trim(),
        url: url.trim(),
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error("Error adding bookmark:", error);
      alert("Failed to add bookmark");
    } else {
      setTitle("");
      setUrl("");
      if (onAdded) onAdded();
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      addBookmark();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-2xl">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Add New Bookmark
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          className="border-2 border-gray-300 p-4 rounded-2xl flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
          placeholder="Bookmark Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <input
          className="border-2 border-gray-300 p-4 rounded-2xl flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button
          onClick={addBookmark}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Adding...
            </span>
          ) : (
            "Add Bookmark"
          )}
        </button>
      </div>
    </div>
  );
}