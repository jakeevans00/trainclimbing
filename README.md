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

For this deliverable, I styled the basic application using only custom CSS (slower, but a great learning exoerience).

- Header, Footer, Sidebar, & Main Content Areas
- Navigation elements - Sidebar links are styled according to state (active vs passive). Other links are either displayed as buttons. Most links have associated hover effects.
- Responsive - Header, footer, and main content shrinks and responds well to screen resizing. Sidebar collapses for media that is < 768px wide. Collapsing is toggle-able only on the daily workout page, since it relies on an id selector. However, if the app becomes single-page in the future, this functionality will extend to the other 3 pages.
- Application elements - Elements are styled with muted, earthy colors. Content is contained in cards with good color balance.
- Application text - Text is styled according to function (header, subheader, body text, etc). 2 fonts.
- Application images - Found on the "View Progress", "Beta Spray", and "About" Pages.
