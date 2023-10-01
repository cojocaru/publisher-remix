# Social Media Post Scheduler

This is a web application for scheduling social media posts, built with React, TypeScript, and Remix.

## Features

- Month View Calendar
- Add New Posts via form
- Detailed Modal for Posts for a given day
- Loader for asynchronous operations

## Technologies Used

- React
- TypeScript
- Remix
- date-fns for date formatting
- Context API for state management

## Project Structure

The project mainly consists of the following components:

- `Calendar.tsx`: The main component for rendering the calendar and orchestrating other components.
- `CalendarMonthView.tsx`: Renders the month view of the calendar.
- `PostsAddForm`: Component for the form used to add new posts.
- `PostsAddButton`: Button for triggering the new post addition form.
- `PostsDetailsModal`: Modal for showing the details of a selected post.
- `Loader`: A generic component for showing a loading state.

## How to Run the Project Locally

1. Clone the repository:
   ```
   git clone https://github.com/
   ```

2. Navigate to the project folder:
   ```
   cd 
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the project:
   ```
   npm run dev
   ```

## Change API URL
I deployed FastAPI app on the server and you can use it to test, but if you want to runt the publisher-api locally you need to change settings in /app/api/api.ts the
const host = 'your_local_url'