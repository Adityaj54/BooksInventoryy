import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Validation from "./useValidation";
import Notify from "./notify";
toast.configure();


const Forms = (callback) => {

    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const [pageCount,setPageCount] = useState('');
    const [barcode,setBarcode] = useState('');
    const [query,setQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)
    const book = {title,author,pageCount,barcode,query};
    const [errors,setErrors] = useState({})


    const HandleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(book));

        if (Object.keys(errors).length === 0) {


            fetch('http://localhost:8080/books', {
                method: 'POST',
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(book)
            }).then((response) => {
                if (!response.ok) throw new Error(response.status);
                if (response.ok) Notify(response.status)

            })
                .catch(err => {
                    Notify(err.message)

                });

        }
        else {
            Notify(405)
        }
    }




    return (
        <>
    <article>

        <form className='form' onSubmit={HandleSubmit}>
            <div className='form-control'>
                <label htmlFor='title'>Title : </label>
                <input type='text' id ='title' name='title' placeholder='Enter the title' value={title} onChange={
                    (e) => { setTitle(e.target.value)}
                } />


            </div>
            {errors.title && <p style={{mb: '0.5rem'}}>{errors.title}</p>}
            <div className='form-control'>
                <label htmlFor='author'>Author : </label>
                <input type='text' id ='author' name='author' placeholder='Enter the author' value={author} onChange={
                    (e) => { setAuthor(e.target.value)}
                }/>
            </div>

            <div className='form-control'>
                <label htmlFor='pages'>Pages : </label>
                <input type='text' id ='pages' name="pageCount" placeholder='Enter the number of pages' value={pageCount} onChange={
                    (e) => { setPageCount(e.target.value)}
                }/>
            </div>
            <div className='form-control'>
                <label htmlFor='ISBN'>ISBN : </label>
                <input type='text' id ='ISBN' name="query" placeholder='Enter the ISBN' value={query} onChange={
                    (e) => { setQuery(e.target.value)}
                }/>
            </div>
            {errors.query && <p style={{mb: '0.5rem'}}>{errors.query}</p>}

            <div className='form-control'>
                <label htmlFor='barcode'>Barcode : </label>
                <input type='text' id ='barcode' name='barcode' placeholder='Enter the barcode'  value={barcode} onChange={
                    (e) => { setBarcode(e.target.value)}
                }/>
            </div>
            {errors.barcode && <p style={{mb: '0.5rem'}}>{errors.barcode}</p>}
            <button type='submit'>Save Book</button>
        </form>
    </article>
    </>
    )
};





export default Forms;