import React, { useContext } from "react";
import classNames from "clsx";
import { CalendarContext } from "~/components/calendar/Calendar";

export default function CalendarMonthView() {
  // Access context to get calendar state and actions
  const calendarContext = useContext(CalendarContext);

  // Function to handle day clicks, opens details modal and sets the selected day
  const handleDayClick = (day) => {
    calendarContext.setSelectedDay(day.date);
    calendarContext.setDetailsModalOpen(true);
  };

  // @ts-ignore
  return (
    // Main container for the calendar month view
    <div className="lg:flex lg:h-full lg:flex-col">
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          {/* Individual day headers (Mon, Tue, etc.) */}
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto cursor-pointer">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {calendarContext.calendarDays.map((day) => (
              <div
                onClick={() => handleDayClick(day)}
                key={day.date}
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                  "relative py-2 px-3 min-h-[120px]"
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day.isToday
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-red-400 font-semibold text-white"
                      : undefined
                  }
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
                {day.posts.length > 0 && (
                  <ol className="mt-2">
                    {day.posts.slice(0, 2).map((event, index) => (
                      <li key={index}>
                        <a href="#" className="group flex">
                          <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-red-600">
                            {event.topic}
                          </p>
                          <span className="ml-3 hidden flex-none text-gray-500 group-hover:text-red-400 xl:block">
                            {event.network}
                          </span>
                        </a>
                      </li>
                    ))}
                    {day.posts.length > 2 && (
                      <li className="text-gray-500">
                        + {day.posts.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {calendarContext.calendarDays.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && day.isToday && "text-red-400",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    day.isToday &&
                    "text-gray-500",
                  "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-red-600",
                    day.isSelected && day.isToday && "bg-gray-900",
                    "ml-auto"
                  )}
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
                <span className="sr-only">{day.posts.length} events</span>
                {day.posts.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.posts.map((event, index) => (
                      <span
                        key={index}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
