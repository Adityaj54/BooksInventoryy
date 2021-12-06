import React, {useEffect, useState, Fragment} from "react";
import Notify from "./notify";




const url = 'https://www.googleapis.com/books/v1/volumes?q=9780137142521'
const query = 9780137142521
const Showapi = () => {

    const [show,setShow] = useState(false);

    return (
        <>
            <button className='btn' onClick={() => setShow(!show)}>
                Get by Isbn
            </button>
            {show && <GAPI/>}
        </>
    )


}

function GAPI () {

    const [books, setBooks] = useState([])
    const [flag,setFlag] = useState(Boolean(false))
    const [bk, setBk] = useState([])
    const getbooks = async () => {
        const response = await fetch(url, {})
            .catch(err => {
                console.log(err)
            });
        const books = await response.json();
        console.log(books)
        setBooks(books.items)
    }

    const getapi = async () => {
        const response = await fetch('http://localhost:8080/books/isbn/978017142521', {})
            .catch(err => {
                console.log(err)
            });
        console.log('response.status')
        console.log(response.status)
        if (response.status === 404){

            setFlag(Boolean(true))
        }
    }

    const createdata =  () => {
        books.map((book) => {
            const {title,pageCount,industryIdentifiers} = book.volumeInfo
            return industryIdentifiers.map( (i) => {
                if (i.type === 'ISBN_13' && i.identifier == query) {

                setBk({title,pageCount,query})

                }
            })
    })

    }

const createapi = () => {

    fetch('http://localhost:8080/books', {
        method: 'POST',
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(bk)
    }).then((response) => {
        if(!response.ok) throw new Error(response.status);
        if(response.ok) Notify(response.status)

    })
        .catch(err => {
            console.log(err.message)
            Notify(err.message)

        });
}


    useEffect(() => {
        getbooks().then(r => {
        });
        getapi()
        if (flag) {
            console.log('inside',flag)
            createdata()
        createapi()}
    }, [flag]);
console.log(bk)
    return (
        <>
            <h3>Books</h3>
            <ul className="users">
                {

                    books.map((book) => {

                        const id = book.id

                        const {title,authors,pageCount,industryIdentifiers} = book.volumeInfo


                        return industryIdentifiers.map( (i) => {
                                if (i.type === 'ISBN_13' && i.identifier == query)
                                {

                                    return <li key={id}>
                                        <div>
                                            <h4>
                                                <span style={{color: 'red'}}>ISBN:</span> {query}
                                            </h4>
                                            <h4><span style={{color: 'red'}}>Title:</span> {title}</h4>
                                            <h4><span style={{color: 'red'}}>Authors:</span>{authors.map((author) => authors)}</h4>
                                            <h4><span style={{color: 'red'}}>Pages:</span>{pageCount}</h4>
                                        </div>
                                    </li>
                                }



                            })


                    } )
                }
            </ul>
        </>
    )

}



export default Showapi