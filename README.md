Startup application for CS 260
View notes from class [here](notes.md)

# TrainClimbing.com

### Elevator Pitch:

This web application is built by climbers, for climbers. 🧗‍♂️ Our platform exists to help boulder bros, grade pushers, and crushers everywhere get stronger 💪 and train smarter 🧠. Users create personal accounts, choose from 1 of 2 training plans, and log their daily progress towards personalized goals.

We've all experienced the frustration of hitting a plateau 😔. Usually, this is because we climb without a plan. With [trainclimbing.com](https://trainclimbing.com), now you have one.
#nohalfsends 🏔️

### Design:

![wireframes](static/img/TrainClimbing%20WireFrame.png)

### Key Features:

- Secure authentication over HTTPS
- Home page with live forum for sharing beta
- Ability to choose between 2 training plans
- Ability to record daily workouts
- Ability to track daily macronutrient intake
- User journal entries are persistently stored
- Ability for admin to update training plans
- CRUD user functionality

### Technologies:

The following technologies will be incorporated into the project:

- HTML - 5 HTML pages. Pages for landing, login, registration, plan overview, and user portal (to view progress and reports).
- CSS - Responsive and user-friendly design. Modern, eye-catching, and compatible with all screen sizes.
- JavaScript - Handle login, backend calls, and dynamic user interactions.
- Database - Store user information, workout entries. Provide methods to see progress/participation over time. Display current project grade.
- Login - Secure authentication for application users.
- Web Socket - Live public forum to discuss the latest in climbing, training, etc
- React - Fast, modern web framework.

---

## HTML Deliverable:

For this deliverable, I created the basic application content/structure using HTML.

- HTML pages - Five pages to allow users to login, view their daily training plan, see past progress, participate in a forum, and learn more about the app.
- Links - All hyperlinks work as desired. Login button links to Training Plan page.
- Images - Images in About page work as desired.
- Login - Input/label boxes with submit button.
- Database - Data pulled from the database is seen in 3 locations. First, the current "send grade" seen on the Training page. Second, the "day" of the training plan (eg. Day 3). And finally, in the Progress page, where a user will eventually see visualizations of their progress, based on persistent data stored about each user.
- WebSocket - On the community page, there is a placeholder for an online chat feature, for climbers to share information about climbs, news, etc.
- Github - Link to the github repository found on every page, see footer.
- Simon - [https://simon.trainclimbing.com](https://simon.trainclimbing.com) is deployed with sample provided code
- Startup - [https://startup.trainclimbing.com](https://startup.trainclimbing.com) is deployed with this deliverable's code

## CSS Deliverable:

For this deliverable, I styled the basic application using only custom CSS (slower, but a great learning experience).

- Header, Footer, Sidebar, & Main Content Areas
- Navigation elements - Sidebar links are styled according to state (active vs passive). Other links are either displayed as buttons or colored text. Non-sidebar links have associated hover effects.
- Responsive - Header, footer, and main content shrinks and responds well to screen resizing. Sidebar collapses for media that is < 768px wide. Collapsing is toggle-able only on the daily workout page, since it relies on an id selector. However, if the app becomes single-page in the future, this functionality will extend to the other 3 pages.
- Application elements - Elements are styled with muted, earthy colors. Content is contained in cards with good color balance.
- Application text - Text is styled according to function (header, subheader, body text, etc). 2 fonts.
- Application images - Found on the "View Progress", "Beta Spray", and "About" Pages.

## JS Deliverable:

For this deliverable, I added the Javascript necessary to the site fully functional.

- Simon and Startup app Javascript is deployed to production environment.
- User input at login is stored in local storage and displayed throughout all web pages.
- User data is stored in local storage. Updates to user information are made possible by getting (parsing) and setting (stringifying) data from local storage.
- Code for future chat is still in progress, but incorporates setTimeout functions
- Training plans can be completed and submitted, which updates progress and the current daily workout on the front-end.

## Service Deliverable:

For this deliverable, I converted my application into an HTTP web service using Node.js and Express. My frontend and backend are managed by these technologies.

- Node.js/Express HTTP service - Complete!
- Static Middleware for frontend - Accomplished through built-in middleware functions `app.use(express.static('public'));`
- Calls to third-party endpoints - I added an inspirational quote to the progress.html page, which calls the quotable.io api.
- Backend service endpoint- Endpoint for getting workouts and getting/updating/deleting user info from the server. Workouts are stored there, in place of a database (Hard-coded for now). Currently, the frontend only calls the get workouts endpoint.
- Frontend calls service endpoint - Accomplished in the train.html page to generate workouts based on user's current progress.

## Database Deliverable:

For this deliverable I created a database in MongoDB which is used to store and retrieve data.

- MongoDB Atlas Database created - done!
- Endpoints for data - Endpoints for workout and entry getting/setting are being used by application.
- Stores data in MongoDB - done!
