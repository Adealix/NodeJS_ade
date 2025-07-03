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
  const sql = 'SELECT id, name, email, password FROM users WHERE email = ? AND deleted_at IS NULL';
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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,);

    return res.status(200).json({
      success: "welcome back",
      user: results[0],
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
  const { title, fname, lname, addressline, town, zipcode, phone, userId, } = req.body;

  if (req.file) {
    image = req.file.path.replace(/\\/g, "/");
  }
  //     INSERT INTO users(user_id, username, email)
  //   VALUES(1, 'john_doe', 'john@example.com')
  // ON DUPLICATE KEY UPDATE email = 'john@example.com';
  const userSql = `
  INSERT INTO customer 
    (title, fname, lname, addressline, town, zipcode, phone, image_path, user_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    title = VALUES(title),
    fname = VALUES(fname),
    lname = VALUES(lname),
    addressline = VALUES(addressline),
    town = VALUES(town),
    zipcode = VALUES(zipcode),
    phone = VALUES(phone),
    image_path = VALUES(image_path)`;
  const params = [title, fname, lname, addressline, town, zipcode, phone, image, userId];

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

module.exports = { registerUser, loginUser, updateUser, deactivateUser };