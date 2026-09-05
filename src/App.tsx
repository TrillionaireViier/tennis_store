import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LangProvider } from './context/LangContext';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Equipment from './pages/Equipment';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import Shipping from './pages/Shipping';
import Contact from './pages/Contact';
import Success from './pages/Success';
import CartModal from './components/CartModal';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-center" />
          <BrowserRouter>
            <CartModal />
            <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/dashboard/*" element={<UserDashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<Success />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
    </LangProvider>
  );
}

export default App;
