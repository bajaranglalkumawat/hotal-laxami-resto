import { useCart } from '@/context/CartContext';
import { MapPin, Phone, User, FileText, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { generateReceipt, downloadReceipt } from '@/lib/receiptGenerator';

interface OrderFormProps {
  onClose: () => void;
}

export default function OrderForm({ onClose }: OrderFormProps) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    specialInstructions: '',
  });
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<'razorpay' | 'phonepe' | 'cash' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get location. Please enable location services.');
          setIsLoadingLocation(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
    }
  };

  const handleSubmitOrder = async (paymentMethod: 'razorpay' | 'phonepe' | 'cash') => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill all required fields');
      return;
    }

    // Generate order ID
    const generatedOrderId = `ORD${Date.now()}`;
    setOrderId(generatedOrderId);
    setSelectedPayment(paymentMethod);
    setShowReceipt(true);
  };

  const handleDownloadReceipt = () => {
    const receiptData = {
      orderId,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      items: cart,
      totalAmount: getTotalPrice(),
      location,
      timestamp: new Date(),
    };
    downloadReceipt(receiptData);
  };

  const handleShareViaWhatsApp = () => {
    const locationText = location
      ? `\n📍 Live Location: https://maps.google.com/?q=${location.lat},${location.lng}`
      : '';
    const itemsText = cart
      .map((item) => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
      .join('\n');

    const message = `🍽️ *Hotel Laxmi Resto Order*\n\n*Order ID:* ${orderId}\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}\n\n*Order Details:*\n${itemsText}\n\n*Total: ₹${getTotalPrice()}*${locationText}\n\n${
      formData.specialInstructions
        ? `*Special Instructions:* ${formData.specialInstructions}\n`
        : ''
    }*Payment Method:* ${selectedPayment?.toUpperCase() || 'CASH'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/919414649999?text=${encodedMessage}`,
      '_blank'
    );
  };

  if (showReceipt) {
    return (
      <div className="p-6 space-y-6 min-h-[60vh] flex flex-col">
        {/* Receipt */}
        <div className="bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-brand-green rounded-lg p-6 space-y-4 flex-1">
          <div className="text-center space-y-2 border-b-2 border-brand-green pb-4">
            <h3 className="text-2xl font-bold text-brand-green">Hotel Laxmi Resto</h3>
            <p className="text-sm text-gray-600">Order Confirmation Receipt</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-bold text-brand-dark">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-semibold">{new Date().toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 pt-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm font-semibold">
                <span>Name:</span>
                <span>{formData.name}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>Phone:</span>
                <span>{formData.phone}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>Address:</span>
                <span className="text-right max-w-xs">{formData.address}</span>
              </div>
              {location && (
                <div className="flex justify-between text-sm font-semibold">
                  <span>Location:</span>
                  <span className="text-right text-xs text-brand-green">
                    📍 Shared via WhatsApp
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 pt-4">
            <h4 className="font-bold mb-2 text-brand-dark">Order Items:</h4>
            <div className="space-y-1 text-sm mb-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-brand-green pt-4 space-y-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-brand-gold">₹{getTotalPrice()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Payment:</span>
              <span className="px-3 py-1 bg-brand-gold text-white rounded font-semibold text-xs">
                {selectedPayment?.toUpperCase()}
              </span>
            </div>
          </div>

          {formData.specialInstructions && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
              <p className="text-gray-600">
                <strong>Special Instructions:</strong> {formData.specialInstructions}
              </p>
            </div>
          )}

          <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-300">
            <p>Thank you for ordering from Hotel Laxmi Resto!</p>
            <p>We'll confirm your order shortly via WhatsApp</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadReceipt}
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Download Receipt
          </button>

          <button
            onClick={handleShareViaWhatsApp}
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
          >
            <Smartphone className="w-5 h-5" />
            Send Order via WhatsApp
          </button>

          <button
            onClick={() => {
              clearCart();
              onClose();
            }}
            className="w-full px-4 py-3 border-2 border-brand-green text-brand-green rounded-lg font-semibold hover:bg-brand-cream transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white">
      <h3 className="text-xl sm:text-2xl font-bold text-brand-dark">Delivery Details</h3>

      {/* Customer Info Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm sm:text-base font-semibold text-brand-dark mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-green text-base"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold text-brand-dark mb-2">
            <Phone className="inline w-4 h-4 mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-green text-base"
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold text-brand-dark mb-2">
            <MapPin className="inline w-4 h-4 mr-2" />
            Delivery Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-green text-base"
            placeholder="Enter delivery address"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold text-brand-dark mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-green resize-none text-base"
            placeholder="Any special requests? (Extra spicy, no onions, etc.)"
            rows={2}
          />
        </div>
      </div>

      {/* Location Sharing */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-brand-green" />
          <span className="font-semibold text-brand-dark">Share Live Location</span>
        </div>
        {location ? (
          <div className="text-sm space-y-2">
            <p className="text-green-600 font-semibold">✓ Location captured!</p>
            <p className="text-gray-600">
              Latitude: {location.lat.toFixed(4)}<br />
              Longitude: {location.lng.toFixed(4)}
            </p>
            <p className="text-xs text-gray-500">
              Your location will be shared with the restaurant via WhatsApp for faster delivery
            </p>
          </div>
        ) : (
          <button
            onClick={getLocation}
            disabled={isLoadingLocation}
            className="w-full px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            {isLoadingLocation ? 'Getting Location...' : 'Enable Live Location Sharing'}
          </button>
        )}
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <h4 className="font-semibold text-brand-dark text-sm sm:text-base">Select Payment Method</h4>
        <div className="space-y-2">
          <button
            onClick={() => handleSubmitOrder('razorpay')}
            className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg hover:border-brand-green hover:bg-brand-cream active:bg-brand-cream transition-all text-left font-semibold text-brand-dark text-sm sm:text-base touch-manipulation min-h-[48px]"
          >
            💳 Razorpay - Pay Online
          </button>
          <button
            onClick={() => handleSubmitOrder('phonepe')}
            className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg hover:border-brand-green hover:bg-brand-cream active:bg-brand-cream transition-all text-left font-semibold text-brand-dark text-sm sm:text-base touch-manipulation min-h-[48px]"
          >
            📱 PhonePe - UPI Payment
          </button>
          <button
            onClick={() => handleSubmitOrder('cash')}
            className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg hover:border-brand-green hover:bg-brand-cream active:bg-brand-cream transition-all text-left font-semibold text-brand-dark text-sm sm:text-base touch-manipulation min-h-[48px]"
          >
            💵 Cash on Delivery
          </button>
        </div>
      </div>
    </div>
  );
}
