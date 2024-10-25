CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);
CREATE TABLE projects (
    projectId INT AUTO_INCREMENT PRIMARY KEY,
    projectName VARCHAR(50) NOT NULL,
    projectStartDate DATE NOT NULL,
    projectFinishDate DATE NOT NULL,
    isFinished TINYINT DEFAULT 0,
    userId INT,
    CONSTRAINT FK_PROJECTS_USERS
        FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE tasks (
    taskId INT AUTO_INCREMENT PRIMARY KEY,
    taskName VARCHAR(50) NOT NULL,
    taskStartDate DATE NOT NULL,
    taskFinishDate DATE NOT NULL,
    taskDescription VARCHAR(1000),
    taskInitialDay INT,
    taskAddedDay INT DEFAULT 0,
    taskIsExpired TINYINT DEFAULT 0,
    taskStatus VARCHAR(50) DEFAULT 'Tamamlanacak',
    userId INT,
    projectId INT,
    CONSTRAINT FK_TASKS_USERS 
        FOREIGN KEY (userId) REFERENCES users(userId),
    CONSTRAINT FK_TASKS_PROJECTS
        FOREIGN KEY (projectId) REFERENCES projects(projectId)
);