package com.codechallenge.Aditya.book;

import javax.persistence.*;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name =  "books")
@DynamicUpdate
public class Book {

    @Id
    @Column(name = "id")
    @GeneratedValue(
            strategy = GenerationType.AUTO

    )

    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "pageCount")
    private Integer pageCount;

    @Column(name = "flag",length = 1)
    private String read ;

    @Column(name = "barcode",unique=true)
    private String barcode;

    @Column(name = "query",unique=true)
    private String query;

    public Book() {
    }

    public Book(Integer id, String title, String author, Integer pageCount, String read, String barcode, String query) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.read = read;
        this.barcode = barcode;
        this.query = query;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPageCount(Integer pages) {
        this.pageCount = pages;
    }

    public void setRead(String read) {
        this.read = read;
    }

    public void setQuery(String isbn) { this.query = isbn;  }
    public void setBarcode(String isbn) { this.barcode = isbn;  }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public String getRead() {
        return read;
    }
    public String getQuery() {
        return query;
    }
    public String getBarcode() {
        return barcode;
    }
}
