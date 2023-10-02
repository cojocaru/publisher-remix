
# Typetone Scheduler: Automating Social Media Management

## Overview

Typetone Scheduler is an application designed to automate the core responsibilities of social media management: content creation and content publishing. Developed as a part of Typetone's new feature focusing on content distribution, this application significantly streamlines the workflow for managing scheduled social media posts. 

## Architecture

The application is structured into two core components:

1. **Frontend**: Developed using Remix, it features a calendar interface for viewing and managing social media posts, along with a form for adding new posts.
2. **Backend**: Implemented using FastAPI, it interfaces with OpenAI API via Langchain and connects to cron jobs through Make.com for automated post scheduling and social media integration.

### Frontend Functionality

- **Calendar View**: Allows users to see all their scheduled posts at a glance.
- **Add New Posts**: A form enables users to specify the topic, choose the social media network, and set the number of days for the posts. The system will then generate and schedule the posts starting from the current day.

### Backend Functionality

- **Generate Multiple Posts**: To schedule multiple posts on a single day, click the "Generate Posts" button. The system uses a single prompt to avoid content duplication.
- **Automated Publishing**: A daily cron job scans for posts ready for publishing. The backend then publishes the posts to the specified social media networks automatically.

## Future Enhancements

The current version is fully functional, but there are plans for further improvements, including:

- Database persistence
- Enhanced security features
- Robust error handling
- Option to input a URL for content-based post generation

## Technologies Used

- **Frontend**: Remix, React, TypeScript
- **Backend**: FastAPI, Langchain, OpenAI API
- **Scheduling and Social Media Integration**: Make.com

Due to time constraints, Make.com was used for cron job integration. Future updates will include programmatic cron job settings.

## How to Run the Project Locally

1. Clone the repository:
   ```
   git clone https://github.com/cojocaru/publisher-remix.git
   ```

2. Navigate to the project folder:
   ```
   cd publisher-remix
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