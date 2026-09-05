import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';
import { useFavorites } from '../context/FavoritesContext';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

interface EquipmentItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const homeT = {
  uk: {
    heroTitle: "ПРОФЕСІЙНИЙ НАСТІЛЬНИЙ ТЕНІС",
    heroSub: "Найкращі зали, професійні тренери та регулярні турніри для гравців будь-якого рівня.",
    slide2Title: "НАЙКРАЩЕ ОБЛАДНАННЯ",
    slide2Sub: "Грай ракетками від провідних брендів. Лише оригінал.",
    slide3Title: "ТУРНІРИ ТА ЗМАГАННЯ",
    slide3Sub: "Щотижневі турніри для любителів та професіоналів.",
    bookBtn: "Забронювати стіл",
    popularProducts: "Популярні Товари",
    allProducts: "Всі товари",
    galleryTitle: "Блог",
    addToCart: "В кошик"
  },
  en: {
    heroTitle: "PROFESSIONAL TABLE TENNIS",
    heroSub: "The best halls, professional coaches, and regular tournaments for players of all levels.",
    slide2Title: "THE BEST EQUIPMENT",
    slide2Sub: "Play with rackets from top brands. Only original.",
    slide3Title: "TOURNAMENTS & COMPETITIONS",
    slide3Sub: "Weekly tournaments for amateurs and professionals.",
    bookBtn: "Book a Table",
    popularProducts: "Popular Products",
    allProducts: "All Products",
    galleryTitle: "Blog",
    addToCart: "Add to Cart"
  }
};

export default function Home() {
  const [products, setProducts] = useState<EquipmentItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const { lang } = useLang();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleToggleFavorite = (item: EquipmentItem) => {
    if (isFavorite(item.id)) {
      toast.success('Видалено з бажаного');
    } else {
      toast.success('Додано до бажаного ❤️');
    }
    toggleFavorite(item);
  };

  const t = homeT[lang];

  useEffect(() => {
    // Встановлюємо тестові (мок) товари, оскільки бекенд PHP не працює
    const mockProductsUk: EquipmentItem[] = [
      { id: 1, title: 'Ракетка Butterfly Timo Boll ALC', category: 'Ракетки', price: 4500, image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=600&auto=format&fit=crop', description: 'Професійна основа для атаки.' },
      { id: 2, title: 'М\'ячі Nittaku Premium 3-Star (3 шт)', category: 'М\'ячі', price: 350, image: 'https://images.unsplash.com/photo-1562095240-7abf07ebafcc?q=80&w=600&auto=format&fit=crop', description: 'Офіційні м\'ячі турнірів світового класу.' },
      { id: 3, title: 'Кросівки Mizuno Wave Medal 6', category: 'Взуття', price: 3200, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop', description: 'Топове взуття для максимальної стабільності.' },
      { id: 4, title: 'Накладка DHS Hurricane 3 Neo', category: 'Накладки', price: 1100, image: 'https://images.unsplash.com/photo-1611689225620-3e70248bc0f0?q=80&w=600&auto=format&fit=crop', description: 'Улюблена накладка китайської збірної.' },
    ];
    
    const mockProductsEn: EquipmentItem[] = [
      { id: 1, title: 'Butterfly Timo Boll ALC Racket', category: 'Rackets', price: 4500, image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=600&auto=format&fit=crop', description: 'Professional attacking blade.' },
      { id: 2, title: 'Nittaku Premium 3-Star Balls (3 pcs)', category: 'Balls', price: 350, image: 'https://images.unsplash.com/photo-1562095240-7abf07ebafcc?q=80&w=600&auto=format&fit=crop', description: 'Official world-class tournament balls.' },
      { id: 3, title: 'Mizuno Wave Medal 6 Shoes', category: 'Shoes', price: 3200, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop', description: 'Top shoes for maximum stability.' },
      { id: 4, title: 'DHS Hurricane 3 Neo Rubber', category: 'Rubbers', price: 1100, image: 'https://images.unsplash.com/photo-1611689225620-3e70248bc0f0?q=80&w=600&auto=format&fit=crop', description: 'Favorite rubber of the Chinese national team.' },
    ];

    setProducts(lang === 'en' ? mockProductsEn : mockProductsUk);
  }, [lang]);

  const slides = [
    { image: "https://images.unsplash.com/photo-1511067007358-56f8f5d13108?q=80&w=1920&auto=format&fit=crop", title: t.heroTitle, sub: t.heroSub },
    { image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=1920&auto=format&fit=crop", title: t.slide2Title, sub: t.slide2Sub },
    { image: "https://images.unsplash.com/photo-1609147110688-660c23dc8f64?q=80&w=1920&auto=format&fit=crop", title: t.slide3Title, sub: t.slide3Sub }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Table Tennis Store</title>
        <meta name="description" content="Настільний теніс" />
      </Helmet>

      <main className="container">
        {/* Hero Section */}
        <section className="hero" style={{ position: 'relative', overflow: 'hidden', height: '600px', width: '100%', padding: 0 }}>
          {slides.map((slide, index) => (
            <div 
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: currentSlide === index ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px',
                zIndex: currentSlide === index ? 1 : 0
              }}
            >
              <h1 className="hero-title" style={{ maxWidth: '800px', marginBottom: '20px', transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.3s', opacity: currentSlide === index ? 1 : 0 }}>{slide.title}</h1>
              <p className="hero-subtitle" style={{ maxWidth: '600px', marginBottom: '30px', transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.5s', opacity: currentSlide === index ? 1 : 0 }}>{slide.sub}</p>
              <button className="btn-cta" style={{ transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.7s', opacity: currentSlide === index ? 1 : 0, fontSize: '18px', padding: '15px 30px' }}>{t.bookBtn}</button>
            </div>
          ))}
          
          <button 
            onClick={prevSlide}
            style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', zIndex: 10, transition: 'background 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={nextSlide}
            style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', zIndex: 10, transition: 'background 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            aria-label="Next Slide"
          >
            <ChevronRight size={32} />
          </button>

          <div style={{ position: 'absolute', bottom: '30px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '10px', zIndex: 10 }}>
            {slides.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentSlide(index)}
                style={{ width: '12px', height: '12px', borderRadius: '50%', border: 'none', background: currentSlide === index ? '#10b981' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'background 0.3s' }}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="categories-section" style={{ padding: '60px 0', background: '#f9fafb' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 className="section-title" style={{ margin: 0 }}>{t.popularProducts}</h2>
              <Link to="/equipment" className="btn-cta" style={{ background: 'transparent', border: '2px solid var(--color-primary)', color: 'var(--color-primary)' }}>{t.allProducts}</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
              {products.map(item => (
                <div key={item.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} />
                    <button 
                      onClick={() => handleToggleFavorite(item)} 
                      style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s', transform: isFavorite(item.id) ? 'scale(1.1)' : 'scale(1)' }}
                    >
                      <Heart size={20} color={isFavorite(item.id) ? '#ef4444' : '#6b7280'} fill={isFavorite(item.id) ? '#ef4444' : 'none'} />
                    </button>
                  </div>
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>{item.category}</span>
                    <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#111827' }}>{item.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px', flex: 1 }}>{item.description}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{item.price} ₴</span>
                      <button className="btn-cta" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={() => addToCart(item)}>{t.addToCart}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section style={{ padding: '60px 0' }}>
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>{t.galleryTitle}</h2>
            <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '20px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} className="gallery-slider">
              <style>{`.gallery-slider::-webkit-scrollbar { display: none; }`}</style>
              <img src="https://images.unsplash.com/photo-1511067007358-56f8f5d13108?q=80&w=600&auto=format&fit=crop" alt="Gallery 1" style={{ flex: '0 0 auto', width: '300px', height: '250px', objectFit: 'cover', borderRadius: '12px', scrollSnapAlign: 'start' }} />
              <img src="https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=600&auto=format&fit=crop" alt="Gallery 2" style={{ flex: '0 0 auto', width: '300px', height: '250px', objectFit: 'cover', borderRadius: '12px', scrollSnapAlign: 'start' }} />
              <img src="https://images.unsplash.com/photo-1609147110688-660c23dc8f64?q=80&w=600&auto=format&fit=crop" alt="Gallery 3" style={{ flex: '0 0 auto', width: '300px', height: '250px', objectFit: 'cover', borderRadius: '12px', scrollSnapAlign: 'start' }} />
              <img src="https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=600&auto=format&fit=crop" alt="Gallery 4" style={{ flex: '0 0 auto', width: '300px', height: '250px', objectFit: 'cover', borderRadius: '12px', scrollSnapAlign: 'start' }} />
              <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" alt="Gallery 5" style={{ flex: '0 0 auto', width: '300px', height: '250px', objectFit: 'cover', borderRadius: '12px', scrollSnapAlign: 'start' }} />
              <img src="https://images.unsplash.com/photo-1582236378950-ceaf591605fb?q=80&w=600&auto=format&fit=crop" alt="Gallery 6" style={{ flex: '0 0 auto', width: '300px', height: '250px', objectFit: 'cover', borderRadius: '12px', scrollSnapAlign: 'start' }} />
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
