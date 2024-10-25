import "./EmployeeDetailPage.css"
import usericon from "../../../assets/images/user2.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EachProject from "../../components/EachProject/EachProject";
import EachTask from "../../components/EachTask/EachTask";
function EmployeeDetailPage() {


    
    const [user, setUser] = useState([]);
    let { userId } = useParams();

    const [selectedShown, setselectedShown] = useState("projeler");
    const [taskCounts, settaskCounts] = useState({});
    
    console.log(user);


    const fetchUser = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/user/getUserDetails/" + userId );
            const data = await response.json();
        
            setUser(data)
            const response1 = await fetch("http://localhost:5000/api/user/getCountTasks/" + userId );
            const data1 = await response1.json();
        
            settaskCounts(data1)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    },[])


    return (
        <div className="col-10 center">
            <div className="empdetailouter row">
                <div className="emptop d-flex flex-column align-items-center col-6">
                    <div>
                        <img style={{ width: "200px" }} src={usericon} alt="" />
                    </div>
                    <div className= "w-100">
                        <div className="d-flex align-items-center flex-column">
                            <span style={{ color: "#485662", fontWeight: "bold", fontSize: "30px" }}>

                                {user.user && user.user[0].name}
                            </span>
                            <span style={{ color: "#485662", fontWeight: "bold", fontSize: "23px" }}>
                                {user.user && user?.user[0].userName}
                            </span>
                        </div>
                        <div className="d-flex justify-content-around w-100">
                            <div className="box">
                                <span className="fw-bold" style={{ color: "#485662", fontSize: "18px" }}>
                                    Zamanında Tamamlanan görevler
                                </span>
                                <span style={{ color: "#485662", fontSize: "25px"}}>
                                    {taskCounts?.notExpiredTaskCount}
                                </span>
                            </div>
                            <div className="box">
                                <span className="fw-bold" style={{ color: "#485662", fontSize: "18px" }}>
                                    Zamanı Geçip Tamamlanan Görevler
                                </span>
                                <span style={{ color: "#485662", fontSize: "25px"}}>
                                    {taskCounts?.expiredTaskCount}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="empbottom d-flex flex-column col-6">
                    <div className="bottomtop">
                        <div onClick={() => setselectedShown("projeler")} className="cp btnbottom center">
                            PROJELER

                        </div>
                        <div onClick={() => setselectedShown("görevler")} className="cp btnbottom center">
                            GÖREVLER
                        </div>

                    </div>
                    <div className="bottombottom d-flex flex-wrap justify-content-center daf overflow-auto">

                        {
                        selectedShown == "projeler" ? 
                            user?.projects?.map((element) => {
                                return (<EachProject key={element.projectId} project={element}></EachProject>)
                            })                      
                        : 
                        user.tasks.map((element) => {
                            return <EachTask key={element.taskId} task={element}></EachTask>
                        })  
                        }

                    </div>

                </div>
            </div>

        </div>
    );
}

export default EmployeeDetailPage;