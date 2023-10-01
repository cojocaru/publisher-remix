import React, { createContext, useEffect, useMemo, useState } from "react";
import { format, startOfMonth, startOfToday } from "date-fns";
import CalendarMonthView from "~/components/calendar/CalendarMonthView";
import PostsAddForm from "~/components/posts/PostsAddForm";
import PostsAddButton from "~/components/posts/PostsAddButton";
import PostsDetailsModal from "~/components/posts/PostsDetailsModal";
import Loader from "~/components/generic/Loader";
import { Post } from "~/models/Post";
import { CalendarDay } from "~/models/CalendarDay";
import { loadPosts } from "~/api/api";

// Calendar Context and interface definitions
interface CalendarContextProps {
  today: Date;
  setToday: (today: Date) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  postsAddFormOpen: boolean;
  setPostsAddFormOpen: (open: boolean) => void;

  postsDetailsModalOpen: boolean;
  setDetailsModalOpen: (open: boolean) => void;

  posts: { [key: string]: Post[] };
  setPosts: (posts: { [key: string]: Post[] }) => void;

  currentMonth: Date;
  setCurrentMonth: (month: Date) => void;

  calendarDays: CalendarDay[];
  setCalendarDays: (days: CalendarDay[]) => void;

  updateDays: (posts: { [key: string]: Post[] }) => void;

  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

export const CalendarContext = createContext<CalendarContextProps>(null);
export const CalendarProvider = CalendarContext.Provider;

export default function Calendar() {
  // State variables for different functionalities and UI states
  const [postsAddFormOpen, setPostsAddFormOpen] = useState<boolean>(false);
  const [postsDetailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<{ [key: string]: Post[] }>({});

  const [loading, setLoading] = useState<boolean>(true);

  const [today, setToday] = useState<Date>(startOfToday());
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(today));
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  useEffect(() => {
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (initialLoad) {
      loadPosts()
        .then((data) => {
          setPosts(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [initialLoad]);

  // Update calendar days based on posts and current month
  useEffect(() => {
    updateDays(posts);
  }, [posts, currentMonth]);

  // Memoize the current month label for performance
  const currentMonthLabel = useMemo(() => {
    return format(currentMonth, "MMMM yyyy");
  }, [currentMonth]);

  // Constants and utility functions for calendar manipulation
  const TOTAL_CALENDAR_DAYS = 42;

  const adjustStartDate = (date: Date) => {
    const adjustDay = date.getDay() === 0 ? 6 : date.getDay() - 1;
    date.setDate(date.getDate() - adjustDay);
  };

  // Function to update calendar days based on posts
  const updateDays = (posts: { [key: string]: Post[] }) => {
    const days: CalendarDay[] = [];
    const start = startOfMonth(currentMonth);

    adjustStartDate(start);

    for (let i = 0; i < TOTAL_CALENDAR_DAYS; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);

      const dateKey = format(date, "yyyy-MM-dd");

      days.push({
        date: dateKey,
        isCurrentMonth: date.getMonth() === currentMonth.getMonth(),
        isToday: date.toDateString() === today.toDateString(),
        posts: posts[dateKey] || [],
      });
    }

    setCalendarDays(days);
  };

  // Functions for navigating through months
  const onNavigatePrevious = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    setCurrentMonth(previousMonth);
  };

  const onNavigateNext = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Main render function for the Calendar component
  return (
    <CalendarProvider
      value={{
        today,
        setToday,

        posts,
        setPosts,

        postsAddFormOpen,
        setPostsAddFormOpen,

        postsDetailsModalOpen,
        setDetailsModalOpen,

        currentMonth,
        setCurrentMonth,

        calendarDays,
        setCalendarDays,

        updateDays,

        selectedDay,
        setSelectedDay,

        loading,
        setLoading,
      }}
    >
      <Loader loading={loading}>
        <header className="flex items-center justify-between border-b border-gray-200 px-2.5 py-4 lg:flex-none">
          <div className="flex items-center">{currentMonthLabel}</div>

          <div className="flex items-center gap-2.5">
            <PostsAddButton />

            <div className="relative flex items-center rounded-md bg-white shadow-sm">
              <button
                type="button"
                onClick={onNavigatePrevious}
                className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative hover:bg-gray-50"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="relative h-5 w-px bg-gray-300" />
              <button
                onClick={onNavigateNext}
                type="button"
                className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative hover:bg-gray-50"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              <div
                className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
                aria-hidden="true"
              />
            </div>
          </div>
        </header>

        <CalendarMonthView />

        {postsAddFormOpen && <PostsAddForm />}
        {postsDetailsModalOpen && <PostsDetailsModal />}
      </Loader>
    </CalendarProvider>
  );
}
