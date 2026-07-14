// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import VerifyEmail from './pages/VerifyEmail';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import HomeFeed from './pages/HomeFeed';
// import Profile from './pages/Profile';
// import EditProfile from './pages/EditProfile';
// import CreateBlog from './pages/CreateBlog';
// import LandingPage from './pages/LandingPage';
// import FeaturesPage from './pages/FeaturesPage';
// import AboutPage from './pages/AboutPage';
// import './styles/variables.css';
// import ChangePassword from './pages/ChangePassword';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/features" element={<FeaturesPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/Home-Feed" element={<HomeFeed />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/change-password" element={<ChangePassword />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/edit-profile" element={<EditProfile />} />
//         <Route path="/create" element={<CreateBlog />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import HomeFeed from './pages/HomeFeed';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import CreateBlog from './pages/CreateBlog';
import Bookmarks from './pages/Bookmarks';
import LandingPage from './pages/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import './styles/variables.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/Home-Feed" element={<HomeFeed />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;