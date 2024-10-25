import "./mainn.css"
import todolist from "../../../assets/images/to-do-list.png"
import edit from "../../../assets/images/edit.png"
import editinfo from "../../../assets/images/edit-info.png"
import staff from "../../../assets/images/staff.png"
import timetable from "../../../assets/images/timetable.png"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SimpleDialogDemo from "./DialogPage/DialogPage"
import SimpleDialog from "./DialogPage/DialogPage"

function EachProject({ project }) {
    const navigate = useNavigate();
    const { loggedUser } = useSelector(state => state.auth);


    const startDate = new Date(project?.projectStartDate);
    const gun = startDate.getUTCDate().toString().padStart(2, '0');
    const ay = (startDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const yil = startDate.getUTCFullYear();

    const startDateFormatted = `${gun}.${ay}.${yil}`

    const endDate = new Date(project?.projectFinishDate);
    const gun1 = endDate.getUTCDate().toString().padStart(2, '0');
    const ay1 = (endDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const yil1 = endDate.getUTCFullYear();

    const endDateFormatted = `${gun1}.${ay1}.${yil1}`

    console.log(project);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        if (loggedUser.user.userId == project.userId) {
            navigate("/projeler/gorevler/" + project.projectId)
        } else {
            handleClickOpen();
        }

    }
    return (
        <>
            <SimpleDialog projectId={project.projectId} open={open} handleClose={handleClose}></SimpleDialog>
            <div onClick={handleClick} className="grnn cp eachproject center flex-column my-3 mx-5">
                <div className="eachprojecttop grn d-flex justify-content-around align-items-center">
                    <div className="d-flex flex-column w-100">
                        <div className="d-flex flex-column mx-3">
                            <div>

                                <span className="ct">Proje: </span><span className="ct" style={{ fontSize: "25px" }}>{project?.projectName}</span>
                            </div>
                            <div>

                                <span className="ct" style={{ fontSize: "12px" }}>Yönetici: </span><span className="ct" style={{ fontSize: "18px" }}>{project?.name}</span>
                            </div>

                        </div>

                        <div className="d-flex justify-content-around">
                            <div>

                            </div>
                            <div className="tarihbox center">
                                <span className="ct"> {startDateFormatted}</span>
                            </div>
                            <span>
                                -
                            </span>
                            <div className="tarihbox center">
                                <span className="ct"> {endDateFormatted}</span>

                            </div>
                            <div></div>
                        </div>

                    </div>
                    <div></div>
                    <div></div>

                </div>
                <div className="eachprojectbottom ">
                    <div className="d-flex justify-content-around align-items-center h-100">

                        {/* {kullanıcı adı eşitse proje yöneticisi adı} */}


                        {project?.userId == loggedUser?.user.userId ?
                            <>
                                <div onClick={() => { navigate("/projeler/gorevler/" + project.projectId) }} className="d-flex flex-column align-items-center">
                                    <img width={50} src={edit}></img>
                                    <span style={{ fontSize: "10px", width: "80px" }}>GÖREV EKLE -DÜZENLE</span>

                                </div>
                            </> : <>
                                <div onClick={() => { navigate("/projeler/gorevler/goruntule" + project.projectId) }} className="d-flex flex-column align-items-center">
                                    <img width={50} src={todolist}></img>
                                    <span style={{ fontSize: "10px" }}>GÖREVLER</span>

                                </div>

                            </>

                        }

                    </div>
                </div>
            </div>
        </>

    );
}

export default EachProject;