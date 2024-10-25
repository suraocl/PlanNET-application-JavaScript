const mysqlConnection = require("../helpers/connectDB");

const executeQuery = require("../helpers/queryDB");

const getListUsers = async (req,res) => {
    try {

        const userQuery = 'SELECT * FROM users';
        const queryResults = await executeQuery(userQuery);

        res.send(
            {
                success: true,
                users: queryResults
            }
        )


    } catch (error) {
        console.log(error);
    }
}

const getUserDetails = async (req,res) => {
    try {

        const {userId} = req.params

        const userQuery = 'SELECT * FROM users WHERE userId = ?';
        const queryResults = await executeQuery(userQuery, [userId]);

        const projectsQuery = `
    SELECT projects.*, users.* 
    FROM projects 
    INNER JOIN users ON projects.userId = users.userId
    WHERE projects.userId = ?
`;
        const projectsResults = await executeQuery(projectsQuery, [userId]);

        const tasksQuery = `
            SELECT tasks.*, projects.*, users.*
            FROM tasks
            INNER JOIN projects ON tasks.projectId = projects.projectId
            INNER JOIN users ON projects.userId = users.userId
            WHERE tasks.userId = ?;
        `;

        const tasksResults = await executeQuery(tasksQuery, [userId]);

        res.send(
            {
                success: true,
                user: queryResults,
                projects: projectsResults,
                tasks: tasksResults
            }
        )


    } catch (error) {
        console.log(error);
    }
}

const getCountTasks = async (req, res) => {
    try {
        const { userId } = req.params;

        // SQL sorgusu ile belirtilen taskId'ye sahip görevi sil
        const query = `
            SELECT COUNT(*) AS taskCount
            FROM tasks
            WHERE userId = ? AND taskIsExpired = 0 AND taskStatus = "Tamamlandı";`;
        const query2 = `
            SELECT COUNT(*) AS taskCount
            FROM tasks
            WHERE userId = ? AND taskIsExpired = 1 AND taskStatus = "Tamamlandı";`;

        // taskId'yi values dizisine ekleyerek sorguyu veritabanına gönder
        const notExpiredTaskCount = await executeQuery(query, [userId]);
        const expiredTaskCount = await executeQuery(query2, [userId]);

        console.log(expiredTaskCount);

        // Başarı durumunu geri döndür
        res.send({
            success: true,
            notExpiredTaskCount: 0 || notExpiredTaskCount[0].taskCount,
            expiredTaskCount: 0 || expiredTaskCount[0].taskCount 
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getListUsers,
    getUserDetails,
    getCountTasks

}