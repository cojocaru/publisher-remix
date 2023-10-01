import { Post } from "./Post";

export interface CalendarDay {
    date: string;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    posts: Post[];
  }