import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappLink = 'https://wa.me/919414649999?text=Hello%20Hotel%20Laxmi%20Resto%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.';

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
