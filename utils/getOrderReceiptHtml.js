const connection = require('../config/database');
const sendEmail = require('../utils/sendEmail');
const generatePdfFromHtml = require('../utils/generatePdfFromHtml');

// Returns HTML string for a single order receipt (for PDF/email)
async function getOrderReceiptHtml(orderId) {
    const serverUrl = process.env.SERVER_URL || 'http://localhost:4000'; // <-- Add this line
    return new Promise((resolve, reject) => {
        // Query order, customer, and items
        const sql = `
            SELECT o.order_id, o.date_ordered, o.date_delivery, o.status,
                   c.last_name, c.first_name, c.address, c.city, c.phone, u.email,
                   oi.item_id, oi.quantity, i.name, i.sell_price,
                   img.image_path
            FROM orders o
            INNER JOIN customer c ON o.customer_id = c.customer_id
            INNER JOIN users u ON c.user_id = u.id
            INNER JOIN orderline oi ON o.order_id = oi.order_id
            INNER JOIN items i ON oi.item_id = i.item_id
            LEFT JOIN items_images img ON i.item_id = img.item_id
            WHERE o.order_id = ?
            ORDER BY oi.item_id
        `;
        connection.execute(sql, [orderId], (err, rows) => {
            if (err || !rows.length) return reject('Order not found');
            const order = rows[0];
            // Group items and images
            const itemsMap = {};
            rows.forEach(row => {
                if (!itemsMap[row.item_id]) {
                    itemsMap[row.item_id] = {
                        name: row.name,
                        quantity: row.quantity,
                        price: row.sell_price,
                        images: []
                    };
                }
                if (row.image_path && !itemsMap[row.item_id].images.includes(row.image_path)) {
                    // Prepend server URL if not already absolute
                    const imgUrl = row.image_path.startsWith('http') ? row.image_path : `${serverUrl}/${row.image_path.replace(/^\/+/, '')}`;
                    itemsMap[row.item_id].images.push(imgUrl);
                }
            });
            const items = Object.values(itemsMap);
            // Build HTML
            let html = `
            <html><head>
            <style>
            body { font-family: Arial, sans-serif; }
            .receipt-header { background: #007bff; color: #fff; padding: 10px; }
            .receipt-section { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
            th { background: #f8f8f8; }
            .text-right { text-align: right; }
            .img-thumb { width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 2px; }
            </style>
            </head><body>
            <div class='receipt-header'><h2>Order Receipt #${order.order_id}</h2></div>
            <div class='receipt-section'>
                <strong>Date Ordered:</strong> ${order.date_ordered ? new Date(order.date_ordered).toLocaleDateString() : ''}<br/>
                <strong>Status:</strong> ${order.status}<br/>
                <strong>Date Delivered:</strong> ${order.date_delivery ? new Date(order.date_delivery).toLocaleDateString() : 'N/A'}
            </div>
            <div class='receipt-section'>
                <strong>Customer:</strong> ${order.last_name}, ${order.first_name}<br/>
                <strong>Address:</strong> ${order.address}${order.city ? ', ' + order.city : ''}<br/>
                <strong>Phone:</strong> ${order.phone}<br/>
                <strong>Email:</strong> ${order.email}
            </div>
            <div class='receipt-section'>
                <table><thead><tr>
                    <th>Images</th><th>Name</th><th>Price</th><th>Qty</th><th>Subtotal</th>
                </tr></thead><tbody>
            `;
            let total = 0;
            items.forEach(item => {
                const price = Number(item.price) || 0;
                const subtotal = price * (item.quantity || 1);
                total += subtotal;
                let imagesHtml = '';
                if (Array.isArray(item.images) && item.images.length > 0) {
                    imagesHtml = item.images.map(imgPath => `<img src='${imgPath}' class='img-thumb' />`).join('');
                } else {
                    imagesHtml = `<span>No image</span>`;
                }
                html += `<tr>
                    <td>${imagesHtml}</td>
                    <td>${item.name}</td>
                    <td>₱ ${(price).toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>₱ ${(subtotal).toFixed(2)}</td>
                </tr>`;
            });
            const shipping = 50.00;
            html += `</tbody></table>
                <div class='text-right'><strong>Total (Items):</strong> ₱ ${total.toFixed(2)}</div>
                <div class='text-right'><strong>Shipping Fee:</strong> ₱ ${shipping.toFixed(2)}</div>
                <div class='text-right'><strong>Grand Total:</strong> ₱ ${(total + shipping).toFixed(2)}</div>
            </div>
            <div class='receipt-section'>Thank you for your order!</div>
            </body></html>
            `;
            resolve(html);
        });
    });
}

module.exports = getOrderReceiptHtml;
