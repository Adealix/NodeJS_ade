const connection = require('../config/database');
// const sendEmail = require('../utils/sendEmail')

exports.createOrder = (req, res, next) => {
    const { cart, user } = req.body;
    if (!user || !user.id || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ error: 'Missing user or cart is empty.' });
    }

    const dateOrdered = new Date();
    // No dateShipped at order creation, set to NULL
    const dateShipped = null;

    connection.beginTransaction(err => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Transaction error', details: err });
        }

        // Get customer_id from userId
        const sql = 'SELECT customer_id, email FROM customer c INNER JOIN users u ON u.id = c.user_id WHERE u.id = ?';
        connection.execute(sql, [parseInt(user.id)], (err, results) => {
            if (err || results.length === 0) {
                return connection.rollback(() => {
                    if (!res.headersSent) {
                        res.status(500).json({ error: 'Customer not found', details: err });
                    }
                });
            }

            const { customer_id, email } = results[0];

            // Insert into orders table
            const orderSql = 'INSERT INTO orders (customer_id, date_ordered, status) VALUES (?, ?, ?)';
            connection.execute(orderSql, [customer_id, dateOrdered, 'processing'], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        if (!res.headersSent) {
                            res.status(500).json({ error: 'Error inserting order', details: err });
                        }
                    });
                }

                const order_id = result.insertId;

                // Insert each cart item into orderline and update stock
                const orderLineSql = 'INSERT INTO orderline (order_id, item_id, quantity) VALUES (?, ?, ?)';
                const stockSql = 'UPDATE stock SET quantity = quantity - ? WHERE item_id = ? AND quantity >= ?';
                let errorOccurred = false;
                let completed = 0;

                console.log('Cart received for order:', cart);
                cart.forEach((item, idx) => {
                    console.log('Cart item:', item);
                    // Validate item_id and quantity
                    if (typeof item.item_id === 'undefined' || typeof item.quantity === 'undefined') {
                        errorOccurred = true;
                        return connection.rollback(() => {
                            if (!res.headersSent) {
                                res.status(400).json({ error: 'Cart item missing item_id or quantity', item });
                            }
                        });
                    }
                    // Insert into orderline
                    connection.execute(orderLineSql, [order_id, item.item_id, item.quantity], (err) => {
                        if (err && !errorOccurred) {
                            errorOccurred = true;
                            return connection.rollback(() => {
                                if (!res.headersSent) {
                                    res.status(500).json({ error: 'Error inserting orderline', details: err });
                                }
                            });
                        }
                    });
                    // Deduct from stock
                    connection.execute(stockSql, [item.quantity, item.item_id, item.quantity], (err, stockResult) => {
                        if ((err || stockResult.affectedRows === 0) && !errorOccurred) {
                            errorOccurred = true;
                            return connection.rollback(() => {
                                if (!res.headersSent) {
                                    res.status(500).json({ error: 'Stock error: insufficient stock or update failed', details: err });
                                }
                            });
                        }
                        completed++;
                        if (completed === cart.length && !errorOccurred) {
                            connection.commit(err => {
                                if (err) {
                                    return connection.rollback(() => {
                                        if (!res.headersSent) {
                                            res.status(500).json({ error: 'Commit error', details: err });
                                        }
                                    });
                                }
                                if (!res.headersSent) {
                                    res.status(201).json({
                                        success: true,
                                        order_id,
                                        dateOrdered,
                                        message: 'Order placed successfully!',
                                        cart
                                    });
                                }
                            });
                        }
                    });
                });
            });
        });
    });
};

