import React, {useEffect, useState} from "react";
import Notify from "./notify";
import Validation from "./useValidation";



const url = 'https://www.googleapis.com/books/v1/volumes?q='
const apiurl = 'http://localhost:8080/books/isbn/'

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
    const [flag, setFlag] = useState(false)
    const [bk, setBk] = useState([])
    const [errors, setErrors] = useState({})
    const [query, setQuery] = useState('')
    const [resflag, setResflag] = useState(true)


    const HandleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation({query}, true));
        if(Object.keys(errors).length === 0){setResflag(false)}

    }

    const getbooks = async () => {
        const response = await fetch((url + query), {})
            .catch(err => {
                console.log(err)
            });
        const books1 = await response.json();
        setBooks(books1.items)
        console.log(books)
    }

    const getapi = async () => {

        console.log('calling api')
       await fetch((apiurl+query))
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                console.log(response.status)
                if (response.status === 404) {

                    throw new Error(response.status)
                    console.log(response.status)
                    console.log(flag)
                }
                else
                {
                    console.log(flag)
                }

                ;
            })
            .catch(err => {
                setFlag(true)
                console.log(err)


            });


    }

    const createdata = () => {
            books.map((book) => {
              const {title, authors,pageCount, industryIdentifiers} = book.volumeInfo

            return industryIdentifiers.map((i) => {
                if (i.type === 'ISBN_13' && i.identifier == query) {

                    setBk({title,author: authors[0],pageCount, query})

                }
            })
        })

    }

    const createapi = async () => {


        await fetch('http://localhost:8080/books', {
            method: 'POST',
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(bk)
        }).then((response) => {

            if (response.ok) Notify(response.status)

        })
            .catch(err => {
                console.log(err.message)
                Notify(err.message)

            });
    }


    useEffect(() => {
        if (!resflag){
            getapi().then(r => {});
        getbooks().then(r => {  createdata();});
        }}, [resflag]);

    useEffect(()=>{
        if (flag) {
            createapi().then()
        }
    },[flag])



    if (resflag) {

        return <article>

            <form className='form' onSubmit={HandleSubmit}>

                <div className='form-control'>
                    <label htmlFor='ISBN'>ISBN : </label>
                    <input type='text' id='ISBN' name="query" placeholder='Enter the ISBN' value={query} onChange={
                        (e) => {
                            setQuery(e.target.value)
                        }}/>
                </div>
                {errors.query && <p style={{mb: '0.5rem'}}>{errors.query}</p>}
                <button type='submit'>Search</button>
            </form>
        </article>

    }
else if(!resflag){
    return <>
            <h3>Books</h3>
            <ul className="users">
                {

                    books.map((book) => {

                        const id = book.id

                        const {title, authors, pageCount, industryIdentifiers} = book.volumeInfo


                        return industryIdentifiers.map((i) => {
                            if (i.type === 'ISBN_13' && i.identifier == query) {

                                return <li key={id}>
                                    <div>
                                        <h4>
                                            <span style={{color: 'red'}}>ISBN:</span> {query}
                                        </h4>
                                        <h4><span style={{color: 'red'}}>Title:</span> {title}</h4>
                                        <h4><span style={{color: 'red'}}>Authors:</span>{authors.map((author) => authors)}
                                        </h4>
                                        <h4><span style={{color: 'red'}}>Pages:</span>{pageCount}</h4>
                                    </div>
                                </li>
                            }


                        })


                    })
                }
            </ul>


        </>
    }
}



export default Showapi