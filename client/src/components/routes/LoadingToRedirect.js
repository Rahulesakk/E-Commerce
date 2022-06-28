import react,{useState,useEffect} from 'react'
import { useNavigate} from "react-router-dom";

const LoadingToRedirect = () =>{
    const[count,setCount] = useState(5)
    let history = useNavigate();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount) => --currentCount)
        },1000)
        //redirect once count equal to zero 
        count  === 0  && history('/login')
        //cleanup
        return () => clearInterval(interval)
    },[count])

    return(
        <div className='conatiner p-5 text-center'>
            <p>
                Redirecting you in {count} seconds
            </p>
        </div>
    )
}

export default LoadingToRedirect
