import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import About from '../pages/About';
import Classroom from '../pages/Classroom';
import Lab from '../pages/Lab';
import Faculty from '../pages/Faculty';
import Events from '../pages/Events';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import StudentLogin from '../pages/StudentLogin';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Booking from '../pages/Booking';
import Notices from '../pages/Notices';
import ManageNotices from '../pages/ManageNotices';
import NoticeDetails from '../pages/NoticeDetails';

const routes = [
    {
        path: '/',
        element: Layout,
        children: [
            { path: '/', component: Home, isPrivate: false }, // Public - Home page
            { path: '/about', component: About, isPrivate: true },
            { path: '/classroom', component: Classroom, isPrivate: true },
            { path: '/lab', component: Lab, isPrivate: true },
            { path: '/faculty', component: Faculty, isPrivate: true },
            { path: '/events', component: Events, isPrivate: true },
            { path: '/gallery', component: Gallery, isPrivate: true },
            { path: '/contact', component: Contact, isPrivate: true },
            { path: '/notices', component: Notices, isPrivate: true },
            { path: '/notice/:id', component: NoticeDetails, isPrivate: true },
            { path: '/manage-notices', component: ManageNotices, isPrivate: true },
            { path: '/booking', component: Booking, isPrivate: true },
            { path: '/dashboard', component: Dashboard, isPrivate: true },
        ]
    },
    // Routes without Layout (no navbar/footer)
    { path: '/student-login', component: StudentLogin },
    { path: '/StudentLogin', component: StudentLogin },
    { path: '/register', component: Register },
    { path: '/Register', component: Register },
    { path: '/admin', component: Admin },
];

const AppRouter = () => {
    return (
        <Routes>
            {routes.map((route, index) => {
                if (route.children) {
                    return (
                        <Route key={index} path={route.path} element={<route.element />}>
                            {route.children.map((child, childIndex) => (
                                <Route 
                                    key={childIndex} 
                                    path={child.path} 
                                    element={
                                        child.isPrivate ? (
                                            <PrivateRoute>
                                                <child.component />
                                            </PrivateRoute>
                                        ) : (
                                            <child.component />
                                        )
                                    } 
                                />
                            ))}
                        </Route>
                    );
                }
                return (
                    <Route 
                        key={index} 
                        path={route.path} 
                        element={<route.component />} 
                    />
                );
            })}
        </Routes>
    );
};

export default AppRouter;
