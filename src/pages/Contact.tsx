import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Контакти | Table Tennis Store</title>
      </Helmet>
      
      

      <main className="container" style={{ padding: '60px 0', minHeight: '70vh' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '40px', textAlign: 'center' }}>Зв'яжіться з нами</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          <div style={{ background: '#f9fafb', padding: '40px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Контактна інформація</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '18px' }}>
              <div style={{ background: '#ef4444', color: 'white', padding: '10px', borderRadius: '50%' }}><Phone size={24} /></div>
              <span>+38 (000) 000-00-00</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '18px' }}>
              <div style={{ background: '#ef4444', color: 'white', padding: '10px', borderRadius: '50%' }}><Mail size={24} /></div>
              <span>info@tabletennis.com.ua</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '18px' }}>
              <div style={{ background: '#ef4444', color: 'white', padding: '10px', borderRadius: '50%' }}><MapPin size={24} /></div>
              <span>м. Київ, вул. Спортивна, 1</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '18px' }}>
              <div style={{ background: '#ef4444', color: 'white', padding: '10px', borderRadius: '50%' }}><Clock size={24} /></div>
              <span>Пн-Нд: 09:00 - 22:00</span>
            </div>
          </div>

          <div style={{ background: 'white', border: '1px solid #e5e7eb', padding: '40px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Напишіть нам</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="text" placeholder="Ваше ім'я" style={{ padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px' }} />
              <input type="email" placeholder="Email" style={{ padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px' }} />
              <textarea placeholder="Повідомлення..." style={{ padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '16px', minHeight: '120px' }}></textarea>
              <button type="button" className="btn-cta" style={{ alignSelf: 'flex-start' }}>Відправити</button>
            </form>
          </div>

        </div>
      </main>
    </HelmetProvider>
  );
}
