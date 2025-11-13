# CSE Portal - Department Management System

A comprehensive web-based portal for the Computer Science and Engineering Department at Jagannath University. This system provides classroom/lab booking, notice management, event organization, and gallery features with Firebase authentication.

## Live Links

- **Frontend**: https://jnucse-portal.netlify.app/
- **Backend**: https://cse-portal-server.vercel.app/

## Core Features

### Authentication & Authorization
- Firebase Google authentication
- Private route protection for authenticated users
- Public access to Home page only
- Protected routes: About, Classroom, Lab, Faculty, Events, Gallery, Contact, Notices, Dashboard

### Classroom & Lab Booking System
- Real-time classroom and lab availability
- Booking form with date, time, purpose, and attendees
- Teacher recommendation requirement (mandatory)
- Visual room/lab previews with images
- User-specific booking history
- Booking status tracking (pending/approved/rejected)

### Notice Board Management
- Create, update, and delete notices
- Category-based filtering (Academic, Exam, Event, Important, General)
- Latest notices on home page
- Detailed notice view with images
- Admin panel for notice management

### Events Management
- Add new events with comprehensive details
- Event registration form with fields:
  - Title, Type, Date, Time
  - Location, Organizer
  - Capacity, Registration deadline
  - Description
- Automatic separation of upcoming and past events
- Event categorization (Workshop, Seminar, Competition, Festival, Training, Conference, Field Trip)

### User Dashboard
- Real-time display of user's classroom bookings
- Real-time display of user's lab bookings
- Latest 3 notices feed
- Total booking count
- Route-aware data refreshing

### Photo Gallery
- Category-based photo organization
- Upload new photos with title, description, category
- Filter by categories (Events, Workshops, Seminars, Campus, Sports, Cultural, All)
- Modern card-based layout with hover effects

### Additional Features
- Responsive design for all devices
- Modern UI with TailwindCSS
- Toast notifications for user feedback
- Loading states and error handling
- Contact form with university information
- Faculty directory
- Custom loading animation

## Tech Stack

### Frontend
- React 19.1.1
- Vite (Build tool)
- React Router DOM (Routing)
- Tailwind CSS (Styling)
- Firebase (Authentication)
- React Toastify (Notifications)
- React Icons

### Backend
- Node.js with Express
- MongoDB (Database)
- CORS enabled
- ES Modules
- Serverless deployment (Vercel)

## Database Collections

- **notices** - Notice board posts
- **classroom-bookings** - Classroom reservations
- **lab-bookings** - Laboratory reservations
- **gallery** - Photo gallery items
- **events** - Event information
- **user-dashboard** - User activity data

## API Endpoints

### Notices
- GET /api/notices - Get all notices
- GET /api/notices/latest - Get latest 3 notices
- GET /api/notices/:id - Get single notice
- POST /api/notices - Create new notice
- PUT /api/notices/:id - Update notice
- DELETE /api/notices/:id - Delete notice

### Classroom Bookings
- GET /api/classroom-bookings - Get all bookings
- GET /api/classroom-bookings/user/:email - Get user bookings
- POST /api/classroom-bookings - Create booking
- PUT /api/classroom-bookings/:id - Update booking
- DELETE /api/classroom-bookings/:id - Delete booking

### Lab Bookings
- GET /api/lab-bookings - Get all bookings
- GET /api/lab-bookings/user/:email - Get user bookings
- POST /api/lab-bookings - Create booking
- PUT /api/lab-bookings/:id - Update booking
- DELETE /api/lab-bookings/:id - Delete booking

### Events
- GET /api/events - Get all events
- GET /api/events/:id - Get single event
- POST /api/events - Create event
- PUT /api/events/:id - Update event
- DELETE /api/events/:id - Delete event

### Gallery
- GET /api/gallery - Get all photos
- GET /api/gallery/category/:category - Get photos by category
- POST /api/gallery - Add new photo
- DELETE /api/gallery/:id - Delete photo

### Dashboard
- GET /api/user-dashboard/:email - Get user's all bookings

## Installation & Setup

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Environment Variables

#### Frontend (.env)
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Backend (.env)
```
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
PORT=5000
```

## Deployment

### Frontend (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects configured in `public/_redirects`

### Backend (Vercel)
- Serverless deployment
- MongoDB connection caching
- Environment variables configured in Vercel dashboard

## Project Structure

```
CSEJnU_Client/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── router/
│   │   ├── config/
│   │   └── styles/
│   ├── public/
│   └── package.json
├── backend/
│   ├── index.js
│   ├── vercel.json
│   └── package.json
└── README.md
```

## Key Functionalities

1. User authentication with Google
2. Role-based access control
3. Real-time booking management
4. Dynamic notice board
5. Event registration system
6. Photo gallery with categories
7. Responsive dashboard
8. MongoDB integration
9. RESTful API architecture
10. Serverless backend deployment

## Developer

Department of Computer Science and Engineering
Jagannath University, Dhaka, Bangladesh

### Pages
- **Home**: Hero section, features, statistics, and latest updates
- **About**: Department mission, vision, and core values
- **Classrooms**: Information about available classrooms
- **Labs**: Details of computer labs and facilities
- **Faculty**: Faculty members directory
- **Events**: Upcoming and past events
- **Gallery**: Image gallery with category filters
- **Contact**: Contact form and department information
- **Student Login**: Student portal access
- **Admin**: Administrative panel (restricted access)

## Customization

### Colors
The project uses a purple-indigo color scheme. To customize:
- Edit Tailwind classes in components
- Modify `tailwind.config.js` for global theme changes

### Content
Update the content in each page component located in `src/pages/`

## Future Enhancements

- Backend integration for authentication
- Database connectivity
- Real-time event management
- Student dashboard features
- Faculty management system
- Online assignment submission
- Grade management
- Calendar integration
- Real image gallery
- News & announcements system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is created for educational purposes.

## Contact

For any queries, contact: cse@jnu.ac.bd

---

Designed & Developed with ❤️ by CSE Students

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
