const connection = require('../config/database');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  // Expecting: { "last_name": "...", "first_name": "...", "email": "...", "password": "..." }
  const { last_name, first_name, email, password } = req.body;
  if (!last_name || !first_name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert into users table (status and role default to 'active' and 'user')
    const userSql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    connection.execute(userSql, [email, hashedPassword], (err, userResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error creating user', details: err });
      }
      const userId = userResult.insertId;
      // Insert into customer table (other fields left as NULL)
      const customerSql = `INSERT INTO customer (last_name, first_name, user_id) VALUES (?, ?, ?)`;
      connection.execute(customerSql, [last_name, first_name, userId], (err2, customerResult) => {
        if (err2) {
          console.log(err2);
          return res.status(500).json({ error: 'Error creating customer', details: err2 });
        }
        return res.status(201).json({ success: true, user_id: userId, customer_id: customerResult.insertId });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error', details: error });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT u.id, u.email, u.password, c.customer_id, c.last_name, c.first_name, c.address, c.city, c.phone
               FROM users u
               LEFT JOIN customer c ON u.id = c.user_id
               WHERE u.email = ?`;
  connection.execute(sql, [email], async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error logging in', details: err });
    }
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Remove password from response
    delete user.password;
    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET);
    

    return res.status(200).json({
      success: "welcome back",
      user,
      token
    });
  });
};

const updateUser = (req, res) => {
  // {
  //   "name": "steve",
  //   "email": "steve@gmail.com",
  //   "password": "password"
  // }
  console.log(req.body, req.file)
  const { title, last_name, first_name, address, city, zipcode, phone, userId, } = req.body;

  let image = null;
  if (req.file) {
    image = req.file.path.replace(/\\/g, "/");
  }
  //     INSERT INTO users(user_id, username, email)
  //   VALUES(1, 'john_doe', 'john@example.com')
  // ON DUPLICATE KEY UPDATE email = 'john@example.com';
  const userSql = `
  INSERT INTO customer 
    (title, last_name, first_name, address, city, zipcode, phone, image_path, user_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    title = VALUES(title),
    last_name = VALUES(last_name),
    first_name = VALUES(first_name),
    address = VALUES(address),
    city = VALUES(city),
    zipcode = VALUES(zipcode),
    phone = VALUES(phone),
    image_path = VALUES(image_path)`;
  const params = [title, last_name, first_name, address, city, zipcode, phone, image, userId];

  try {
    connection.execute(userSql, params, (err, result) => {
      if (err instanceof Error) {
        console.log(err);

        return res.status(401).json({
          error: err
        });
      }

      return res.status(200).json({
        success: true,
        message: 'profile updated',
        result
      })
    });
  } catch (error) {
    console.log(error)
  }

};

const deactivateUser = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const sql = 'UPDATE users SET deleted_at = ? WHERE email = ?';
  const timestamp = new Date();

  connection.execute(sql, [timestamp, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error deactivating user', details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'User deactivated successfully',
      email,
      deleted_at: timestamp
    });
  });
};

// Get customer info by email (for autofill, no password required)
const getCustomerByEmail = (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email is required' });

const sql = `SELECT u.id, u.email, c.customer_id, c.last_name, c.first_name, c.title, c.address, c.city, c.zipcode, c.phone,
             FROM users u
             LEFT JOIN customer c ON u.id = c.user_id
             WHERE u.email = ?`;
  connection.execute(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching customer', details: err });
    if (!results.length) return res.status(404).json({ error: 'No customer found' });
    res.status(200).json({ success: true, customer: results[0] });
  });
};

const getCustomerByUserId = (req, res) => {
  const userId = req.query.user_id || req.params.user_id;
  if (!userId) return res.status(400).json({ error: 'user_id is required' });

  const sql = `
    SELECT u.id, u.email, c.customer_id, c.title, c.last_name, c.first_name, c.address, c.city, c.zipcode, c.phone
    FROM users u
    LEFT JOIN customer c ON u.id = c.user_id
    WHERE u.id = ?
  `;
  connection.execute(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching customer', details: err });
    if (!results.length) return res.status(404).json({ error: 'No customer found' });
    res.status(200).json({ success: true, customer: results[0] });
  });
};

module.exports = { registerUser, loginUser, updateUser, deactivateUser, getCustomerByEmail, getCustomerByUserId };