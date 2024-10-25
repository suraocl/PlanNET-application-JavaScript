import { useEffect, useState } from "react";
import EachProject from "../../components/EachProject/EachProject";
import "./myprojects.css"
import { useSelector } from "react-redux";
function MyProjectsPage() {


    const { loggedUser } = useSelector(state => state.auth);
    const [projects, setProjects] = useState([]);


    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/projects/getUsersProjects/" + loggedUser?.user.userId);
            const data = await response.json();

            setProjects(data.projects)


        } catch (error) {
            console.log(error);
        }
    }

    console.log(projects);

    useEffect(() => {
        fetchProjects();
    }, [])


    return (
        <div className="col-10 d-flex flex-column">
            <span className="calisanlartext">PROJELERİM</span>
            <div className="d-flex flex-wrap overflow-auto fff">
                {projects && projects.length == 0 && <span className="ct mx-5" style={{fontSize: "24px"}}>Hiç proje oluşturmadın.</span>}

                {projects.map((element) => {
                    return (<EachProject key={element.projectId} project={element}> </EachProject>)
                })}


            </div>
        </div>
    );
}

export default MyProjectsPage;