import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Phone, Mail, MapPin, Search, User, Heart, ShoppingCart, Target, Users, Trophy, Activity, Dumbbell, ShieldCheck } from 'lucide-react';

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

  useEffect(() => {
    // Fetch data from PHP Backend (routed via Vercel Serverless or Vite Proxy)
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

  return (
    <HelmetProvider>
      {/* SEO META TAGS */}
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
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
            <a href="#" className="action-item">
              <User size={24} />
              <span>Кабінет</span>
            </a>
            <a href="#" className="action-item">
              <Heart size={24} />
              <span>Бажане</span>
            </a>
            <a href="#" className="action-item">
              <ShoppingCart size={24} />
              <span>Кошик</span>
            </a>
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
          <h2 className="section-title">Наші Послуги (Завантажено з PHP)</h2>
          <div className="categories-grid">
            
            {categories.length === 0 ? (
              <p>Завантаження з PHP бекенду... (переконайтесь що php -S запущено)</p>
            ) : (
              categories.map(cat => {
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
              })
            )}

          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}

export default App;
