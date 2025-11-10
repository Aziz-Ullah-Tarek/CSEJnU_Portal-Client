# CSEJNU Client - Department Management Website

A modern, responsive department management website for the Computer Science and Engineering Department at Jagannath University.

## Features

- **🎬 Custom Loading Animation**: Eye-catching CSEJNU letter animation on first load
- **📱 Fully Responsive**: Works seamlessly on all devices (mobile, tablet, desktop)
- **🎨 Modern UI**: Built with Tailwind CSS and DaisyUI components
- **🧭 Easy Navigation**: Persistent navbar and footer across all pages
- **📚 Multiple Sections**:
  - Home
  - About
  - Classrooms
  - Laboratories
  - Faculty
  - Events
  - Gallery
  - Contact
  - Student Login Portal
  - Admin Panel

## Tech Stack

- **React** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **Vite** - Build tool and dev server

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CSEJnU_Client
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Project Structure

```
CSEJnU_Client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navber.jsx
│   │   ├── Layout.jsx
│   │   ├── LoadingAnimation.jsx
│   │   └── LoadingAnimation.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Classroom.jsx
│   │   ├── Lab.jsx
│   │   ├── Faculty.jsx
│   │   ├── Events.jsx
│   │   ├── Gallery.jsx
│   │   ├── Contact.jsx
│   │   ├── StudentLogin.jsx
│   │   └── Admin.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## Features Details

### Loading Animation
- Shows "C-S-E-J-N-U" letters appearing one by one
- 'U' expands to fill the screen before fading
- Only shows once per session

### Navigation
- Responsive navbar with mobile menu
- Quick links to all major sections
- Student Login and Admin Panel access

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
