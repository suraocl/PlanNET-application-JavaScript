const express = require('express')
const router = express.Router()

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const projectRouter = require("./projectRouter");
const tasksRouter = require("./tasksRouter");

router.get('/', (req, res) => {
  res.send('api home page')
})


router.use('/user', userRouter);
router.use('/tasks', tasksRouter);
router.use('/auth', authRouter);
router.use('/projects', projectRouter);

module.exports = router