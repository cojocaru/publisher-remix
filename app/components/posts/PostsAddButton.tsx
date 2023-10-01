import React, { useContext } from "react";
import { CalendarContext } from "~/components/calendar/Calendar";

// PostsAddButton component
export default function PostsAddButton() {
  // Fetching the calendar context
  const calendarContext = useContext(CalendarContext);

  // Handler for the Add Posts button click event
  const onAddPostsButtonClick = () => {
    // Open the posts add form modal
    calendarContext.setPostsAddFormOpen(true);
  };

  return (
    <button
      // Button configurations
      type="button"
      onClick={onAddPostsButtonClick}
      className="flex items-center inset-0 ring-1 ring-inset ring-gray-300 justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative hover:bg-gray-50 rounded-md bg-white shadow-sm"
    >
      {/* Add icon */}
      <span className="material-symbols-outlined">add</span>
      {/* Label (hidden in smaller screens) */}
      <span className="text-black hidden md:block">Generate Posts</span>
    </button>
  );
}
