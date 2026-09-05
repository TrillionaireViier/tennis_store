import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, Calendar, Settings, Home, LogOut, Search, Package, Plus, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', category: '', price: '', description: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchProducts = () => {
    fetch('/api/equipment.php')
      .then(res => res.json())
      .then(data => {
        if(data.equipment) setProducts(data.equipment);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetch('/api/auth.php?action=list_users')
      .then(res => res.json())
      .then(data => {
        if(data.users) setUsers(data.users);
      })
      .catch(err => console.error("Could not load users", err));
      
    fetchProducts();
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('category', newProduct.category);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    fetch('/api/equipment.php', {
      method: 'POST',
      body: formData // No Content-Type header; browser sets it with boundary
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert(data.message);
        setShowAddProduct(false);
        setNewProduct({ title: '', category: '', price: '', description: '' });
        setImageFile(null);
        fetchProducts(); // Refresh list after adding
      } else {
        alert(data.message);
      }
    })
    .catch(err => console.error(err));
  };

  const handleDeleteProduct = (id: number) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей товар?")) return;
    
    fetch(`/api/equipment.php?id=${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        fetchProducts();
      } else {
        alert(data.message);
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Адмін Панель | Магазин Настільного Тенісу</title>
      </Helmet>
      <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        
        {/* Sidebar */}
        <aside style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', padding: '20px' }}>
          <h2 style={{ marginBottom: '30px', color: '#ff4d4f' }}>Адмін Панель</h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', textDecoration: 'none' }}><Home size={20} /> На сайт</Link>
              <button onClick={() => setActiveTab('users')} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: activeTab === 'users' ? 'white' : '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '16px' }}><Users size={20} /> Користувачі</button>
              <button onClick={() => setActiveTab('products')} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: activeTab === 'products' ? 'white' : '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '16px' }}><Package size={20} /> Товари</button>
              <Link to="/admin/bookings" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', textDecoration: 'none' }}><Calendar size={20} /> Бронювання</Link>
              <Link to="/admin/settings" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', textDecoration: 'none' }}><Settings size={20} /> Налаштування</Link>
            </nav>
          <button style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '20px 0' }}>
            <LogOut size={20} /> Вийти
          </button>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '40px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '24px', color: '#111827' }}>{activeTab === 'users' ? 'Управління користувачами' : 'Управління товарами'}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {activeTab === 'products' && (
                <button onClick={() => setShowAddProduct(true)} className="btn-cta" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 16px' }}>
                  <Plus size={18} /> Додати товар
                </button>
              )}
              <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '8px 15px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Search size={18} color="#9ca3af" />
                <input type="text" placeholder="Пошук..." style={{ border: 'none', outline: 'none', marginLeft: '10px' }} />
              </div>
            </div>
          </header>

          {activeTab === 'users' && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                    <th style={{ padding: '12px' }}>ID</th>
                    <th style={{ padding: '12px' }}>Ім'я</th>
                    <th style={{ padding: '12px' }}>Нікнейм</th>
                    <th style={{ padding: '12px' }}>Роль</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? users.map((u, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px' }}>#{u.id}</td>
                      <td style={{ padding: '12px' }}>{u.name}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>@{u.nickname}</td>
                      <td style={{ padding: '12px' }}>{u.nickname === 'admin' ? 'Адмін' : 'Гравець'}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>Користувачів не знайдено.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'products' && !showAddProduct && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Каталог товарів</h2>
                <button onClick={() => setShowAddProduct(true)} className="btn-cta" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 16px' }}>
                  <Plus size={18} /> Додати товар
                </button>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                    <th style={{ padding: '12px', width: '60px' }}>Фото</th>
                    <th style={{ padding: '12px' }}>Назва</th>
                    <th style={{ padding: '12px' }}>Категорія</th>
                    <th style={{ padding: '12px' }}>Ціна</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? products.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px' }}>
                        <img src={p.image} alt={p.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      </td>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{p.title}</td>
                      <td style={{ padding: '12px' }}>{p.category}</td>
                      <td style={{ padding: '12px', color: 'var(--color-primary)' }}>{p.price} ₴</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteProduct(p.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}
                          title="Видалити"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>Товари не знайдено. Додайте перший!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {showAddProduct && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
              <h2 style={{ marginBottom: '20px' }}>Додати новий товар</h2>
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input required type="text" placeholder="Назва (напр. Butterfly Timo Boll)" className="modal-input" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                <input required type="text" placeholder="Категорія (напр. Ракетки)" className="modal-input" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                <input required type="number" placeholder="Ціна (₴)" className="modal-input" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                <input type="file" accept="image/*" className="modal-input" onChange={e => { if(e.target.files && e.target.files.length > 0) setImageFile(e.target.files[0]) }} />
                <textarea required placeholder="Опис товару" className="modal-input" rows={4} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn-cta" style={{ flex: 1 }}>Зберегти товар</button>
                  <button type="button" onClick={() => setShowAddProduct(false)} className="btn-cta" style={{ flex: 1, background: '#f3f4f6', color: '#4b5563' }}>Скасувати</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </HelmetProvider>
  );
}
