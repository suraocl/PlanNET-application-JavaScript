import { useState } from "react";
import "./createproject.css"

import DatePicker from "react-datepicker";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-datepicker/dist/react-datepicker.css";

import pencilicon from "../../../assets/images/pencil.png";
import calendaricon from "../../../assets/images/calendar.png";
import dateicon from "../../../assets/images/date.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function CreateProject() {

  const { loggedUser } = useSelector(state => state.auth);

  const [projectData, setProjectData] = useState({
    projectName: "",
    projectStartDate: new Date(),
    projectFinishDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    userId: loggedUser.user.userId
  });

  const handleInputChange = (fieldName, value) => {
    setProjectData({
      ...projectData,
      [fieldName]: value,
    });
  };
  const navigate = useNavigate();

  const handleCreateButton = async () => {

    try {

      const response = await fetch("http://localhost:5000/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      const data = await response.json()
      if (data.success) {
        toast.success(` ${projectData.projectName} Projesi Oluşturuldu!`, {
          position: "bottom-center",
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            navigate("/")
          }
        })


      }else{
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


  return (
    <div className="col-10 center pb-5 flex-column  asdasd">
      <h1 className="mb-5" style={{ color: "#485662" }}>
        PROJENİ OLUŞTUR
      </h1>

      <label htmlFor="projectName" className=" mb-3 inputcreateproject center">
        <img width={25} className="mx-4" src={pencilicon} alt="" />
        <input
          type="text"
          name="projectName"
          placeholder="PROJENİN ADI"
          className="inpcreateproject"
          value={projectData.projectName}
          onChange={(e) => handleInputChange("projectName", e.target.value)}
        />
      </label>
      <label
        htmlFor="startDate"
        className=" mb-3 inputcreateproject center"
      >
        <img width={25} className="mx-4" src={calendaricon} alt="" />
        <DatePicker
          className="inpcreateprojectt"
          selected={projectData.projectStartDate}
          onChange={(date) => handleInputChange("projectStartDate", date)}
        />
        <span style={{ fontWeight: "bold" }}>BAŞLANGIÇ TARİHİ</span>
      </label>

      <label htmlFor="endDate" className=" mb-3 inputcreateproject center">
        <img width={25} className="mx-4" src={dateicon} alt="" />
        <DatePicker
          className="inpcreateprojecttt"
          selected={projectData.projectFinishDate}
          onChange={(date) => handleInputChange("projectFinishDate", date)}
        />
        <span style={{ fontWeight: "bold" }}>BİTİŞ TARİHİ</span>
      </label>
      <button onClick={handleCreateButton} className=" mb-3 btnn createbutton">OLUŞTUR</button>
      <span className="textcreate">
        PROJELERİM KISMINDA PROJENİZE GÖREV EKLEYİN !
      </span>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default CreateProject;