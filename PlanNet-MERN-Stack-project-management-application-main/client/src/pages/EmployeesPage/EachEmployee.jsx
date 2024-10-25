
import { useNavigate } from "react-router-dom";
import info from "../../../assets/images/information-button.png"

function EachEmployee({user}) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate("/calisan/" + user.userId)}  className="grnn eachemployee d-flex justify-content-between align-items-center px-5">
            <div>
                <span className="emptexx" style={{color: "#485662"}}>
                    {user.name}
                </span>

            </div>
            <div className="d-flex flex-column align-items-center">
                <img style={{width: "40px"}} src={info} alt="" />
                <span style={{color: "#485662"}}>
                    Detaylar
                </span>
            </div>
        </div>
    );
}

export default EachEmployee;