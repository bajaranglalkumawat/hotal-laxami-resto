import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, X } from 'lucide-react';
import { useState } from 'react';
import OrderForm from './OrderForm';
import LazyImage from './LazyImage';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full md:max-w-lg md:rounded-lg shadow-2xl md:m-4 h-screen md:h-auto max-h-screen md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-lg" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-brand-green to-brand-gold text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Order</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <p className="text-gray-400 mt-2">Add items from the menu to get started</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gray-50 p-4 rounded-lg border-l-4 border-brand-green"
                >
                  <LazyImage
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-brand-dark">{item.name}</h3>
                    <p className="text-brand-gold font-bold mt-1">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 bg-white border border-gray-300 rounded text-center min-w-[40px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Checkout */}
            <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 p-6 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-brand-dark">Total:</span>
                <span className="text-2xl font-bold text-brand-gold">
                  ₹{getTotalPrice()}
                </span>
              </div>

              {!showOrderForm ? (
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="btn-primary w-full text-lg"
                >
                  Proceed to Order
                </button>
              ) : (
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-sm text-brand-green hover:underline"
                >
                  ← Back to Cart
                </button>
              )}
            </div>
          </>
        )}

        {/* Order Form */}
        {showOrderForm && cart.length > 0 && (
          <OrderForm onClose={onClose} />
        )}
      </div>
    </div>
  );
}
