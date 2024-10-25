import { useEffect, useState } from "react";
import "../../EachTask/eachtask.css"
import checkedd from "../../../../assets/images/check-mark.png"
import stop from "../../../../assets/images/stop-button.png"
import late from "../../../../assets/images/waiting.png"
import { useSelector } from "react-redux";

function EachTaskListing({ task , getTasks }) {


    const { logged, loggedUser } = useSelector(state => state.auth);
    const startDate = new Date(task?.taskStartDate);
    const gun = startDate.getUTCDate().toString().padStart(2, '0');
    const ay = (startDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const yil = startDate.getUTCFullYear();

    const startDateFormatted = `${gun}.${ay}.${yil}`

    const endDate = new Date(task?.taskFinishDate);
    const gun1 = endDate.getUTCDate().toString().padStart(2, '0');
    const ay1 = (endDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const yil1 = endDate.getUTCFullYear();

    const endDateFormatted = `${gun1}.${ay1}.${yil1}`


    const [checked, setchecked] = useState(task.taskStatus);
    
    const handleClickCheck = async (arg) => {
        try {
            console.log(task);
            setchecked(arg)
            const updatedTask = { ...task, taskStatus: arg };
            
            await fetch(`http://localhost:5000/api/tasks/updateTask/${updatedTask.taskId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
              });

              getTasks()

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="grnn eachproject center flex-column my-3 mx-4">
            <div className="grn eachprojecttop d-flex justify-content-around align-items-center">
                <div className="d-flex flex-column w-100">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column px-3">
                            <div>

                                <span className="ct">Görev: </span><span className="ct" style={{ fontSize: "25px" }}>{task?.taskName}</span>
                            </div>
                            <div>

                                <span className="ct" style={{ fontSize: "12px" }}>Çalışan: </span><span className="ct" style={{ fontSize: "18px" }}>{task?.ownerName}</span>
                            </div>

                        </div>
                        <div className="center mx-5">
                            
                            {task.taskIsExpired == 1 ? <img width={20} src={late}></img>: <></>}
                            {task.taskStatus == "Tamamlandı" && <img width={20} src={checkedd}></img>}


                        </div>

                    </div>

                    <div className="d-flex justify-content-around">
                        <div>

                        </div>
                        <div className="tarihbox center">
                            <span className="ct">

                                {startDateFormatted}
                            </span>
                        </div>
                        <span>
                            -
                        </span>
                        <div className="tarihbox center">
                            <span className="ct">

                                {endDateFormatted}
                            </span>

                        </div>
                        <div></div>
                    </div>

                </div>
                <div></div>
                <div></div>

            </div>
            <div className="eachprojectbottom w-100 ">
                <div className="d-flex h-100 justify-content-around align-items-center">
                    <div className="center w-50">
                        <span className="ct">{task.taskDescription}</span>
                    </div>

                    <div className="d-flex w-50 align-items-center">
                        <div className="d-flex w-100 px-2 flex-column">

                            <div className="d-flex justify-content-between">
                                <span className="ct">Tamamlanacak</span>
                                <input className="cp" onClick={() => handleClickCheck("Tamamlanacak")} checked={checked == "Tamamlanacak"} disabled={loggedUser.user.userId != task.userId} type="checkbox" />
                            </div>
                            <div className="d-flex justify-content-between">

                                <span className="ct">Devam Ediyor</span>
                                <input className="cp" onClick={() => handleClickCheck("Devam Ediyor")} checked={checked == "Devam Ediyor"} disabled={loggedUser.user.userId != task.userId} type="checkbox" />
                            </div>
                            <div className="d-flex justify-content-between">

                                <span className="ct">Tamamlandı</span>
                                <input className="cp" onClick={() => handleClickCheck("Tamamlandı")} checked={checked == "Tamamlandı"} disabled={loggedUser.user.userId != task.userId} type="checkbox" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EachTaskListing;