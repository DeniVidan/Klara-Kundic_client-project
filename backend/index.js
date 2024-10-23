const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 3001
const mockDB = require('./mockDB.json');
const { router, authenticate } = require('./src/auth');

app.use(cors({
  origin: ['http://localhost:3000']
}));
app.use(bodyParser.json());

/* const users = [
  { id: 1, email: 'deni', password: '123' },
  { id: 2, email: 'proba', password: '123123' }
];
 */
app.get('/', (req, res) => {
  res.send('Hello World!')
  //console.log(mockDB.users)
})
app.use('/api', router);

app.get('/protected', authenticate, (req, res) => {
  // Access user information attached to the request
  const user = req.user;
  res.json({ message: 'Protected resource accessed', user });
});
/* app.post('/api/login', (req, res) => {
  console.log("piši")
  const { email, password } = req.body;
  const user = mockDB.users.find(u => u.email === email && u.password === password);
  if (user) {
    // Here you can use JWT or session-based authentication
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})