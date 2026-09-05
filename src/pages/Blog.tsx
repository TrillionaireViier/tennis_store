import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Search, User, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Blog() {
  const posts = [
    { id: 1, title: 'Як вибрати першу ракетку?', date: '12 Серпня 2026', desc: 'Дізнайтеся основні критерії вибору ракетки для початківців: типи накладок, вага та швидкість.' },
    { id: 2, title: 'Правила ITTF: Зміни 2026 року', date: '5 Серпня 2026', desc: 'Огляд нових правил подачі та використання клею на офіційних турнірах.' },
    { id: 3, title: 'Топ-5 вправ для покращення реакції', date: '28 Липня 2026', desc: 'Тренуйте свою реакцію та роботу ніг за допомогою цих простих, але ефективних вправ.' }
  ];

  const { cartCount, setIsCartOpen } = useCart();

  return (
    <HelmetProvider>
      <Helmet>
        <title>Блог | Table Tennis Store</title>
      </Helmet>
      
      

      

      

      <main className="container" style={{ padding: '60px 0', minHeight: '70vh' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '40px', textAlign: 'center' }}>Наш Блог</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {posts.map(post => (
            <div key={post.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '25px', display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>{post.date}</span>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>{post.title}</h3>
              <p style={{ color: '#6b7280', flex: 1, marginBottom: '20px' }}>{post.desc}</p>
              <button className="btn-cta" style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444' }}>Читати далі</button>
            </div>
          ))}
        </div>
      </main>
    </HelmetProvider>
  );
}
