package com.codechallenge.Aditya.book;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface Bookrepository extends CrudRepository<Book, Integer>{

   Book findByBarcode(String barcode);
   Optional<Book> findByQuery(String isbn);
   Integer deleteByBarcode(String barcode);
}
