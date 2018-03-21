// import used components
import Edit from '../components/Profile/edit.jsx';
import Profile from '../components/Profile/sellerProfile.jsx';
import SignUp from '../components/Auth/Signup.jsx';
import Login from '../components/Auth/Login.jsx';
import Home from '../components/Feed/homePostList.jsx';
import SellingList from '../components/Feed/sellersPostList.jsx';
import WatchingList from '../components/Feed/watchingPostList.jsx';
import BarteringList from '../components/Feed/barteringsPostList.jsx';
import ListingList from '../components/Feed/listingPostList.jsx';
import FollowingList from '../components/Following/index.jsx';

const Rt = {};
Rt.appRoutes = [
  {
    path: '/home',
    sidebarName: 'Home',
    navbarName: 'Home',
    component: Home,
  },

  {
    path: '/profile',
    sidebarName: 'Profile',
    navbarName: 'Profile',
    component: Profile,
  },
  {
    path: '/post',
    sidebarName: 'List',
    navbarName: 'List',
    component: Home,
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
    component: SignUp,
  },
  {
    path: '/*',
    sidebarName: 'Login',
    navbarName: 'Login',
    component: Login,
  },
];

Rt.profileRoutes = [
  {
    path: '/profile/following',
    sidebarName: 'Following',
    navbarName: 'Following',
    component: FollowingList,
  },
  {
    path: '/profile/watchlist',
    sidebarName: 'Watchlist',
    navbarName: 'Watchlist',
    component: WatchingList,
  },
  {
    path: '/profile/bartering',
    sidebarName: 'Bartering',
    navbarName: 'Bartering',
    component: BarteringList,
  },
  {
    path: '/profile/selling',
    sidebarName: 'Selling',
    navbarName: 'Selling',
    component: SellingList,
  },
];

export default Rt;
