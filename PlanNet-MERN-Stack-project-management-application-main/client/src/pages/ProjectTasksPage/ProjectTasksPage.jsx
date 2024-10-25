import "./ProjectTasksPage.css"
import reminder from "../../../assets/images/reminder.png";
import days from "../../../assets/images/days.png";
import calendaricon from "../../../assets/images/calendar.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import person from "../../../assets/images/user.png";

import pencilicon from "../../../assets/images/pencil.png";
import dateicon from "../../../assets/images/date.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EachTaskProjectTasks from "./EachTaskProjectTasks";

function ProjectTasksPage() {


    let { projectId } = useParams();

    const [users, setusers] = useState([]);


    const fetchUsersTasks = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/projects/getUsersHaveTaskOnProject/" + projectId);
            const data = await res.json();

            setusers(data.data)

        } catch (error) {
            console.log(error);

        }


    }

    useEffect(() => {
        fetchUsersTasks();
    }, [])



    const [taskData, setTaskData] = useState({
        taskName: "",
        taskStartDate: new Date(),
        taskFinishDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        taskInitialDay: 15,
        taskDescription: ""
    });

    const handleInputChange = (fieldName, value) => {
        setTaskData({
            ...taskData,
            [fieldName]: value,
        });
    };


    const handleCreateTask = async () => {

        try {

            const res = await fetch("http://localhost:5000/api/tasks/addTaskToProject/" + projectId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            });

            const data = await res.json();
            if (data.success) {
                toast.success(` ${taskData.taskName} Görevi Oluşturuldu!`, {
                    position: "bottom-center",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                fetchTasksOnProject()
                fetchUsersTasks()
                document.querySelector("#selectt").selectedIndex = 0
                setTaskData({
                    taskName: "",
                    taskStartDate: new Date(),
                    taskFinishDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                    taskInitialDay: 10,
                    taskDescription: ""
                })


            } else {
                toast.error(` Bir Hata Oluştu`, {
                    position: "bottom-center",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })

            }
        } catch (error) {
            console.log(error);
        }
    }






    const [tasksOnProject, setTasksOnProject] = useState([]);


    const fetchTasksOnProject = async () => {
        try {

            const res = await fetch("http://localhost:5000/api/projects/getTasksOnProject/" + projectId);
            const data = await res.json();

            setTasksOnProject(data.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTasksOnProject()
    }, []);





    return (
        <div className="col-10">
            <div className="row">
                <div className="outt row">
                    <div className="d-flex deee flex-column col-7">
                        <span className="calisanlartext">GÖREVLER</span>
                        {tasksOnProject && tasksOnProject.length == 0 && <span style={{fontSize: "24px"}} className="ct mx-5">Hiç Görev Eklenmemiş</span>}

                        <div className=" overflow-auto deee flex-wrap d-flex flex-column align-items-center ">
                                <div>
                                    
                                {tasksOnProject?.length > 0 && tasksOnProject.map((element) => {
                                    return (<EachTaskProjectTasks getTasks={fetchTasksOnProject} key={element.taskId} task={element}></EachTaskProjectTasks>)
                                })}
                                </div>
                        </div>

                    </div>
                    <div className="col-5 center">
                        <div className="addtask center flex-column">
                            <h2 className="ct">Görev Ekle</h2>
                            <label htmlFor="taskName" className="eklelabel">
                                <img width={25} src={reminder} alt="" />
                                <input
                                    type="text"
                                    name="taskName"
                                    placeholder="Görev İsmi"
                                    className="ekleinput"
                                    value={taskData.taskName}
                                    onChange={(e) => handleInputChange("taskName", e.target.value)}
                                />
                            </label>

                            <label
                                htmlFor="selectt"
                                className="eklelabel"
                            >
                                <img width={25} src={person} alt="" />
                                <select className="selecting"
                                    onChange={(e) => handleInputChange("userId", Number(e.target.value))} name="selectt" id="selectt">
                                    <option value={0} >Çalışacak Kişi</option>
                                    {users.map((element) => {
                                        return (element.taskStatusInProject == "Görevi Yok" ?
                                            <option key={element.userId} value={element.userId} >{element.name}</option>
                                            :
                                            <option key={element.userId} value={element.userId} disabled>{element.name} (Zaten Görevi Var)</option>
                                        )
                                    })}
                                </select></label>
                            <label
                                htmlFor="startDate"
                                className="eklelabel"
                            >
                                <img width={25} src={calendaricon} alt="" />
                                <DatePicker
                                    className="ekleinputt"
                                    selected={taskData.taskStartDate}
                                    onChange={(date) => handleInputChange("taskStartDate", date)}
                                />
                            </label>
                            <label
                                htmlFor="startDate"
                                className="eklelabel"
                            >
                                <img width={25} src={calendaricon} alt="" />
                                <DatePicker
                                    className="ekleinputt"
                                    selected={taskData.taskFinishDate}
                                    onChange={(date) => handleInputChange("taskFinishDate", date)}
                                />
                            </label>

                            <label htmlFor="taskName" className="eklelabel">
                                <img width={25} src={days} alt="" />
                                <input
                                    type="text"
                                    name="taskName"
                                    placeholder="Adım Gün Değeri"
                                    value={taskData.taskInitialDay}
                                    onChange={(e) => handleInputChange("taskInitialDay", e.target.value)}
                                    className="ekleinput"
                                />
                            </label>

                            <textarea
                                className="textareeaa"
                                placeholder="Açıklama"
                                value={taskData.taskDescription}
                                onChange={(e) => handleInputChange("taskDescription", e.target.value)}
                                name="asd" id="" cols="30" rows="5">

                            </textarea>

                            <button className="buttoncreatee" onClick={handleCreateTask}>Oluştur</button>

                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default ProjectTasksPage;