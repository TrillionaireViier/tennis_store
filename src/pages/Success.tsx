import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Оплата успішна | Table Tennis Store</title>
      </Helmet>

      <main className="container" style={{ padding: '80px 0', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircle size={80} color="#10b981" style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '32px', marginBottom: '15px', color: '#111827', textAlign: 'center' }}>Оплата успішна!</h1>
        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '30px', textAlign: 'center', maxWidth: '500px' }}>
          Дякуємо за ваше замовлення. Ми вже почали його обробляти і скоро зв'яжемося з вами для уточнення деталей доставки.
        </p>
        <Link to="/equipment" className="btn-cta" style={{ background: '#10b981', borderColor: '#10b981', fontSize: '18px', padding: '12px 30px' }}>
          Повернутися до покупок
        </Link>
      </main>
    </HelmetProvider>
  );
}
