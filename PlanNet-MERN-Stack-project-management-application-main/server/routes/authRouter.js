const express = require('express')
const { login, register } = require('../controllers/authController')
const router = express.Router()

router.use(express.json());

router.get('/', (req, res) => {
    res.send('auth home page')
})


router.post('/login', login)
router.post('/register', register)

module.exports = router