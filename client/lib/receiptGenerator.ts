export interface ReceiptData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  location?: { lat: number; lng: number };
  timestamp: Date;
}

export function generateReceipt(data: ReceiptData): string {
  const itemsHTML = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">x${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price * item.quantity}</td>
        </tr>`
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Hotel Laxmi Resto - Order Receipt</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f5f5f5;
          padding: 20px;
          margin: 0;
        }
        .container {
          max-width: 500px;
          margin: 0 auto;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #1a5522;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
        .header h1 {
          color: #1a5522;
          margin: 0;
          font-size: 24px;
        }
        .header p {
          color: #666;
          margin: 5px 0 0 0;
          font-size: 12px;
        }
        .order-id {
          text-align: center;
          background: #f0f0f0;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
          font-weight: bold;
          color: #333;
        }
        .details {
          margin-bottom: 20px;
          font-size: 14px;
        }
        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          border-bottom: 1px solid #eee;
        }
        .detail-label {
          color: #666;
          font-weight: 500;
        }
        .detail-value {
          color: #333;
          font-weight: bold;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        thead {
          background: #f5f5f5;
        }
        th {
          padding: 10px;
          text-align: left;
          font-weight: bold;
          border-bottom: 2px solid #1a5522;
          color: #333;
        }
        .total-row {
          background: #f0f0f0;
          font-size: 16px;
          font-weight: bold;
        }
        .total-amount {
          color: #ea9e24;
          font-size: 20px;
        }
        .location {
          background: #e3f2fd;
          padding: 10px;
          border-radius: 5px;
          font-size: 12px;
          margin: 15px 0;
          border-left: 4px solid #1a5522;
        }
        .footer {
          text-align: center;
          color: #999;
          font-size: 12px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        .special-instructions {
          background: #fff3cd;
          padding: 10px;
          border-radius: 5px;
          margin: 15px 0;
          border-left: 4px solid #ea9e24;
          font-size: 13px;
        }
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .container {
            box-shadow: none;
            max-width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍽️ Hotel Laxmi Resto</h1>
          <p>Order Confirmation Receipt</p>
        </div>

        <div class="order-id">Order ID: ${data.orderId}</div>

        <div class="details">
          <div class="detail-item">
            <span class="detail-label">Customer Name:</span>
            <span class="detail-value">${data.customerName}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Phone:</span>
            <span class="detail-value">${data.customerPhone}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Delivery Address:</span>
            <span class="detail-value" style="text-align: right; max-width: 50%;">${data.customerAddress}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Date & Time:</span>
            <span class="detail-value">${data.timestamp.toLocaleString()}</span>
          </div>
        </div>

        ${
          data.location
            ? `
          <div class="location">
            📍 <strong>Live Location Shared</strong><br>
            Latitude: ${data.location.lat.toFixed(4)}<br>
            Longitude: ${data.location.lng.toFixed(4)}<br>
            <a href="https://maps.google.com/?q=${data.location.lat},${data.location.lng}" target="_blank" style="color: #1a5522; text-decoration: none;">View on Google Maps →</a>
          </div>
        `
            : ''
        }

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
            <tr class="total-row">
              <td colspan="2" style="padding: 10px;">Total Amount</td>
              <td style="padding: 10px; text-align: right;" class="total-amount">₹${data.totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <p><strong>Thank you for ordering!</strong></p>
          <p>We will confirm your order via WhatsApp shortly.</p>
          <p style="margin-top: 10px; color: #ccc;">Hotel Laxmi Resto • Budsu Road, Kuchaman City, Rajasthan</p>
          <p style="color: #ccc;">Open 24×7 • Pure Veg Family Restaurant</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
}

export function downloadReceipt(data: ReceiptData): void {
  const html = generateReceipt(data);
  
  // Create blob and download
  const blob = new Blob([html], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Receipt_${data.orderId}_${Date.now()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  // Also print
  setTimeout(() => {
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  }, 100);
}
