const connection = require('../config/database');

// Get all items with their image (if any)
exports.getAllItems = (req, res) => {
    const sql = `SELECT i.item_id, i.name, i.description, i.category, i.cost_price, i.sell_price, i.show_item, s.quantity, img.image_path
                 FROM items i
                 LEFT JOIN stock s ON i.item_id = s.item_id
                 LEFT JOIN items_images img ON i.item_id = img.item_id`;
    try {
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error fetching items', details: err });
            }
            // If no image, image_path will be null due to LEFT JOIN
            return res.status(200).json({ success: true, items: rows });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error', details: error });
    }
};

// Get a single item by id with its stock quantity
exports.getSingleItem = (req, res) => {
    const sql = `SELECT i.item_id, i.name, i.description, i.category, i.cost_price, i.sell_price, i.show_item, s.quantity
                 FROM items i
                 LEFT JOIN stock s ON i.item_id = s.item_id
                 WHERE i.item_id = ?`;
    const values = [parseInt(req.params.id)];
    try {
        connection.execute(sql, values, (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error fetching item', details: err });
            }
            if (!rows.length) {
                return res.status(404).json({ error: 'Item not found' });
            }
            return res.status(200).json({ success: true, item: rows[0] });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error', details: error });
    }
};

// Create a new item and its stock
exports.createItem = (req, res) => {
    const { name, description, category, cost_price, sell_price, show_item = 'yes', quantity } = req.body;
    if (!name || !description || !category) {
        return res.status(400).json({ error: 'Missing required fields: name, description, category' });
    }
    const itemSql = `INSERT INTO items (name, description, category, cost_price, sell_price, show_item) VALUES (?, ?, ?, ?, ?, ?)`;
    const itemValues = [name, description, category, cost_price || null, sell_price || null, show_item];
    connection.execute(itemSql, itemValues, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error creating item', details: err });
        }
        const itemId = result.insertId;
        const stockSql = `INSERT INTO stock (item_id, quantity) VALUES (?, ?)`;
        connection.execute(stockSql, [itemId, quantity || 0], (err2) => {
            if (err2) {
                console.log(err2);
                return res.status(500).json({ error: 'Error creating stock', details: err2 });
            }
            return res.status(201).json({ success: true, item_id: itemId, message: 'Item created successfully' });
        });
    });
};

// Update an item and its stock
exports.updateItem = (req, res) => {
    const id = req.params.id;
    const { name, description, category, cost_price, sell_price, show_item, quantity } = req.body;
    if (!name || !description || !category) {
        return res.status(400).json({ error: 'Missing required fields: name, description, category' });
    }
    const itemSql = `UPDATE items SET name = ?, description = ?, category = ?, cost_price = ?, sell_price = ?, show_item = ? WHERE item_id = ?`;
    const itemValues = [name, description, category, cost_price || null, sell_price || null, show_item || 'yes', id];
    connection.execute(itemSql, itemValues, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error updating item', details: err });
        }
        const stockSql = `UPDATE stock SET quantity = ? WHERE item_id = ?`;
        connection.execute(stockSql, [quantity || 0, id], (err2) => {
            if (err2) {
                console.log(err2);
                return res.status(500).json({ error: 'Error updating stock', details: err2 });
            }
            return res.status(200).json({ success: true, message: 'Item updated successfully' });
        });
    });
};

// Delete an item and its stock
exports.deleteItem = (req, res) => {
    const id = req.params.id;
    // Delete stock first due to FK constraint
    const stockSql = `DELETE FROM stock WHERE item_id = ?`;
    connection.execute(stockSql, [id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error deleting stock', details: err });
        }
        const itemSql = `DELETE FROM items WHERE item_id = ?`;
        connection.execute(itemSql, [id], (err2) => {
            if (err2) {
                console.log(err2);
                return res.status(500).json({ error: 'Error deleting item', details: err2 });
            }
            return res.status(200).json({ success: true, message: 'Item deleted successfully' });
        });
    });
};
