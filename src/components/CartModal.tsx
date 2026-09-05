import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CartModal() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="modal-content" style={{ maxWidth: '500px', width: '90%' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsCartOpen(false)}>
          <X size={24} />
        </button>
        
        <div className="modal-body">
          <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Ваш кошик</h2>
          
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>Кошик порожній.</p>
              <button className="btn-cta" onClick={() => setIsCartOpen(false)}>Продовжити покупки</button>
            </div>
          ) : (
            <>
              <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #f3f4f6' }}>
                    <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '14px', margin: '0 0 5px 0' }}>{item.title}</h4>
                      <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', margin: 0 }}>{item.price} ₴</p>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f3f4f6', borderRadius: '6px', padding: '5px' }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}>
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Разом:</span>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)' }}>{cartTotal} ₴</span>
                </div>
                
                <button 
                  className="btn-cta" 
                  style={{ width: '100%', padding: '12px', fontSize: '16px', backgroundColor: '#10b981' }}
                  onClick={() => {
                    clearCart();
                    setIsCartOpen(false);
                    toast.success('Оплата успішна!');
                    navigate('/success');
                  }}
                >
                  Оплатити замовлення
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
