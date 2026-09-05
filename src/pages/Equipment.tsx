import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

interface EquipmentItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export default function Equipment() {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  
  const role = user?.role || 'user';

  useEffect(() => {
    // Встановлюємо тестові (мок) товари, оскільки бекенд PHP не працює
    const mockProducts: EquipmentItem[] = [
      { id: 1, title: 'Ракетка Butterfly Timo Boll ALC', category: 'Ракетки', price: 4500, image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=600&auto=format&fit=crop', description: 'Професійна основа для атаки.' },
      { id: 2, title: 'М\'ячі Nittaku Premium 3-Star (3 шт)', category: 'М\'ячі', price: 350, image: 'https://images.unsplash.com/photo-1562095240-7abf07ebafcc?q=80&w=600&auto=format&fit=crop', description: 'Офіційні м\'ячі турнірів світового класу.' },
      { id: 3, title: 'Кросівки Mizuno Wave Medal 6', category: 'Взуття', price: 3200, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop', description: 'Топове взуття для максимальної стабільності.' },
      { id: 4, title: 'Накладка DHS Hurricane 3 Neo', category: 'Накладки', price: 1100, image: 'https://images.unsplash.com/photo-1611689225620-3e70248bc0f0?q=80&w=600&auto=format&fit=crop', description: 'Улюблена накладка китайської збірної.' },
      { id: 5, title: 'Стіл Donic Waldner Classic 25', category: 'Столи', price: 18500, image: 'https://images.unsplash.com/photo-1511067007358-56f8f5d13108?q=80&w=600&auto=format&fit=crop', description: 'Турнірний стіл ITTF.' },
      { id: 6, title: 'Форма Joola Trinity', category: 'Одяг', price: 950, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop', description: 'Дихаюча футболка для інтенсивних тренувань.' },
      { id: 7, title: 'Чохол Tibhar', category: 'Аксесуари', price: 400, image: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=600&auto=format&fit=crop', description: 'Жорсткий чохол на дві ракетки.' },
      { id: 8, title: 'Спортивна сумка Stiga', category: 'Сумки', price: 1600, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', description: 'Велика сумка для екіпірування.' },
      { id: 9, title: 'Ракетка Stiga Cybershape', category: 'Ракетки', price: 5200, image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=600&auto=format&fit=crop', description: 'Революційна шестикутна форма.' },
      { id: 10, title: 'Накладка Tenergy 05', category: 'Накладки', price: 2100, image: 'https://images.unsplash.com/photo-1611689225620-3e70248bc0f0?q=80&w=600&auto=format&fit=crop', description: 'Легендарна накладка для топспінів.' },
      { id: 11, title: 'Стіл Cornilleau 500X', category: 'Столи', price: 28000, image: 'https://images.unsplash.com/photo-1511067007358-56f8f5d13108?q=80&w=600&auto=format&fit=crop', description: 'Вуличний стіл преміум класу.' },
      { id: 12, title: 'Робот-тренажер Newgy Robo-Pong', category: 'Аксесуари', price: 12000, image: 'https://images.unsplash.com/photo-1562095240-7abf07ebafcc?q=80&w=600&auto=format&fit=crop', description: 'Автоматичний подавач м\'ячів.' },
      { id: 13, title: 'Ракетка Donic Waldner 1000', category: 'Ракетки', price: 2500, image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=600&auto=format&fit=crop', description: 'Ідеальний вибір для просунутих аматорів.' },
      { id: 14, title: 'Сітка Joola WM', category: 'Аксесуари', price: 1800, image: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=600&auto=format&fit=crop', description: 'Професійна турнірна сітка.' },
    ];
    setItems(mockProducts);
    setLoading(false);
  }, []);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem: EquipmentItem = {
      id: Date.now(),
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      image: (formData.get('image') as string) || 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=600&auto=format&fit=crop',
      description: formData.get('description') as string,
    };
    
    setItems([newItem, ...items]);
    setIsAddModalOpen(false);
    toast.success('Товар успішно додано!');
  };

  const handleDeleteItem = (id: number) => {
    if (confirm('Ви впевнені, що хочете видалити цей товар?')) {
      setItems(items.filter(item => item.id !== id));
      toast.success('Товар видалено');
    }
  };

  const handleToggleFavorite = (item: EquipmentItem) => {
    if (isFavorite(item.id)) {
      toast.success('Видалено з бажаного');
    } else {
      toast.success('Додано до бажаного ❤️');
    }
    toggleFavorite(item);
  };

  // Групуємо товари за категоріями
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, EquipmentItem[]>);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Тенісне Спорядження | Table Tennis Store</title>
      </Helmet>

      <main className="container" style={{ padding: '40px 0', minHeight: '60vh' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: '#f3f4f6', padding: '15px 20px', borderRadius: '12px' }}>
          <div>
            <h1 style={{ fontSize: '32px', margin: 0 }}>Тенісне Спорядження</h1>
          </div>
          {role === 'admin' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 'bold', color: '#10b981' }}>Режим Адміністратора</span>
            </div>
          )}
        </div>

        {role === 'admin' && (
          <div style={{ marginBottom: '30px' }}>
            <button className="btn-cta" onClick={() => setIsAddModalOpen(true)} style={{ background: '#10b981', borderColor: '#10b981' }}>+ Додати новий товар</button>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#6b7280' }}>Завантаження...</div>
        ) : (
          <div>
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #e5e7eb', color: '#111827' }}>
                  {category}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                  {categoryItems.map(item => (
                    <div key={item.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} />
                        <button 
                          onClick={() => handleToggleFavorite(item)} 
                          style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s', transform: isFavorite(item.id) ? 'scale(1.1)' : 'scale(1)' }}
                        >
                          <Heart size={20} color={isFavorite(item.id) ? '#ef4444' : '#6b7280'} fill={isFavorite(item.id) ? '#ef4444' : 'none'} />
                        </button>
                        {role === 'admin' && (
                          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                            <button style={{ background: 'white', border: '1px solid #d1d5db', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>Редагувати</button>
                            <button onClick={() => handleDeleteItem(item.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>Видалити</button>
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '18px', margin: '0 0 10px 0', color: '#111827' }}>{item.title}</h3>
                        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '10px', flex: 1 }}>{item.description}</p>
                        <button onClick={() => setSelectedItem(item)} style={{ background: 'none', border: 'none', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '14px', textAlign: 'left', marginBottom: '20px' }}>Детальніше про товар</button>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{item.price} ₴</span>
                          {role === 'user' ? (
                            <button className="btn-cta" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={() => addToCart(item)}>В кошик</button>
                          ) : (
                            <span style={{ fontSize: '14px', color: '#6b7280' }}>В наявності: 15 шт</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal for item details */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '700px', display: 'flex', gap: '30px' }}>
            <div style={{ flex: '0 0 300px', height: '300px' }}>
              <img src={selectedItem.image} alt={selectedItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h2 style={{ margin: 0, fontSize: '24px' }}>{selectedItem.title}</h2>
                <button className="modal-close" onClick={() => setSelectedItem(null)} style={{ position: 'static' }}><X size={24} /></button>
              </div>
              <span style={{ display: 'inline-block', padding: '4px 10px', background: '#f3f4f6', borderRadius: '6px', fontSize: '13px', color: '#4b5563', alignSelf: 'flex-start', marginBottom: '20px', fontWeight: 'bold' }}>{selectedItem.category}</span>
              <p style={{ fontSize: '16px', color: '#4b5563', flex: 1, lineHeight: '1.6' }}>
                {selectedItem.description} <br/><br/>
                Цей товар виготовлено з найкращих матеріалів, що гарантує його довговічність та надійність під час використання. 
                Ідеально підійде як для тренувань, так і для участі у професійних змаганнях. Багато гравців світового рівня вже оцінили його переваги!
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{selectedItem.price} ₴</span>
                <button className="btn-cta" onClick={() => { addToCart(selectedItem); setSelectedItem(null); toast.success('Товар у кошику!'); }}>Додати в кошик</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding new item */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '24px' }}>Додати товар</h2>
              <button className="modal-close" onClick={() => setIsAddModalOpen(false)} style={{ position: 'static' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" name="title" placeholder="Назва товару (наприклад: Ракетка Donic)" required className="modal-input" />
              
              <select name="category" required className="modal-input" style={{ appearance: 'auto', background: 'white' }}>
                <option value="">Оберіть категорію...</option>
                <option value="Ракетки">Ракетки</option>
                <option value="М'ячі">М'ячі</option>
                <option value="Взуття">Взуття</option>
                <option value="Накладки">Накладки</option>
                <option value="Столи">Столи</option>
                <option value="Одяг">Одяг</option>
                <option value="Аксесуари">Аксесуари</option>
                <option value="Сумки">Сумки</option>
              </select>

              <input type="number" name="price" placeholder="Ціна (₴)" required min="1" className="modal-input" />
              
              <input type="url" name="image" placeholder="URL зображення (необов'язково)" className="modal-input" />
              
              <textarea name="description" placeholder="Опис товару..." required className="modal-input" style={{ minHeight: '100px', resize: 'vertical' }}></textarea>
              
              <button type="submit" className="btn-cta" style={{width: '100%', marginTop: '10px', background: '#10b981', borderColor: '#10b981'}}>
                Зберегти
              </button>
            </form>
          </div>
        </div>
      )}

    </HelmetProvider>
  );
}
