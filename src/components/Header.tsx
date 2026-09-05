import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Search, User, Heart, ShoppingCart, Target, X, LogOut, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import { useFavorites } from '../context/FavoritesContext';

const headerT = {
  uk: {
    location: "Наша локація місцезнаходження",
    shipping: "Доставка і оплата",
    contacts: "Контакти",
    search: "Пошук по сайту...",
    cabinet: "Кабінет",
    login: "Увійти",
    logout: "Вийти",
    favorites: "Бажане",
    cart: "Кошик",
    home: "Головна",
    equipment: "Спорядження",
    about: "Про Нас",
    blog: "Блог",
    authLogin: "Вхід",
    authRegister: "Реєстрація",
    name: "Ваше ім'я",
    nickname: "Нікнейм (admin для адмін прав)",
    password: "Пароль (123456 для адмін)",
    registerBtn: "Зареєструватися",
    emptyFavs: "Список порожній.",
    successLogin: "Успішний вхід!",
    successReg: "Успішна реєстрація!",
    errorData: "Помилка! Перевірте дані."
  },
  en: {
    location: "Our Location",
    shipping: "Shipping & Payment",
    contacts: "Contacts",
    search: "Search site...",
    cabinet: "Dashboard",
    login: "Login",
    logout: "Logout",
    favorites: "Favorites",
    cart: "Cart",
    home: "Home",
    equipment: "Equipment",
    about: "About Us",
    blog: "Blog",
    authLogin: "Login",
    authRegister: "Register",
    name: "Your Name",
    nickname: "Nickname (admin for privileges)",
    password: "Password (123456 for admin)",
    registerBtn: "Register",
    emptyFavs: "List is empty.",
    successLogin: "Login successful!",
    successReg: "Registration successful!",
    errorData: "Error! Check your details."
  }
};

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, login, register, logout } = useAuth();
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  
  const [activeModal, setActiveModal] = useState<'login' | 'favorites' | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { favorites } = useFavorites();

  const t = headerT[lang];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    let success = false;
    if (authMode === 'login') {
      success = login(data.nickname as string, data.password as string);
    } else {
      success = register(data.name as string, data.nickname as string, data.password as string);
    }

    if (success) {
      toast.success(authMode === 'login' ? t.successLogin : t.successReg);
      setActiveModal(null);
    } else {
      toast.error(t.errorData);
    }
  };

  const handleCabinetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      navigate('/dashboard');
    } else {
      setActiveModal('login');
    }
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-links">
            <Link to="/contact"><Phone size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }}/> +38 (000) 000-00-00</Link>
            <Link to="/contact"><Mail size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }}/> info@tabletennis.com.ua</Link>
          </div>
          <div className="top-bar-links">
            <Link to="/contact"><MapPin size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }}/> {t.location}</Link>
            <Link to="/shipping">{t.shipping}</Link>
            <Link to="/contact">{t.contacts}</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header-main">
        <div className="container header-content">
          <Link to="/" className="logo">
            Table<span>Tennis</span>
          </Link>

          <div className="search-container">
            <input type="text" className="search-input" placeholder={t.search} />
            <button className="search-btn"><Search size={20} /></button>
          </div>

          <div className="header-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginRight: '15px' }}>
              <button onClick={() => setLang('uk')} style={{ background: lang === 'uk' ? 'var(--color-primary)' : 'transparent', color: lang === 'uk' ? 'white' : 'inherit', border: '1px solid #d1d5db', borderRadius: '4px', padding: '2px 6px', fontSize: '12px', cursor: 'pointer' }}>UK</button>
              <button onClick={() => setLang('en')} style={{ background: lang === 'en' ? 'var(--color-primary)' : 'transparent', color: lang === 'en' ? 'white' : 'inherit', border: '1px solid #d1d5db', borderRadius: '4px', padding: '2px 6px', fontSize: '12px', cursor: 'pointer' }}>EN</button>
            </div>

            <button className="action-item" onClick={handleCabinetClick} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <User size={24} />
              <span>{user ? user.nickname : t.login}</span>
            </button>
            
            {user && (
              <button className="action-item" onClick={() => logout()} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                <LogOut size={24} />
                <span>{t.logout}</span>
              </button>
            )}

            <button className="action-item" onClick={() => setActiveModal('favorites')} style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <Heart size={24} />
              <span>{t.favorites}</span>
              {favorites.length > 0 && (
                <span style={{ position: 'absolute', top: '-5px', right: '10px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                  {favorites.length}
                </span>
              )}
            </button>
            <button className="action-item" onClick={() => setIsCartOpen(true)} style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <ShoppingCart size={24} />
              <span>{t.cart}</span>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-5px', right: '10px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <div className="container nav-content">
          <Link to="/" className="nav-item">{t.home}</Link>
          <Link to="/equipment" className="nav-item">{t.equipment}</Link>
          <Link to="/about" className="nav-item">{t.about}</Link>
          <Link to="/blog" className="nav-item">{t.blog}</Link>
        </div>
      </nav>

      {/* MODALS */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}><X size={24} /></button>
            
            {activeModal === 'login' && (
              <div className="modal-body">
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '2px solid #f3f4f6' }}>
                  <button onClick={() => setAuthMode('login')} style={{ background: 'none', border: 'none', padding: '10px 0', fontSize: '16px', fontWeight: 'bold', color: authMode === 'login' ? 'var(--color-primary)' : '#9ca3af', borderBottom: authMode === 'login' ? '2px solid var(--color-primary)' : 'none', cursor: 'pointer' }}>{t.authLogin}</button>
                  <button onClick={() => setAuthMode('register')} style={{ background: 'none', border: 'none', padding: '10px 0', fontSize: '16px', fontWeight: 'bold', color: authMode === 'register' ? 'var(--color-primary)' : '#9ca3af', borderBottom: authMode === 'register' ? '2px solid var(--color-primary)' : 'none', cursor: 'pointer' }}>{t.authRegister}</button>
                </div>
                
                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {authMode === 'register' && (
                    <input type="text" name="name" placeholder={t.name} required className="modal-input" />
                  )}
                  <input type="text" name="nickname" placeholder={t.nickname} defaultValue={authMode === 'login' ? 'admin' : ''} required className="modal-input" />
                  <input type="password" name="password" placeholder={t.password} defaultValue={authMode === 'login' ? '123456' : ''} required className="modal-input" />
                  <button type="submit" className="btn-cta" style={{width: '100%', marginTop: '10px'}}>
                    {authMode === 'login' ? t.authLogin : t.registerBtn}
                  </button>
                </form>
              </div>
            )}

            {activeModal === 'favorites' && (
              <div className="modal-body">
                <h2>{t.favorites}</h2>
                <div className="modal-list">
                  {favorites.length === 0 ? <p>{t.emptyFavs}</p> : favorites.map((fav, i) => (
                    <div key={i} className="modal-list-item">
                      <Target size={24} />
                      <span>{fav.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
