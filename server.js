const express = require('express');
const mongoDb = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { v4: uuidv4 } = require('uuid');
// const cors = require('cors')

//Initialize Express
const app = express();

//Connect to Db
mongoDb();

//Middleware
// app.use(cors());
app.use(express.json());

//Sample route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.post('/api/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        // check if user already exist
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                msg: 'User Already Exist'
            });
        }
        const userId = uuidv4();

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        user = new User({
            userId,
            name,
            email,
            password: hashedPassword,
        })

        //save the user to the database  
        await user.save();

        //return userId
        res.status(201).json({ userId }); 

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));