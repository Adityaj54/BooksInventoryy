package com.codechallenge.Aditya.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping(path = "/books")
public class BookController<x> {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public Iterable<Book> getBooks(){
        System.out.println(bookService.getBooks().getClass().getName());
        return bookService.getBooks();
    }

    @GetMapping(path = "/{barcode}")
    public Book getBookbyBarcode (@PathVariable("barcode") String barcode){
        return bookService.getBooksbyBarcode(barcode);
    }

    @GetMapping(path = "/isbn/{Isbn}")
    public ResponseEntity<Book> getBookbyIsbn (@PathVariable("Isbn") String isbn) throws ResourceNotFoundException {
                return bookService.getBooksbyIsbn(isbn);
    }


    @PostMapping
    public void createUser(@RequestBody Book book)
    {
        bookService.createUser(book);
    }


    @DeleteMapping(path = "/{barcode}")
    public void deleteBooksbyBarcode(@PathVariable("barcode") String barcode) {
        bookService.deleteBooksbyBarcode(barcode);
    }

}
