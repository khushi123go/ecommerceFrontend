import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";
import { selectUserInfo } from "../../user/userSlice";

function Protected({children}) {
    const user = useSelector(selectLoggedInUser)
    const userInfo = useSelector(selectUserInfo)
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    
    return children;
}

export default Protected;
