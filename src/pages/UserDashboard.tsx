import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { User, Heart, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';

const t = {
  uk: {
    profile: "Профіль",
    myBookings: "Мої бронювання",
    favorites: "Бажане",
    userProfile: "Профіль Користувача",
    personalData: "Особисті дані",
    name: "Ім'я",
    phone: "Телефон",
    saveChanges: "Зберегти зміни",
    tableVIP: "Стіл №4 (VIP)",
    tableStd: "Стіл №1 (Стандарт)",
    august: "Серпня",
    confirmed: "Підтверджено",
    pending: "В очікуванні",
    racket: "Ракетка Butterfly Timo Boll",
    shoes: "Кросівки Mizuno Wave",
    addToCart: "В кошик"
  },
  en: {
    profile: "Profile",
    myBookings: "My Bookings",
    favorites: "Favorites",
    userProfile: "User Profile",
    personalData: "Personal Data",
    name: "Name",
    phone: "Phone",
    saveChanges: "Save Changes",
    tableVIP: "Table #4 (VIP)",
    tableStd: "Table #1 (Standard)",
    august: "August",
    confirmed: "Confirmed",
    pending: "Pending",
    racket: "Butterfly Timo Boll Racket",
    shoes: "Mizuno Wave Shoes",
    addToCart: "Add to Cart"
  }
};

export default function UserDashboard() {
  const location = useLocation();
  const { user } = useAuth();
  const { lang } = useLang();

  const text = t[lang];

  return (
    <HelmetProvider>
      <Helmet>
        <title>My Dashboard | Table Tennis Store</title>
      </Helmet>

      <main className="container" style={{ display: 'flex', gap: '30px', marginTop: '40px', minHeight: '60vh', paddingBottom: '60px' }}>
        {/* Sidebar Navigation */}
        <aside style={{ width: '250px' }}>
          <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '32px' }}>
                <User />
              </div>
              <h3 style={{ margin: 0 }}>{user?.nickname || 'Guest'}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '5px 0 0' }}>user@example.com</p>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/dashboard" style={{ padding: '10px', borderRadius: '8px', background: location.pathname === '/dashboard' ? 'var(--color-primary)' : 'transparent', color: location.pathname === '/dashboard' ? 'white' : '#4b5563', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={18} /> {text.profile}
              </Link>
              <Link to="/dashboard/bookings" style={{ padding: '10px', borderRadius: '8px', background: location.pathname === '/dashboard/bookings' ? 'var(--color-primary)' : 'transparent', color: location.pathname === '/dashboard/bookings' ? 'white' : '#4b5563', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={18} /> {text.myBookings}
              </Link>
              <Link to="/dashboard/favorites" style={{ padding: '10px', borderRadius: '8px', background: location.pathname === '/dashboard/favorites' ? 'var(--color-primary)' : 'transparent', color: location.pathname === '/dashboard/favorites' ? 'white' : '#4b5563', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Heart size={18} /> {text.favorites}
              </Link>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="" element={
              <>
                <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>{text.userProfile}</h1>
                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '30px' }}>
                  <h2 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>{text.personalData}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#6b7280' }}>{text.name}</label>
                      <input type="text" defaultValue={user?.nickname || "John Doe"} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#6b7280' }}>Email</label>
                      <input type="email" defaultValue="user@example.com" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#6b7280' }}>{text.phone}</label>
                      <input type="text" defaultValue="+380991234567" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                    </div>
                  </div>
                  <button className="btn-cta" style={{ marginTop: '20px' }}>{text.saveChanges}</button>
                </div>
              </>
            } />
            <Route path="bookings" element={
              <>
                <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>{text.myBookings}</h1>
                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '30px' }}>
                  <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0' }}>{text.tableVIP}</h3>
                      <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>25 {text.august} 2026, 18:00 - 20:00</p>
                    </div>
                    <span style={{ padding: '5px 10px', background: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{text.confirmed}</span>
                  </div>
                  <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0' }}>{text.tableStd}</h3>
                      <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>28 {text.august} 2026, 10:00 - 11:30</p>
                    </div>
                    <span style={{ padding: '5px 10px', background: '#fef9c3', color: '#854d0e', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{text.pending}</span>
                  </div>
                </div>
              </>
            } />
            <Route path="favorites" element={
              <>
                <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>{text.favorites}</h1>
                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', display: 'flex', gap: '15px' }}>
                    <div style={{ width: '80px', height: '80px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏓</div>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{text.racket}</h4>
                      <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', margin: '0 0 10px 0' }}>4 500 ₴</p>
                      <button style={{ padding: '5px 10px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>{text.addToCart}</button>
                    </div>
                  </div>
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', display: 'flex', gap: '15px' }}>
                    <div style={{ width: '80px', height: '80px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👟</div>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{text.shoes}</h4>
                      <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', margin: '0 0 10px 0' }}>3 200 ₴</p>
                      <button style={{ padding: '5px 10px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>{text.addToCart}</button>
                    </div>
                  </div>
                </div>
              </>
            } />
          </Routes>
        </div>
      </main>
    </HelmetProvider>
  );
}
