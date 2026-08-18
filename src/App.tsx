import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Phone, Mail, MapPin, Search, User, Heart, ShoppingCart, Target, Users, Trophy, Activity, Dumbbell, ShieldCheck, Clock, Map, X } from 'lucide-react';

// Map icon names from DB to actual components
const IconMap: Record<string, any> = {
  Target, Users, Dumbbell, Trophy, Activity, ShieldCheck
};

interface Category {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface SEOData {
  title: string;
  description: string;
}

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [seo, setSeo] = useState<SEOData>({
    title: "Table Tennis Store",
    description: "Настільний теніс"
  });

  // Modal States
  const [activeModal, setActiveModal] = useState<'login' | 'favorites' | 'cart' | null>(null);

  // Data States
  const [favorites, setFavorites] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from PHP Backend
    fetch('/api/products.php')
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          setCategories(json.data);
          setSeo(json.seo);
        }
      })
      .catch(err => console.error("PHP Backend is not running:", err));
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/auth.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email: 'admin@test.com', password: '123456' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setToken(data.token);
        alert('Успішна авторизація!');
        setActiveModal(null);
      } else {
        alert(data.message);
      }
    })
    .catch(err => alert("Помилка запиту до PHP"));
  };

  const loadFavorites = () => {
    fetch('/api/favorites.php?action=list', {
      headers: { 'Authorization': `Bearer ${token || 'mock_jwt_token_8829910'}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.favorites) setFavorites(data.favorites);
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    if (activeModal === 'favorites') {
      loadFavorites();
    }
  }, [activeModal]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      {/* Top Contact Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-links">
            <a href="#"><Phone size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }}/> +38 (000) 000-00-00</a>
            <a href="#"><Mail size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }}/> info@tabletennis.com.ua</a>
          </div>
          <div className="top-bar-links">
            <a href="#"><MapPin size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }}/> Наші зали</a>
            <a href="#">Доставка і оплата</a>
            <a href="#">Контакти</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header-main">
        <div className="container header-content">
          <a href="#" className="logo">
            Table<span>Tennis</span>
          </a>

          <div className="search-container">
            <input type="text" className="search-input" placeholder="Пошук по сайту..." />
            <button className="search-btn"><Search size={20} /></button>
          </div>

          <div className="header-actions">
            <button className="action-item" onClick={() => setActiveModal('login')}>
              <User size={24} />
              <span>Кабінет</span>
            </button>
            <button className="action-item" onClick={() => setActiveModal('favorites')}>
              <Heart size={24} />
              <span>Бажане</span>
            </button>
            <button className="action-item" onClick={() => setActiveModal('cart')}>
              <ShoppingCart size={24} />
              <span>Кошик</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <div className="container nav-content">
          <a href="#" className="nav-item">Головна</a>
          <a href="#" className="nav-item active">Послуги</a>
          <a href="#" className="nav-item">Оренда Столів</a>
          <a href="#" className="nav-item">Турніри</a>
          <a href="#" className="nav-item">Тренування</a>
          <a href="#" className="nav-item">Про Нас</a>
          <a href="#" className="nav-item">Блог</a>
        </div>
      </nav>

      <main className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-banner">
            <h1 className="hero-title">ПРОФЕСІЙНИЙ НАСТІЛЬНИЙ ТЕНІС</h1>
            <p className="hero-subtitle">Найкращі зали, професійні тренери та регулярні турніри для гравців будь-якого рівня.</p>
            <button className="btn-cta">Забронювати стіл</button>
          </div>
        </section>

        {/* Categories / Services Grid */}
        <section className="categories-section">
          <h2 className="section-title">Наші Послуги</h2>
          <div className="categories-grid">
            {categories.map(cat => {
              const IconComponent = IconMap[cat.icon] || Target;
              return (
                <a href="#" className="category-card" key={cat.id}>
                  <div className="category-icon">
                    <IconComponent size={40} />
                  </div>
                  <h3 className="category-title">{cat.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cat.description}</p>
                </a>
              )
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h4>Про Нас</h4>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6' }}>
                TableTennis - це сучасні зали для настільного тенісу, професійне обладнання та команда майстрів спорту. Ми розвиваємо теніс в Україні.
              </p>
            </div>
            
            <div className="footer-column">
              <h4>Клієнтам</h4>
              <div className="footer-links">
                <a href="#">Оренда столів</a>
                <a href="#">Розклад турнірів</a>
                <a href="#">Тренери</a>
                <a href="#">Ремонт інвентарю</a>
                <a href="#">Правила клубу</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Контакти</h4>
              <div className="footer-contact-item">
                <Phone size={18} color="var(--color-secondary)" />
                <span>+38 (000) 000-00-00</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={18} color="var(--color-secondary)" />
                <span>info@tabletennis.com.ua</span>
              </div>
              <div className="footer-contact-item">
                <Map size={18} color="var(--color-secondary)" />
                <span>м. Київ, вул. Спортивна, 1</span>
              </div>
              <div className="footer-contact-item">
                <Clock size={18} color="var(--color-secondary)" />
                <span>Пн-Нд: 09:00 - 22:00</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} TableTennis Store. Всі права захищені.
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}><X size={24} /></button>
            
            {activeModal === 'login' && (
              <div className="modal-body">
                <h2>Особистий Кабінет</h2>
                <form onSubmit={handleLoginSubmit}>
                  <input type="email" placeholder="Email" defaultValue="admin@test.com" className="modal-input" />
                  <input type="password" placeholder="Пароль" defaultValue="123456" className="modal-input" />
                  <button type="submit" className="btn-cta" style={{width: '100%'}}>Увійти</button>
                </form>
              </div>
            )}

            {activeModal === 'favorites' && (
              <div className="modal-body">
                <h2>Ваше Бажане</h2>
                <div className="modal-list">
                  {favorites.length === 0 ? <p>Список порожній.</p> : favorites.map((fav, i) => (
                    <div key={i} className="modal-list-item">
                      <Target size={24} />
                      <span>{fav.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'cart' && (
              <div className="modal-body">
                <h2>Кошик</h2>
                <p>Ваш кошик наразі порожній.</p>
                <button className="btn-cta" style={{width: '100%', marginTop: '20px'}} onClick={() => setActiveModal(null)}>Продовжити покупки</button>
              </div>
            )}
          </div>
        </div>
      )}
    </HelmetProvider>
  );
}

export default App;
