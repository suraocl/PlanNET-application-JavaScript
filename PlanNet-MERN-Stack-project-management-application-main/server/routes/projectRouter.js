const express = require('express');
const { getAllProjects, createProject,getProjectEmployees, getUsersProjects,getTasksOnProject, getUsersHaveTaskOnProject, deleteProject } = require('../controllers/projectsController');
const router = express.Router()

router.use(express.json());



router.post('/list', getAllProjects)
router.post('/create', createProject)

router.delete('/deleteProject/:projectId', deleteProject)

router.get('/getUsersProjects/:userId', getUsersProjects)

router.get("/getTasksOnProject/:projectId", getTasksOnProject)
router.get("/getProjectEmployees/:projectId", getProjectEmployees)


router.get("/getUsersHaveTaskOnProject/:projectId" , getUsersHaveTaskOnProject)
module.exports = router