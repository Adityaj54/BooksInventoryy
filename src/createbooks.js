import {useState} from "react";
import Forms from "./forms";

const Createbooks = () => {
    const [show,setShow] = useState(false);

    return (
        <>
            <button className='btn' onClick={() => setShow(!show)}>
                Add Books
            </button>
            {show && <Forms/>}
        </>
    )


}

export default Createbooks;