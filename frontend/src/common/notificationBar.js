
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//success notification bar
export const successBar =(msg)=>(
    toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
)

//error notification bar
export const errorBar =(msg)=>(
    toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
)