import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Shipping() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Доставка і оплата | Table Tennis Store</title>
      </Helmet>
      
      

      <main className="container" style={{ padding: '60px 0', minHeight: '70vh' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '30px', textAlign: 'center' }}>Доставка і оплата</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px', lineHeight: '1.8', color: '#4b5563' }}>
          
          <h3 style={{ fontSize: '24px', color: '#111827', marginTop: '30px', marginBottom: '15px' }}>Способи доставки:</h3>
          <ul style={{ paddingLeft: '20px', marginBottom: '30px' }}>
            <li style={{ marginBottom: '10px' }}><strong>Нова Пошта:</strong> Доставка у відділення або поштомат по всій Україні (1-3 дні). Безкоштовно для замовлень від 2000 ₴.</li>
            <li style={{ marginBottom: '10px' }}><strong>Укрпошта:</strong> Стандартна доставка (3-5 днів).</li>
            <li style={{ marginBottom: '10px' }}><strong>Самовивіз:</strong> З нашого магазину в м. Київ, вул. Спортивна, 1 (Безкоштовно).</li>
          </ul>

          <h3 style={{ fontSize: '24px', color: '#111827', marginTop: '30px', marginBottom: '15px' }}>Оплата:</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>Оплата онлайн карткою (Visa/Mastercard, Apple Pay, Google Pay).</li>
            <li style={{ marginBottom: '10px' }}>Оплата при отриманні (накладений платіж Нової Пошти, комісія 20 ₴ + 2%).</li>
            <li style={{ marginBottom: '10px' }}>Безготівковий розрахунок для юридичних осіб.</li>
          </ul>

        </div>
      </main>
    </HelmetProvider>
  );
}
