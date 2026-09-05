import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Про Нас | Table Tennis Store</title>
      </Helmet>
      
      

      <main className="container" style={{ padding: '60px 0', minHeight: '70vh' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '30px', textAlign: 'center' }}>Про Нас</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px', lineHeight: '1.8', color: '#4b5563' }}>
          <p style={{ marginBottom: '20px' }}>
            <strong>Table Tennis Store</strong> — це не просто магазин, це спільнота професіоналів та любителів настільного тенісу. Ми працюємо з 2010 року, щоб забезпечити українських спортсменів найкращим інвентарем світового рівня.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Наша місія полягає в популяризації настільного тенісу в Україні. Ми не лише продаємо ракетки, столи та аксесуари, але й підтримуємо місцеві турніри, дитячі спортивні школи та професійних гравців.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px' }}>
            <div style={{ background: '#f9fafb', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '32px', color: '#ef4444', margin: '0 0 10px 0' }}>10 000+</h3>
              <p>Задоволених клієнтів</p>
            </div>
            <div style={{ background: '#f9fafb', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '32px', color: '#ef4444', margin: '0 0 10px 0' }}>15 років</h3>
              <p>Досвіду на ринку</p>
            </div>
          </div>
        </div>
      </main>
    </HelmetProvider>
  );
}
