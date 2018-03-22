// import used components
import React, { Component } from 'react';
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
import AddPost from '../components/Post/addPost.jsx';
import SinglePost from '../components/Post/index.jsx';
import jwtDecode from 'jwt-decode';
import Protected from '../routes/protect.jsx';

const Rt = {};
Rt.appRoutes = [
  {
    path: '/home',
    sidebarName: 'Home',
    navbarName: 'Home',
    component: Home,
    protected: false,
  },
  {
    path: '/profile',
    sidebarName: 'Profile',
    navbarName: 'Profile',
    component: Profile,
    protected: true,
  },
  {
    path: '/post/:id',
    sidebarName: 'Login',
    navbarName: 'Login',
    component: SinglePost,
    protected: false,
  },
  {
    path: '/post',
    sidebarName: 'List',
    navbarName: 'List',
    component: AddPost,
    protected: false,
  },
  {
    path: '/edit',
    sidebarName: 'Edit',
    navbarName: 'Edit',
    component: Edit,
    protected: true,
  },
  {
    path: '/signup',
    sidebarName: 'Login',
    navbarName: 'Login',
    component: SignUp,
    protected: false,
  },
  {
    path: '/login',
    sidebarName: 'Login',
    navbarName: 'Login',
    component: Login,
    protected: false,
  },
  {
    path: '*',
    component: Home,
    protected: false,
  },
];

Rt.profileRoutes = [
  {
    path: '/profile/following',
    sidebarName: 'Following',
    navbarName: 'Following',
    component: FollowingList,
    protected: true,
  },
  {
    path: '/profile/watchlist',
    sidebarName: 'Watchlist',
    navbarName: 'Watchlist',
    component: WatchingList,
    protected: true,
  },
  {
    path: '/profile/bartering',
    sidebarName: 'Bartering',
    navbarName: 'Bartering',
    component: BarteringList,
    protected: true,
  },
  {
    path: '/profile/selling',
    sidebarName: 'Selling',
    navbarName: 'Selling',
    component: SellingList,
    protected: true,
  },
];

export default Rt;
