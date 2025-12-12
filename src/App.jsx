

import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';


import { Routes, Route, useLocation } from 'react-router'
import Page404 from './Page404';
import { AuthProvider } from './Contexts/AuthContext';
import HomePage from './HomePage';
import Login from './Login'
import Register from './Register';
import AboutUs from './AboutUs';

import ContactUs from './ContactUs';
import Vacancies from './Vacancies';
import FAQs from './FAQs';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import UserProfile from './UserProfile';
import ArticlesList from './ArticleComponents/ArticlesList';
import ShowArticle from './ArticleComponents/ShowArticle';
import EditArticle from './ArticleComponents/EditArticle';
import Dashboard from './Dashboard';
import CategoriesList from './DashboardComponents/CategoriesList'
import TestimonialsList from './DashboardComponents/TestimonialsList';
import UsersList from './DashboardComponents/UsersList';
import EditUser from './EditUser';

function App() {

  const location = useLocation()

  return (
    <>
      <AuthProvider>
        <NavBar currentPage={location.pathname} />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<Register />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path='vacancies' element={<Vacancies />} />
          <Route path="users/edit/:uid" element={<EditUser />} />
          <Route path="articlesList" element={<ArticlesList currentPage={location.pathname} />} />
          <Route path='articles/:aid' element={<ShowArticle />} />
          <Route path='users/:uid' element={<UserProfile />} />
          <Route path='articles/edit/:aid' element={<EditArticle />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="*" element={<Page404 />} />
          <Route path='dashboard' element={<Dashboard currentPage={location.pathname} />}>
            <Route path='articlesList' element={<ArticlesList currentPage={location.pathname}/>} />
            <Route path='categoriesList' element={<CategoriesList />} />
            <Route path='testimonialsList' element={<TestimonialsList />} />
            <Route path='usersList' element={<UsersList />} />
          </Route>
        </Routes>
        {location.pathname !== '/login' && !location.pathname.includes('/dashboard') && <Footer />}
      </AuthProvider>
    </>
  )
}

export default App
