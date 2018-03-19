// import used components
import Edit from '../components/Profile/edit.jsx';
import Profile from '../components/Profile/index.jsx';

const appRoutes = [
  {
    path: '/home',
    sidebarName: 'Home',
    navbarName: 'Home',
    component: Edit,
  },
  {
    path: '/profile',
    sidebarName: 'Profile',
    navbarName: 'Profile',
    component: Profile,
  },
  {
    path: '/selling',
    sidebarName: 'Selling',
    navbarName: 'Selling',
    component: Edit,
  },
  {
    path: '/bartering',
    sidebarName: 'Bartering',
    navbarName: 'Bartering',
    component: Edit,
  },
  {
    path: '/watchlist',
    sidebarName: 'Watchlist',
    navbarName: 'Watchlist',
    component: Edit,
  },
  {
    path: '/following',
    sidebarName: 'Following',
    navbarName: 'Following',
    component: Edit,
  },
  {
    path: '/list',
    sidebarName: 'List',
    navbarName: 'List',
    component: Edit,
  },
  {
    path: '/edit',
    sidebarName: 'Edit',
    navbarName: 'Edit',
    component: Edit,
  },
  {
    path: '/signup',
    sidebarName: 'Login',
    navbarName: 'Login',
    component: Edit,
  },
  {
    path: '/login',
    sidebarName: 'Login',
    navbarName: 'Login',
    component: Edit,
  },
  {
    redirect: true,
    path: '/',
    to: '/home',
    navbarName: 'Redirect',
  },
];

export default appRoutes;
