// // "use client";

// // import { useEffect, useState } from "react";
// // import { supabase } from "@/lib/supabaseClient";

// // export default function BookmarkList({ user }: any) {
// //   const [bookmarks, setBookmarks] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchBookmarks = async () => {
// //     const { data, error } = await supabase
// //       .from("bookmarks")
// //       .select("*")
// //       .eq("user_id", user.id)
// //       .order("created_at", { ascending: false });

// //     if (error) {
// //       console.error("Error fetching bookmarks:", error);
// //     } else {
// //       setBookmarks(data || []);
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchBookmarks();

// //     const channel = supabase
// //       .channel("realtime-bookmarks")
// //       .on(
// //         "postgres_changes",
// //         {
// //           event: "*",
// //           schema: "public",
// //           table: "bookmarks",
// //           filter: `user_id=eq.${user.id}`,
// //         },
// //         (payload) => {
// //           console.log("Realtime event:", payload);
// //           fetchBookmarks();
// //         }
// //       )
// //       .subscribe();

// //     return () => {
// //       supabase.removeChannel(channel);
// //     };
// //   }, [user.id]);

// //   const deleteBookmark = async (id: string) => {
// //     const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    
// //     if (error) {
// //       console.error("Error deleting:", error);
// //       alert("Failed to delete bookmark");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center py-20">
// //         <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
// //       </div>
// //     );
// //   }

// //   if (bookmarks.length === 0) {
// //     return (
// //       <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center">
// //         <div className="max-w-sm mx-auto space-y-4">
// //           <div className="text-6xl">No bookmarks</div>
// //           <h3 className="text-2xl font-bold text-gray-800">No bookmarks yet</h3>
// //           <p className="text-gray-500">
// //             Start saving your favorite links using the form above
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-2xl font-bold text-gray-800">
// //           Your Bookmarks ({bookmarks.length})
// //         </h2>
// //       </div>

// //       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {bookmarks.map((b) => (
// //           <div
// //             key={b.id}
// //             className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
// //           >
// //             <div className="flex items-start gap-4 mb-4">
// //               <div className="flex-shrink-0">
// //                 <img
// //                   src={`https://www.google.com/s2/favicons?domain=${b.url}&sz=128`}
// //                   alt="favicon"
// //                   className="w-12 h-12 rounded-xl shadow-md border border-gray-100"
// //                 />
// //               </div>

// //               <div className="flex-1 min-w-0">
// //                 <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
// //                   {b.title}
// //                 </h3>
// //                 <a
// //                   href={b.url}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline break-all line-clamp-1"
// //                 >
// //                   {b.url}
// //                 </a>
// //               </div>
// //             </div>

// //             <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
// //               <a
// //                 href={b.url}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="flex-1 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
// //               >
// //                 Visit Link
// //               </a>

// //               <button
// //                 onClick={() => {
// //                   if (confirm("Delete this bookmark?")) {
// //                     deleteBookmark(b.id);
// //                   }
// //                 }}
// //                 className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 font-medium"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }






// // components/BookmarkList.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import type { RealtimeChannel } from "@supabase/supabase-js";

// export default function BookmarkList({ user }: any) {
//   const [bookmarks, setBookmarks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookmarks = async () => {
//     const { data, error } = await supabase
//       .from("bookmarks")
//       .select("*")
//       .eq("user_id", user.id)
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Error fetching bookmarks:", error);
//     } else {
//       setBookmarks(data || []);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBookmarks();

//     // Realtime subscription
//     const channel: RealtimeChannel = supabase
//       .channel(`bookmarks-${user.id}`)
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "bookmarks",
//           filter: `user_id=eq.${user.id}`,
//         },
//         (payload) => {
//           console.log("Realtime payload:", payload);
          
//           // Optimistic UI update instead of refetching
//           if (payload.eventType === "INSERT") {
//             setBookmarks((prev) => [payload.new, ...prev]);
//           } else if (payload.eventType === "DELETE") {
//             setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
//           } else if (payload.eventType === "UPDATE") {
//             setBookmarks((prev) =>
//               prev.map((b) => (b.id === payload.new.id ? payload.new : b))
//             );
//           }
//         }
//       )
//       .subscribe((status) => {
//         console.log("Subscription status:", status);
//       });

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [user.id]);

//   const deleteBookmark = async (id: string) => {
//     const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    
//     if (error) {
//       console.error("Error deleting:", error);
//       alert("Failed to delete bookmark");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (bookmarks.length === 0) {
//     return (
//       <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center">
//         <div className="max-w-sm mx-auto space-y-4">
//           <div className="text-6xl">📚</div>
//           <h3 className="text-2xl font-bold text-gray-800">No bookmarks yet</h3>
//           <p className="text-gray-500">
//             Start saving your favorite links using the form above
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Your Bookmarks ({bookmarks.length})
//         </h2>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {bookmarks.map((b) => (
//           <div
//             key={b.id}
//             className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
//           >
//             <div className="flex items-start gap-4 mb-4">
//               <div className="flex-shrink-0">
//                 <img
//                   src={`https://www.google.com/s2/favicons?domain=${b.url}&sz=128`}
//                   alt="favicon"
//                   className="w-12 h-12 rounded-xl shadow-md border border-gray-100"
//                 />
//               </div>

//               <div className="flex-1 min-w-0">
//                 <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
//                   {b.title}
//                 </h3>
//                 <a
//                   href={b.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline break-all line-clamp-1"
//                 >
//                   {b.url}
//                 </a>
//               </div>
//             </div>

//             <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
//               <a
//                 href={b.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-1 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
//               >
//                 Visit Link
//               </a>

//               <button
//                 onClick={() => {
//                   if (confirm("Delete this bookmark?")) {
//                     deleteBookmark(b.id);
//                   }
//                 }}
//                 className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 font-medium"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





// components/BookmarkList.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({ user, refreshTrigger }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookmarks:", error);
    } else {
      setBookmarks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user.id, refreshTrigger]);

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    
    if (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete bookmark");
    } else {
      setBookmarks(prev => prev.filter(b => b.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center">
        <div className="max-w-sm mx-auto space-y-4">
          <div className="text-6xl">📚</div>
          <h3 className="text-2xl font-bold text-gray-800">No bookmarks yet</h3>
          <p className="text-gray-500">
            Start saving your favorite links using the form above
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Bookmarks ({bookmarks.length})
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${b.url}&sz=128`}
                  alt="favicon"
                  className="w-12 h-12 rounded-xl shadow-md border border-gray-100"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {b.title}
                </h3>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline break-all line-clamp-1"
                >
                  {b.url}
                </a>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                Visit Link
              </a>

              <button
                onClick={() => {
                  if (confirm("Delete this bookmark?")) {
                    deleteBookmark(b.id);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}