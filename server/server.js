const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');

// Configure multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });

const upload = multer({ storage: storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());


// API to get all user profiles
app.get('/api/userProfiles', (req, res) => {
  fs.readFile('userData.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(JSON.parse(data));
  });
});


// // API to upload profile image
// app.post('/api/uploadProfileImage', upload.single('profileImage'), (req, res) => {
//   console.log(req.file);
//   res.json({ message: 'Profile image uploaded' });
// });

// API to register a new user
app.post('/api/register', upload.single('profileImage'), (req, res) => {
  const { username, email } = req.body;

  fs.readFile('userData.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    const users = JSON.parse(data);

    // Check if the username or email already exists
    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
      // If the user exists, send a 409 Conflict response
      return res.status(409).json({ message: 'Username or email already in use' });
    }

    // req.file is the 'profileImage' file
    // req.body will hold the text fields, if there were any
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      gender: req.body.gender ? req.body.gender : null, 
      profileImage: req.file ? req.file.path : null
    };
  
    users.push(newUser);
    fs.writeFile('userData.json', JSON.stringify(users,null,2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({message: 'New user registered'});
    });
  });
});

// API to log in a user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('userData.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    const users = JSON.parse(data);
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      res.json({ message: 'User logged in' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// API to get user details
app.get('/api/userDetails/:username', (req, res) => {
  const { username } = req.params;

  fs.readFile('userData.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    const users = JSON.parse(data);
    const user = users.find(user => user.username === username);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});
// Now, in your frontend, you can use the profileImage path to display the image. For example, if you're using HTML, you can do something like this:
{/* <img src="http://localhost:3000/uploads/image.jpg" alt="Profile Image">  */}

// API to update user details
app.put('/api/userDetails/:username', upload.single('profileImage'), (req, res) => {
  // console.log('Received PUT request'); // Step 1
  // console.log(req.body); // Step 2
  const { username } = req.params;
  const updatedUserDetails = req.body;

  fs.readFile('userData.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    const users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.username === username);

    // console.log('User index:', userIndex); // Debug Step 3

    if (userIndex !== -1) {
      // If the user has provided a new image, update the profileImage field
      if (req.file) {
        updatedUserDetails.profileImage = req.file.path;
      }

      // Update the user's details
      users[userIndex] = { ...users[userIndex], ...updatedUserDetails };

      // console.log('Updated user details:', users[userIndex]); // Debug Step 4

      fs.writeFile('userData.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        res.json(users[userIndex]);
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

// checkout api
app.post('/api/checkout', (req, res) => {
  const { username, productName, quantity, billAmount, Address, phoneNumber } = req.body;

  fs.readFile('userData.json', 'utf8', (err, data) => {
      if (err) {
          res.status(500).send('Error reading user data');
          return;
      }

      const users = JSON.parse(data);
      // console.log(users);
      const user = users.find(user => user.username === username);

      if (!user) {
          // console.log("sent one: "+ username);
          res.status(404).send('User not found');
          return;
      }

      const order = { 
        id: uuidv4(), // assign a unique order ID
        date: new Date(), // assign the current date/time
        productName, 
        quantity, 
        billAmount, 
        Address, 
        phoneNumber 
    };

      // const order = { productName, quantity, billAmount, Address, phoneNumber };
      if (!user.orderHistory) {
          user.orderHistory = [];
      }
      user.orderHistory.push(order);

      fs.writeFile('userData.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
          if (err) {
              res.status(500).send('Error updating user data');
              return;
          }

          res.send('Order placed successfully');
      });
  });

});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});