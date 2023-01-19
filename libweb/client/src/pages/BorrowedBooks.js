import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from "../context";
import BookItem from "../components/BookItem"
import BookService from "../API/book/BookService"
import '../styles/App.css';
import '../styles/Extradition.css';

function BorrowedBooks() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [books, setBooks] = useState([])

    useEffect(() => {
        getBooks()
    }, [])

    async function getBooks () {
        const response = await BookService.getAllInformationAboutBorrowedBookByIdUser(isAuth);
        setBooks(response.data)
    }

    return (
        <div className="App">
            <h1>Список одолженных книг</h1>
            <div>
                {books.map((books, index) =>
                    <div className="book_item_box" key={index}>
                        <BookItem book={books} index={index} key={index} />
                        {books.metro_station_title ? <div><span>Станция метро: </span>{books.metro_station_title}</div> : null}
                        {books.user_login ? <div><span>Владелец: </span>{books.user_login}</div> : null}
                        {books.extradition_date_of_extradition ? <div><span>Взято: </span>{new Date(books.extradition_date_of_extradition).getDate()}.{new Date(books.extradition_date_of_extradition).getMonth()+1}.{new Date(books.extradition_date_of_extradition).getFullYear()}</div> : null}
                        {books.extradition_required_return_date ? <div><span>Необходимо вернуть: </span>{new Date(books.extradition_required_return_date).getDate()}.{new Date(books.extradition_required_return_date).getMonth()+1}.{new Date(books.extradition_required_return_date).getFullYear()}</div> : null}
                    </div>
                )}
            </div>

        </div>
    )
}

export default BorrowedBooks;