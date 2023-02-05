const router = require('express').Router();
const { User, BlogPost } = require('../../models');

//temporary get all users for testing
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.findAll({
            include: [{model: BlogPost}]
        });
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json(err)
    }
})

//create a new user
router.post('/', async (req, res) => {
    try {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    
    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = userData.id
        req.session.username = userData.username
        res.status(200).json()
        console.log('session')
    })
    } catch (err) {
    console.log(err)
    res.status(500).json(err)
}
})


// login
router.post('/login', async (req, res) => {
    try {
    const userData = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(!userData) {
        res.status(400).json({message: "Incorrect email or password."})
    }

    const validatePass = await userData.checkPassword(req.body.password);

    if(!validatePass) {
        res.status(400).json({message: "Incorrect email or password."})
    }

    req.session.save(() =>  {
        req.session.loggedIn = true;
        req.session.userId = userData.id
        req.session.username = userData.username
        res.status(200).json({user: userData, message: "You are now logged in!"})
    })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


//logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
})


module.exports = router;