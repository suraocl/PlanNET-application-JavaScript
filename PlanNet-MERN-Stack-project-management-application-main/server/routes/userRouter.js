const express = require('express')
const mysqlConnection = require('../helpers/connectDB')
const { getListUsers, getUserDetails, getCountTasks } = require('../controllers/userController')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('user home page')
})

router.get("/getUserDetails/:userId" , getUserDetails)
router.get("/getCountTasks/:userId" , getCountTasks)
router.get('/list', getListUsers)

module.exports = router