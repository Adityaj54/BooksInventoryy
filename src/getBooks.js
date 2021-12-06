import React, { useState, useEffect } from 'react';
import Geturl from "./Books";
// by default runs after every re-render
// cleanup function
// second parameter

const url = Geturl();
const ShowBooks = () => {
    const [show,setShow] = useState(false);

    return (
        <>
        <button className='btn' onClick={() => setShow(!show)}>
            Get Books
        </button>
            {show && <GetBooks/>}
        </>
    )


}

export function GetBooks() {
    const [books, setBooks] = useState([])

    const getbooks = async () => {
        const response = await  fetch(url,{
        })
            .catch(err => {console.log(err) });
        const books = await response.json();
        setBooks(books)
    }

    useEffect(() => {
        getbooks().then(r => {} );
    },[]);

    return (
        <>
            <h3>Books</h3>
            <ul className="users">
                {
                    books.map((book) => {
                        const {id,title,author,pageCount,read,barcode,query} = book
                        return <li key={id}>
                            <div>
                                <h4><span style={{color: 'red'}}>Title:</span>{title}</h4>
                                <h4><span style={{color: 'red'}}>author:</span>{author}</h4>
                                <h4><span style={{color: 'red'}}>pageCount:</span>{pageCount}</h4>
                                <h4><span style={{color: 'red'}}>read:</span>{read}</h4>
                                <h4><span style={{color: 'red'}}>ISBN:</span>{query}</h4>
                                <h4><span style={{color: 'red'}}>barcode:</span>{barcode}</h4>
                            </div>
                        </li>
                    } )
                }
            </ul>
        </>
    )


};


export default ShowBooks;