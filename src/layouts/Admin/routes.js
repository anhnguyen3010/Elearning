//icons
import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Person from "@material-ui/icons/Person";
//components
import DashboardComponent from '../../components/Dashboard'
import AdminUser from '../../pages/AdminUsers'
import AdminCourses from '../../pages/AdminCourses'

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: DashboardComponent,
        layout: "/admin",
    },
    {
        path: "/user",
        name: "User Managenment",
        icon: Person,
        component: AdminUser,
        layout: "/admin",
    },
    {
        path: "/course",
        name: "Course Manegenment",
        icon: LibraryBooks,
        component: AdminCourses,
        layout: "/admin",
    },
]
export default dashboardRoutes