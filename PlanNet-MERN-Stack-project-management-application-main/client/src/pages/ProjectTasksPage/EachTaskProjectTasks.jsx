import "./ProjectTasksPage.css"

import reminder from "../../../assets/images/reminder.png";
import days from "../../../assets/images/days.png";
import calendaricon from "../../../assets/images/calendar.png";
import person from "../../../assets/images/user.png";
import taskicon from "../../../assets/images/to-do-list.png";
import save from "../../../assets/images/diskette.png";
import trash from "../../../assets/images/trash-can.png";
import waiting from "../../../assets/images/waiting.png";
import checked from "../../../assets/images/checked.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editicon from "../../../assets/images/edit-text.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function EachTaskProjectTasks({ task, getTasks }) {

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

    const [editMode, seteditMode] = useState(false);


    const [taskData, setTaskData] = useState(task);



    const handleInputChange = (fieldName, value) => {
        setTaskData({
            ...taskData,
            [fieldName]: value,
        });
    };
    console.log(task);

    const startDate = new Date(taskData?.taskStartDate);
    const gun = startDate.getUTCDate().toString().padStart(2, '0');
    const ay = (startDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const yil = startDate.getUTCFullYear();

    const startDateFormatted = `${gun}.${ay}.${yil}`

    const endDate = new Date(taskData?.taskFinishDate);
    const gun1 = endDate.getUTCDate().toString().padStart(2, '0');
    const ay1 = (endDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const yil1 = endDate.getUTCFullYear();

    const endDateFormatted = `${gun1}.${ay1}.${yil1}`

    console.log(taskData);


    const handleSaveButton = async () => {
        try {

            const response = await fetch("http://localhost:5000/api/tasks/updateTask/" + task.taskId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json()

            if (data.success) {
                toast.success(`Görev Kaydedildi`, {
                    position: "bottom-center",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })
                seteditMode(false)
                getTasks();


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

    const handleDeleteButton = async () => {
        try {

            await fetch("http://localhost:5000/api/tasks/deleteTask/" + task.taskId, {
                method: "DELETE"
            })

            getTasks();
            fetchUsersTasks();

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={task?.taskStatus == "Tamamlandı" ? `eachtaskprojects row mt-5 backk` : `eachtaskprojects row mt-5`}>
            <div className="col-6 d-flex flex-column justify-content-around">
                <div className="d-flex flex-column align-items-center justify-content-center ffc ">
                    <div className="d-flex align-items-center  aad">
                        <img width={35} src={taskicon} alt="" />
                        <div className="mr-5">
                            {editMode ?
                            <input
                                type="text"
                                name="taskName"
                                placeholder="Görev İsmi"
                                className="ekleinput"
                                value={taskData.taskName}
                                onChange={(e) => handleInputChange("taskName", e.target.value)}
                            />

                            :

                            <span className="colored">{taskData?.taskName}</span>
                        }

                        </div>
                        
                    </div>
                    <div className="d-flex align-items-center aad">
                        <img width={35} src={person} alt="" />
                        <div className="mr-5">
                            {editMode ?

                            <select className="selecting" onChange={(e) => handleInputChange("userId", Number(e.target.value))} name="selectt" id="selectt">
                                <option value={0} >Çalışacak Kişi</option>
                                {users.map((element) => {
                                    return (element.taskStatusInProject == "Görevi Yok" ?
                                        <option value={element.userId} >{element.name}</option>
                                        :
                                        <option value={element.userId} disabled>{element.name} (Zaten Görevi Var)</option>
                                    )
                                })}
                            </select>

                            :

                            <span className="colored">{taskData?.ownerName}</span>
                        }
                        </div>
                        

                    </div>
                    <div className="d-flex align-items-center aad">
                        <img width={35} src={calendaricon} alt="" />
                        <div className="mr-5">
                            
                        {editMode ?
                            <DatePicker
                                className="ekleinputt"
                                selected={new Date(taskData.taskStartDate) - 1}
                                onChange={(date) => handleInputChange("taskStartDate", date)}
                            />

                            :

                            <span className="colored">{startDateFormatted}</span>
                        }
                        </div>

                    </div>
                    <div className="d-flex align-items-center aad">
                        <img width={35} src={calendaricon} alt="" />
                        <div className="mr-5">
                            
                        {editMode ?
                            <DatePicker
                                className="ekleinputt"
                                selected={new Date(taskData.taskFinishDate) - 1}
                                onChange={(date) => handleInputChange("taskFinishDate", date)}
                            />

                            :

                            <span className="colored">{endDateFormatted}</span>
                        }
                        </div>

                    </div>
                    <div className="d-flex align-items-center aad">
                        <img width={35} src={days} alt="" />
                        <div className="mr-5">
                            {editMode ?
                                <input
                                    type="text"
                                    name="taskName"
                                    placeholder="Adım Gün Değeri"
                                    value={taskData.taskInitialDay}
                                    onChange={(e) => handleInputChange("taskInitialDay", e.target.value)}
                                    className="ekleinput"
                                />

                                :

                                <span className="colored">{taskData?.taskInitialDay} Gün</span>
                            }

                        </div>

                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mx-3">
                    <div className="d-flex">
                        <div onClick={() => seteditMode(!editMode)} className="cp mx-1">
                            <img src={editicon} width={20} alt="" />
                        </div>
                        <div className="cp  mx-1">
                            {task != taskData ?
                                <img onClick={handleSaveButton} src={save} width={20} alt="" /> : <></>}
                        </div>
                        <div onClick={handleDeleteButton} className="cp mx-1">
                            <img src={trash} width={20} alt="" />
                        </div>

                    </div>
                    <span>

                        {task?.taskAddedDay != 0 && <div className="d-flex"><img src={waiting} width={20}></img> <span className="ct">{task?.taskAddedDay} Gün Gecikti</span></div>}
                    </span>
                </div>

            </div>
            <div className="col-6 center flex-column justify-content-around">
                <div className="w-60">
                    <div className="d-flex align-items-center justify-content-between">

                        <span className="coloredd">Tamamlanacak</span>
                        {editMode ?
                            <input onChange={(e) => handleInputChange("taskStatus", e.target.value)} disabled={!editMode} value={"Tamamlanacak"} type="checkbox" />
                            :
                            <input disabled={!editMode} checked={task.taskStatus == "Tamamlanacak"} value={"Tamamlanacak"} type="checkbox" />
                        }
                    </div>
                    <div className="d-flex align-items-center justify-content-between">

                        <span className="coloredd">Devam Ediyor</span>
                        {editMode ?
                            <input onChange={(e) => handleInputChange("taskStatus", e.target.value)} disabled={!editMode} value={"Devam Ediyor"} type="checkbox" />
                            :
                            <input disabled={!editMode} checked={task.taskStatus == "Devam Ediyor"} value={"Devam Ediyor"} type="checkbox" />
                        }
                    </div>
                    <div className="d-flex align-items-center justify-content-between">

                        <span className="coloredd">Tamamlandı</span>
                        {editMode ?
                            <input onChange={(e) => handleInputChange("taskStatus", e.target.value)} disabled={!editMode} value={"Tamamlandı"} type="checkbox" />
                            :
                            <input disabled={!editMode} checked={task.taskStatus == "Tamamlandı"} value={"Tamamlandı"} type="checkbox" />
                        }
                    </div>
                </div>
                {editMode ?
                    <textarea
                        type="text"
                        name="taskName"
                        placeholder="Açıklama"
                        value={taskData.taskDescription}
                        onChange={(e) => handleInputChange("taskDescription", e.target.value)}
                        className="textareeaaa"
                    />

                    :

                    <textarea
                        readOnly
                        type="text"
                        name="taskName"
                        placeholder="Açıklama"
                        value={taskData.taskDescription}
                        onChange={(e) => handleInputChange("taskDescription", e.target.value)}
                        className="textareeaaa"
                    />
                }
                <ToastContainer></ToastContainer>

            </div>
        </div>
    );
}

export default EachTaskProjectTasks;