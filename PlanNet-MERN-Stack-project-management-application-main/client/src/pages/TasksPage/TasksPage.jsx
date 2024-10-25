import { useEffect, useState } from "react";
import "./TasksPage.css"
import { useParams } from "react-router-dom";
import EachTask from "../../components/EachTask/EachTask";
import { useSelector } from "react-redux";
function TasksPage() {

    const { logged, loggedUser } = useSelector(state => state.auth);
    const [tasks, settasks] = useState();
    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/tasks/getUsersTasks/" + loggedUser.user.userId);
            const data = await response.json();

            settasks(data.tasks)


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTasks();
    }, [])

    return (
        <div className="col-10 d-flex flex-column">
            <span className="calisanlartext">GÖREVLERİM</span>
            <div className="d-flex flex-wrap overflow-auto">
                 {tasks && tasks.length == 0 && <span className="ct mx-5" style={{fontSize: "24px"}}>Hiç Görevin Yok</span>}
                {tasks?.map((element) => {
                    return (<EachTask getTasks={fetchTasks} key={element.taskId} task={element}></EachTask>)
                })}

            </div>

        </div>
    );
}

export default TasksPage;