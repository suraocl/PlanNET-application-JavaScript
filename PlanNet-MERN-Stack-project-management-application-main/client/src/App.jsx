import LoginPage from "./pages/LoginPage/Login"

import plus from "../assets/images/plus.png"
import plannet from "../assets/images/PlanNET.png"
import person from "../assets/images/group.png"
import { useDispatch, useSelector } from "react-redux";
import MainPage from "./pages/MainPage/MainPage";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import CreateProject from "./pages/CreateProject/CreateProject";
import EmployeeDetailPage from "./pages/EmployeeDetailPage/EmployeeDetailPage";
import MyProjectsPage from "./pages/MyProjectsPage/MyProjectsPage";
import TasksPage from "./pages/TasksPage/TasksPage";
import ProjectTasksPage from "./pages/ProjectTasksPage/ProjectTasksPage";
import ProjectTasksPageShow from "./pages/ProjectTasksPage/ProjectTasksPageShow";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function App() {

  const { logged, loggedUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(loggedUser);
  const navigate = useNavigate();


  return (
    <div className="aaaa">

      <Routes>
        <Route path="/kayit" element={!logged && <RegisterPage></RegisterPage>}></Route>
        <Route path="/" element={!logged && <LoginPage></LoginPage>}></Route>
        <Route path="*" element={!logged && <LoginPage></LoginPage>}></Route>

      </Routes>
      {logged ? <div className="main">
        <div className="line1 px-5 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img style={{ cursor: "pointer" }} width={90} onClick={() => navigate("/")} src={person} alt="" />
            <div className="mx-5">

              <img onClick={() => navigate("/")} style={{ cursor: "pointer" }} width={250} src={plannet} alt="" />
            </div>
          </div>
          <span className="fw-bold mx-5" style={{ fontSize: 26 }}>{loggedUser?.user?.name}</span>
        </div>

        <div className="row">

          <div className="col-2 d-flex flex-column border-right">
            <button onClick={() => navigate("/")} className="mainbutton mx-2">ANASAYFA</button>
            <button onClick={() => navigate("/calisanlar")} className="mainbutton mx-2">ÇALIŞANLAR</button>
            <button onClick={() => navigate("/projelerim")} className="mainbutton mx-2">PROJELERİM</button>
            <button onClick={() => navigate("/gorevler")} className="mainbutton mx-2">GÖREVLERİM</button>
          </div>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/calisanlar" element={<EmployeesPage />}></Route>
            <Route path="/projelerim" element={<MyProjectsPage />}></Route>
            <Route path="/projeolustur" element={<CreateProject />}></Route>
            <Route path="/gorevler" element={<TasksPage />}></Route>
            <Route path="/calisan/:userId" element={<EmployeeDetailPage />}></Route>
            <Route path="/projeler/gorevler/:projectId" element={<ProjectTasksPage />}></Route>
            <Route path="/projeler/gorevler/goruntule/:projectId" element={<ProjectTasksPageShow />}></Route>

          </Routes>

        </div>


        <div className="plus d-flex flex-column align-items-center">
          {/* <img className="" onClick={() => navigate("/projeolustur")} width={100} src={plus}></img> */}
          <AddCircleIcon className="iconnn" onClick={() => navigate("/projeolustur")} style={{fontSize: "100px"}}></AddCircleIcon>
          <span style={{color: "#485662"}}>Proje Oluştur!</span>
        </div>
      </div>


        :
        <Link to={"/login"}></Link>

      }


    </div>
  )
}

export default App
