import axios from "axios";

export const currentUser = async (authtoken) => {
    return await axios.post(`http://localhost:5000/api/current-user`,{},{
        headers:{
            authtoken
        }
    })
}