import React, {useState, useEffect, useRef} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import BookService from "../API/book/BookService"
import AuthorService from "../API/author/AuthorService";

import '../styles/Bookshelf.css'


const TheFirstPartOfAddingTheBook = ({newbook, setNewbook, setDoWeNeedToFillAllFields}) => {
    const [author, setAuthor] = useState([])                                        //the variable contains a list of authors (no more than 5 (provided in the sql query)) that match the data entered by the user (part of the name)
    const [bookTitle, setBookTitle] = useState([])                                  //the variable contains a list of book titles (no more than 5 (provided in the sql query)) that match the data entered by the user (part of the title)
    const [isBookTitleSelected, setIsBookTitleSelected] = useState(false)           //the variable determines whether there are authors suitable for the data entered by the user
    const [isAuthorNameSelected, setIsAuthorNameSelected] = useState(false)         //the variable determines whether there are book titles that match the data entered by the user
    const inputRefTitle = useRef();
    const inputRefAuthorName = useRef();

    async function getIDAndTitleOfBookByPartOfTitle (e) {
        setNewbook({...newbook, book_title: e.target.value})
        if (e.target.value!==""){
            let response = await BookService.getAuthorByPartOfTitle(e.target.value);
            setBookTitle(response)
        }
        setIsBookTitleSelected(false)
    }
    async function getIDAndAuthorNameByPartOfName (e) {
        setNewbook({...newbook, author_name: e.target.value})
        let response = await AuthorService.getAuthorByPartOfName(e.target.value);
        setAuthor(response)
        setIsAuthorNameSelected(false)
    }

    return (
        <div>
            <h1>Добавить новую книгу</h1>
            <form id="bookshelf_input">
                <div>
                    <MyInput
                        value={newbook.book_title}
                        onChange={(e) => {
                            getIDAndTitleOfBookByPartOfTitle(e)
                            setDoWeNeedToFillAllFields(false)
                        }}
                        type="text"
                        placeholder="title"
                        ref={inputRefTitle}
                    />
                    {isBookTitleSelected===false ?
                        <ul id="results" className="list-group">
                            {bookTitle.map((bookTitle, index) =>
                                <button
                                  id="result_btn"
                                  type="button"
                                  key={index}
                                  onClick={(e) => {
                                    inputRefTitle.current.value = bookTitle.book_title;
                                    setNewbook({...newbook, book_title: bookTitle.book_title})
                                    setIsBookTitleSelected(true)
                                    setDoWeNeedToFillAllFields(false)
                                  }}
                                  className="list-group-item list-group-item-action1">
                                  {bookTitle.book_title}
                                </button>
                            )}
                        </ul>

                    : null}

                </div>
                <div>
                    <MyInput
                        value={newbook.author_name}
                        onChange={(e) => {
                            getIDAndAuthorNameByPartOfName(e)
                            setDoWeNeedToFillAllFields(false)
                        }}
                        type="text"
                        placeholder="author"
                        ref={inputRefAuthorName}
                    />
                    {isAuthorNameSelected===false ?
                        <ul id="results" className="list-group">
                            {author.map((author, index) =>
                                <button
                                  type="button"
                                  key={index}
                                  onClick={(e) => {
                                    inputRefAuthorName.current.value = author.author_name;
                                    setNewbook({...newbook, author_name: author.author_name})
                                    setIsAuthorNameSelected(true)
                                    setDoWeNeedToFillAllFields(false)
                                  }}
                                  className="list-group-item list-group-item-action">
                                  {author.author_name}
                                </button>
                            )}
                        </ul>
                    : null}
                </div>
            </form>
        </div>
    );
};

export default TheFirstPartOfAddingTheBook;
