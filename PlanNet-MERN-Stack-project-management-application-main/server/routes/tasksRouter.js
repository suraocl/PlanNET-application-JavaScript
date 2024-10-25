const express = require('express');
const { getUsersTasks, addTaskToProject,updateTask, deleteTask } = require('../controllers/tasksController');
const router = express.Router()

router.use(express.json());



router.get('/getUsersTasks/:userId', getUsersTasks)
router.post('/addTaskToProject/:projectId', addTaskToProject)
router.put('/updateTask/:taskId', updateTask)
router.delete('/deleteTask/:taskId', deleteTask)

module.exports = router