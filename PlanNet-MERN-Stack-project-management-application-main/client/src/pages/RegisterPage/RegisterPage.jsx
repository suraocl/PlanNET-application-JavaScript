import "../LoginPage/login.css";
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFunc } from "../../redux/features/auth/authSlice";
import identity from "../../../assets/images/id-card.png";
import passwordicon from "../../../assets/images/padlock.png";
import personicon from "../../../assets/images/user.png";
import plannet from "../../../assets/images/PlanNET.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RegisterPage() {
    const [inputValues, setInputValues] = useState({
        userName: "",
        password: "",
        name: ""
    });

    const [inputType, setInputType] = useState("password");

    const onClickHandle = () => {
        setInputType((prevInputType) => (prevInputType === "password" ? "text" : "password"));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {

        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputValues),
        });
        const data = await response.json();

        if (data.success) {
            let dataa = {
                user: data.user,
                projects: data.projects,
                tasks: data.tasks
            }
            toast.success(`Başarıyla Giriş Yapıldı`, {
                position: "bottom-center",
                autoClose: 600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                    dispatch(loginFunc(dataa));
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


        // You can use inputValues.username and inputValues.password here for further processing.
        // For example, send a login request.
    };


    return (
        <div className="row bbg">
            <div className="col-6">
                
      <ToastContainer></ToastContainer>
            </div>
            <div className="col-6 center flex-column">

                <div className="mb-3">
                    <img src={plannet} alt="" />
                </div>
                <label htmlFor="username" className="inputlogin center align-items-center">
                    <img width={26} className="mt-1 mx-2" src={identity}></img>

                    <input
                        type="text"
                        name="name"
                        placeholder="İsim Soyisim"
                        value={inputValues.name}
                        onChange={handleInputChange}
                        className="w-100 inplogin"
                    />
                </label>
                <label htmlFor="username" className="inputlogin center">
                    <img width={26} className="mt-1 mx-2" src={personicon}></img>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Kullanıcı Adı"
                        value={inputValues.userName}
                        onChange={handleInputChange}
                        className="w-100 inplogin"
                    />
                </label>
                <label htmlFor="password" className="inputlogin center">
                    <img width={26} className="mt-1 mx-2" src={passwordicon}></img>
                    <input
                        type={inputType}
                        name="password"
                        placeholder="Şifre"
                        id="password"
                        value={inputValues.password}
                        onChange={handleInputChange}
                        className="w-100 inplogin"
                    />
                    {!(inputType === "password") ? (
                        <VisibilityOffIcon className="cursorpointer" onClick={onClickHandle}></VisibilityOffIcon>
                    ) : (
                        <VisibilityIcon className="cursorpointer" onClick={onClickHandle}></VisibilityIcon>
                    )}
                </label>
                <button className="loginbutton" onClick={handleLogin}>
                    KAYIT OL
                </button>
                <Link className="linktologin" to={"/"}>ZATEN KAYITLI MISIN?</Link>
            </div>
        </div>
    );
}
export default RegisterPage;