import { Phone, Mail, MapPin, Search, User, Heart, ShoppingCart, Target, Users, Trophy, Activity, Dumbbell, ShieldCheck } from 'lucide-react';

function App() {
  return (
    <>
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
          <h2 className="section-title">Наші Послуги</h2>
          <div className="categories-grid">
            
            <a href="#" className="category-card">
              <div className="category-icon">
                <Target size={40} />
              </div>
              <h3 className="category-title">Оренда Столів</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Професійні столи для вашої гри в зручний час.</p>
            </a>

            <a href="#" className="category-card">
              <div className="category-icon">
                <Users size={40} />
              </div>
              <h3 className="category-title">Групові Тренування</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Навчання в групах під керівництвом майстрів спорту.</p>
            </a>

            <a href="#" className="category-card">
              <div className="category-icon">
                <Dumbbell size={40} />
              </div>
              <h3 className="category-title">Індивідуальні Заняття</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Персональний підхід для швидкого прогресу.</p>
            </a>

            <a href="#" className="category-card">
              <div className="category-icon">
                <Trophy size={40} />
              </div>
              <h3 className="category-title">Турніри</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Щотижневі змагання для любителів та професіоналів.</p>
            </a>

            <a href="#" className="category-card">
              <div className="category-icon">
                <Activity size={40} />
              </div>
              <h3 className="category-title">Корпоративи</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Організація спортивних заходів для компаній.</p>
            </a>

            <a href="#" className="category-card">
              <div className="category-icon">
                <ShieldCheck size={40} />
              </div>
              <h3 className="category-title">Ремонт Інвентарю</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Переклейка накладок та збірка ракеток.</p>
            </a>

          </div>
        </section>
      </main>
    </>
  );
}

export default App;
