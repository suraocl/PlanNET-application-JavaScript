
const executeQuery = require("../helpers/queryDB");
const bcrypt = require('bcrypt');
const saltRounds = 10;


const register = async (req, res, next) => {
    try {
        const { userName, password, name } = req.body;

        const cryptedPassword = bcrypt.hashSync(password, saltRounds);


        const insertQuery = 'INSERT INTO users (userName, password, name) VALUES (?, ?, ?)';
        const values = [userName, cryptedPassword, name];

        await executeQuery(insertQuery, values);

        const userQuery = 'SELECT * FROM users WHERE userName = ?';
        const userResults = await executeQuery(userQuery, [userName]);

        res.status(201).send({
            success: true,
            message: 'Başarıyla Kayıt Oldun!',
            user: userResults[0],
            projects: [],
            tasks: []
            
        });

    } catch (error) {
        console.error('Hata: ' + error.message);
        res.status(500).send({
            success: false,
            message: 'Server Error'
        });
    }
};

const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;

        

        const userQuery = 'SELECT * FROM users WHERE userName = ?';
        const userResults = await executeQuery(userQuery, [userName]);

        if (userResults.length > 0) {
            const user = userResults[0];
            if (bcrypt.compareSync( password,user.password)) {
                const projectsQuery = 'SELECT * FROM projects WHERE userId = ?';
                const projectsResults = await executeQuery(projectsQuery, [user.userId]);

                const tasksQuery = 'SELECT * FROM tasks WHERE userId = ?';
                const tasksResults = await executeQuery(tasksQuery, [user.userId]);

                res.status(200).send({
                    success: true,
                    message: 'Başarıyla Giriş Yapıldı',
                    user,
                    projects: projectsResults,
                    tasks: tasksResults
                });
            } else {
                res.status(401).send({ success: false, message: 'Yanlış Bir Şifre Girdiniz' });
            }
        } else {
            res.status(401).send({ success: false, message: 'Böyle Bir Kullanıcı Bulunmadı' });
        }

    } catch (error) {
        console.error('Hata: ' + error.message);
        res.status(500).send({ success: false, message: 'Server Error' });
    }
};




module.exports = {
    login,
    register

}