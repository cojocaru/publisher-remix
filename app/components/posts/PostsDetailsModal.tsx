import { Dialog } from "@headlessui/react";
import { useContext } from "react";
import { CalendarContext } from "~/components/calendar/Calendar";

export default function PostsDetailsModal() {
  // Get the current calendar context
  const calendarContext = useContext(CalendarContext);

  // Fetch posts for the selected day
  const postsForSelectedDay = calendarContext.posts[calendarContext.selectedDay] || [];

  return (
    <Dialog open={true} onClose={() => {}} className="relative z-10 max-w-3xl">
      {/* Overlay backdrop */}
      <div className="fixed inset-0 bg-black/5 backdrop-blur-sm" />

      {/* Scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Center the modal */}
        <div className="flex min-h-full items-center justify-center">
          {/* Modal content */}
          <Dialog.Panel className="mx-auto max-w-5xl rounded bg-gray-50 p-4 relative flex flex-col gap-3.5">
            {/* Modal title */}
            <Dialog.Title>Posts</Dialog.Title>

            {/* Description and day */}
            <span className="text-xs text-gray-500 w-80">
              All posts for {calendarContext.selectedDay}
            </span>

            {/* Posts list */}
            <div className="p-5 bg-white rounded-md grid grid-cols-1 gap-3.5 shadow">
              {postsForSelectedDay.length === 0 ? (
                <div>No posts for this day.</div>
              ) : (
                postsForSelectedDay.map((post, index) => (
                  <div key={index} className="post-card">
                    <h3 className="font-bold">Topic: {post.topic}</h3>
                    <span className="font-semibold">Network: {post.network}</span>
                    <p>{post.body}</p>
                  </div>
                ))
              )}
            </div>

            {/* Close button */}
            <span
              className="material-symbols-outlined cursor-pointer select-none absolute top-1.5 right-1.5"
              onClick={() => {
                // Close the modal
                calendarContext.setDetailsModalOpen(false);
              }}
            >
              close
            </span>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
