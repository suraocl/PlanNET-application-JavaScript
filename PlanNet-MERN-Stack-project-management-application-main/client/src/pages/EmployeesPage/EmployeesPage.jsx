import { useEffect, useState } from "react";
import EachEmployee from "./EachEmployee";
import "./emloyees.css"
function EmployeesPage() {


    const [users, setUsers] = useState([]);
    

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/user/list");
        const data = await response.json();
        
        setUsers(data.users)


        } catch (error) {
            console.log(error);
        }
    }

    console.log(users);

    useEffect(() => {
        fetchUsers();
    },[])


    return (
        <div className="col-10">
            <div className="d-flex flex-column mv">
                <span className="calisanlartext">ÇALIŞANLAR</span>
                <div className="d-flex flex-wrap overflow-auto">

                    {users?.map((element) => {
                        return (<EachEmployee key={element.userId} user={element}></EachEmployee>)
                    })}



                </div>

            </div>



        </div>
    );
}

export default EmployeesPage;