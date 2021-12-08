import {toast} from "react-toastify";

function Notify(respcode) {
    if (respcode >= 200 & respcode <= 299) {
        toast.success('Book Created', {
            autoClose: 7000
        })
    }
    else {toast.error('Creation Failed', {
        autoClose: 7000
    })}

}
export default Notify;

