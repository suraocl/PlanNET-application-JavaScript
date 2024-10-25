
const executeQuery = require("../helpers/queryDB");



const getUsersTasks = async (req, res) => {

    try {
        const { userId } = req.params;
        const combinedQuery = `
    SELECT tasks.*, projects.*, users.*
    FROM tasks
    INNER JOIN projects ON tasks.projectId = projects.projectId
    INNER JOIN users ON tasks.userId = users.userId -- Değişiklik burada
    WHERE tasks.userId = ?;
`;

        const combinedResults = await executeQuery(combinedQuery, [userId]);

        const query = `UPDATE tasks
                SET 
                    taskFinishDate = DATE_ADD(CURDATE(), INTERVAL 15 DAY),
                    taskIsExpired = 1,
                    taskAddedDay = taskAddedDay + 15
                WHERE 
                    taskFinishDate < CURDATE() AND 
                    taskStatus <> 'Tamamlandı';`

        await executeQuery(query);

        res.send({
            success: true,
            tasks: combinedResults
        });


    } catch (error) {
        console.log(error);
    }

}


const addTaskToProject = async (req, res) => {
    try {

        const { projectId } = req.params

        const { taskName, taskStartDate, taskFinishDate, taskInitialDay, taskDescription, userId } = req.body;

        console.log(userId, taskDescription);
        if (taskName == "" || taskStartDate > taskFinishDate || taskDescription == "" || taskInitialDay < 1 || !userId) {
            res.send({
                success: false
            })
            return
        }

        const query = `INSERT INTO tasks (taskName,taskDescription, taskStartDate, taskFinishDate, taskInitialDay, taskStatus, userId, projectId) 
        VALUES (?,?, STR_TO_DATE(?, '%Y-%m-%d'), STR_TO_DATE(?, '%Y-%m-%d'), ?, 'Tamamlanacak', ?, ?);`

        const values = [taskName, taskDescription, taskStartDate.slice(0, 10), taskFinishDate.slice(0, 10), taskInitialDay, userId, projectId];


        await executeQuery(query, values);
        res.send({
            success: true
        })



    } catch (error) {
        console.log(error);
    }
}


const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { taskName, taskStartDate, taskFinishDate, taskInitialDay, taskDescription, taskStatus } = req.body;

        console.log(taskStartDate)
        const startdate = new Date(taskStartDate);
        const stdate= startdate.setDate(startdate.getDate()+ 1)
        const sendstdate = new Date(stdate).toISOString().slice(0,10);

        const startdate2 = new Date(taskFinishDate);
        const stdate2= startdate.setDate(startdate2.getDate()+ 1)
        const sendstdate2 = new Date(stdate2).toISOString().slice(0,10);


        // Güncellenmiş SQL sorgusu
        const query = `
            UPDATE tasks 
            SET 
                taskName = ?,
                taskDescription = ?,
                taskStartDate = ?,
                taskFinishDate = ?,
                taskInitialDay = ?,
                taskStatus = ?
            WHERE taskId = ?;
        `;

        // Tarih formatlarına dokunmadan values dizisini oluştur
        const values = [taskName, taskDescription, sendstdate, sendstdate2, taskInitialDay, taskStatus, taskId];

        // Sorguyu veritabanına gönder
        await executeQuery(query, values);

        // Başarı durumunu geri döndür
        res.send({
            success: true,
        });

    } catch (error) {
        // Hata durumunu logla ve istemciye bildir
        console.error("Error in updateTask:", error);
        res.status(500).send({
            success: false,
            error: "Internal Server Error",
        });
    }
};
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // SQL sorgusu ile belirtilen taskId'ye sahip görevi sil
        const query = `
            DELETE FROM tasks
            WHERE taskId = ?;
        `;

        // taskId'yi values dizisine ekleyerek sorguyu veritabanına gönder
        const values = [taskId];
        await executeQuery(query, values);

        // Başarı durumunu geri döndür
        res.send({
            success: true,
        });

    } catch (error) {
        // Hata durumunu logla ve istemciye bildir
        console.error("Error in deleteTask:", error);
        res.status(500).send({
            success: false,
            error: "Internal Server Error",
        });
    }
};


module.exports = {
    getUsersTasks,
    addTaskToProject,
    updateTask,
    deleteTask
}