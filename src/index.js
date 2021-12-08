import React from "react";
import ReactDom from 'react-dom'

import Createbooks from "./createbooks";
import './index.css';
import Header from "./Header";
import ShowBooks from "./getBooks";
import Showapi from "./GAPI";
function Greetings()
{
    return <div  className='container'>
        <React.StrictMode>
        <Header/>

        <ShowBooks/>
        <Createbooks/>
          <Showapi/>


            </React.StrictMode>
    </div>
}


ReactDom.render(<Greetings/>, document.getElementById('root'))