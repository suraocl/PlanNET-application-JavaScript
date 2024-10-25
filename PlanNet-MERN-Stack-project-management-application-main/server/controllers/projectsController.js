
const executeQuery = require("../helpers/queryDB");


const getAllProjects = async (req, res) => {

    try {

        const { showAllProjects } = req.body

        const projectQuery = showAllProjects
            ?
            `
        SELECT projects.*, users.*
        FROM projects
        INNER JOIN users ON projects.userId = users.userId
        WHERE projects.userId = users.userId
        ORDER BY projects.projectId DESC`
            :
            `
        SELECT projects.*, users.*
        FROM projects
        INNER JOIN users ON projects.userId = users.userId
        WHERE projects.projectFinishDate > CURDATE() OR projects.projectFinishDate IS NULL
        ORDER BY projects.projectId DESC;
    `;
        const projectResults = await executeQuery(projectQuery);


        res.send({
            success: true,
            projects: projectResults
        })


    } catch (error) {
        console.log(error);
    }




}


const getUsersHaveTaskOnProject = async (req, res) => {
    try {
        const { projectId } = req.params

        const findQuery = `SELECT
        u.userId,
        u.name,
        u.userName,
        CASE
            WHEN t.taskId IS NOT NULL THEN 'Görevi Var'
            ELSE 'Görevi Yok'
        END AS taskStatusInProject
        FROM
        users u
        LEFT JOIN
        tasks t ON u.userId = t.userId AND t.projectId = ?;`

        const result = await executeQuery(findQuery, [projectId]);
        res.send(
            {
                success: true,
                data: result
            }
        )

    } catch (error) {
        console.log(error);
    }
}

const getTasksOnProject = async (req, res) => {
    try {
        const { projectId } = req.params
        const query = `SELECT 
        tasks.taskId,
        tasks.taskName,
        tasks.taskStartDate,
        tasks.taskFinishDate,
        tasks.taskDescription,
        tasks.taskInitialDay,
        tasks.taskAddedDay,
        tasks.taskIsExpired,
        tasks.taskStatus,
        users.userId AS ownerId,
        users.name AS ownerName,
        users.userName AS ownerUserName
    FROM 
        tasks
    JOIN
        users ON tasks.userId = users.userId
    WHERE
        tasks.projectId = ?;`

        const result = await executeQuery(query, [projectId]);

        res.send(
            {
                success: true,
                data: result
            }
        )



    } catch (error) {
        console.log(error);
    }
}

const createProject = async (req, res) => {
    try {


        const { projectName, projectStartDate, projectFinishDate, userId } = req.body;


        if(projectName == "" || projectStartDate > projectFinishDate){
            res.send({
                success: false
            })
            return
        }



        const insertQuery = `INSERT INTO projects (projectName, projectStartDate, projectFinishDate, userId ) 
        VALUES (? , STR_TO_DATE( ? , '%Y-%m-%d'), STR_TO_DATE( ? , '%Y-%m-%d'), ?);`
        const values = [projectName, projectStartDate.slice(0, 10), projectFinishDate.slice(0, 10), userId];

        await executeQuery(insertQuery, values).catch(() => {

            res.send({
                success: false
            })
        });
        res.send({
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}

const getUsersProjects = async (req, res) => {

    try {

        const { userId } = req.params
        console.log(userId);
        const projectQuery = `
        SELECT
        u.userId AS userId,
        u.name AS name,
        p.projectId AS projectId,
        p.projectName AS projectName,
        p.projectStartDate AS projectStartDate,
        p.projectFinishDate AS projectFinishDate,
        p.isFinished AS isFinished
    FROM
        users u
    JOIN
        projects p ON u.userId = p.userId
    WHERE
        u.userId = ?
        ORDER BY p.projectId DESC
        ;
        `;
        const projectResults = await executeQuery(projectQuery, [userId]);

        res.send({
            success: true,
            projects: projectResults
        })


    } catch (error) {
        console.log(error);
    }

}
const getProjectEmployees = async (req, res) => {
    try {
        const { projectId } = req.params
        const query = `SELECT
        u.userId,
        u.name,
        u.userName
    FROM
        users u
    JOIN
        tasks t ON u.userId = t.userId AND t.projectId = ?;
    `

        const result = await executeQuery(query, [projectId]);

        res.send(
            {
                success: true,
                data: result
            }
        )



    } catch (error) {
        console.log(error);
    }
}
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        // Projeyi silmeden önce projeye bağlı görevleri silelim
        const deleteTasksQuery = `
            DELETE FROM tasks
            WHERE projectId = ?;
        `;
        await executeQuery(deleteTasksQuery, [projectId]);

        // Şimdi projeyi sil
        const deleteProjectQuery = `
            DELETE FROM projects
            WHERE projectId = ?;
        `;
        await executeQuery(deleteProjectQuery, [projectId]);

        // Başarı durumunu geri döndür
        res.send({
            success: true,
        });

    } catch (error) {
        // Hata durumunu logla ve istemciye bildir
        console.error("Error in deleteProject:", error);
        res.status(500).send({
            success: false,
            error: "Internal Server Error",
        });
    }
};
module.exports = {
    getAllProjects,
    createProject,
    getUsersProjects,
    getUsersHaveTaskOnProject
    ,
    getProjectEmployees,
    getTasksOnProject,
    deleteProject
}