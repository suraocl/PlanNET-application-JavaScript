import { useEffect, useState } from "react";
import EachProject from "../../components/EachProject/EachProject";
import "./mainn.css"

function MainPage() {

    const [showAllProjects, setShowAllProjects] = useState(false);
    const [projects, setProjects] = useState([]);


    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/projects/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ showAllProjects }),
            });
            const data = await response.json();

            setProjects(data.projects)


        } catch (error) {
            console.log(error);
        }
    }

    console.log(projects);

    useEffect(() => {
        fetchProjects();
    }, [showAllProjects])


    return (
        <div className="col-10 d-flex flex-column ssss">
            
            <span className="calisanlartext">ANASAYFA</span>
            <div className="cls">
                <input className="cp" type="checkbox" onClick={() => setShowAllProjects(!showAllProjects)}></input> <span className="ct">Tamamlanmış Projeleri Göster?</span>
            </div>

            <div className="d-flex flex-wrap  overflow-auto">
                {projects.map((element) => {
                    return (<EachProject   key={element.projectId} project={element}></EachProject>)

                })}

            </div>
        </div>

    );
}

export default MainPage;