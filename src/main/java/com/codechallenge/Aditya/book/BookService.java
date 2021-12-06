package com.codechallenge.Aditya.book;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookService {

    private final Bookrepository bookrepository;

    public BookService(Bookrepository bookrepository) {
        this.bookrepository = bookrepository;
    }

    public Iterable<Book> getBooks(){
        return  bookrepository.findAll();

    }
    public Book getBooksbyBarcode(String barcode){
        return bookrepository.findByBarcode(barcode);
    }
    public void createUser(Book book) {
        Book dbUser = bookrepository.save(book);
        System.out.println("Following user info saved in database:");
        System.out.println(dbUser);
    }

    public ResponseEntity<Book> getBooksbyIsbn(String isbn) throws ResourceNotFoundException {

        Book bk =  bookrepository.findByQuery(isbn).orElseThrow(() -> new ResourceNotFoundException("ISBN NOT FOUND"));
        return ResponseEntity.ok().body(bk);
    }

    @Transactional
    public void deleteBooksbyBarcode(String barcode) {
         bookrepository.deleteByBarcode(barcode);
    }


}
