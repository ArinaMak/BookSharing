import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import BookItem from "../components/BookItem"
import BookService from "../API/book/BookService"
import BookUserService from "../API/bookuser/BookUserService"
import '../styles/App.css';
import '../styles/Bookshelf.css';

function UserBookshelf() {
    const [books, setBooks] = useState([])
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const router = useHistory()

    const [modal, setModal] = useState(false);
    const [deletedIDBook_user, setDeletedIDBook_user] = useState("")

    async function getBooks () {
        const response = await BookService.getBooksByIDUser(isAuth);
        setBooks(response)
    }
    async function deleteBook (id_book_user) {
        setModal(true)
        setDeletedIDBook_user(id_book_user)
    }
    async function answerYes (e) {
        e.preventDefault();
        const response = await BookUserService.deleteBookUser(deletedIDBook_user);
        setDeletedIDBook_user("")
        setModal(false)
        getBooks()
    }
    async function answerNo (e) {
        e.preventDefault();
        setDeletedIDBook_user("")
        setModal(false)
    }

    const goToAddNewBookInBookshelf = () => {
        router.push('/books3')
    }
    useEffect(() => {
        getBooks()
    }, [])

    return (
        <div className="App">
            <h1>Книжная полка пользователя</h1>
            <MyButton onClick={goToAddNewBookInBookshelf}>Добавить книгу!</MyButton>
            {books.map((books, index) =>
            <div className="book_item_box" key={index}>
                <BookItem book={books} index={index} key={index} />
                <MyButton onClick={() => {deleteBook(books.id_book_user)}}> Удалить </MyButton>
            </div>
            )}
            <MyModal visible={modal} setVisible={setModal}>
                <div>Вы уверены, что хотите удалить книгу?</div>
                <div style={{textAlign: 'center'}}>
                    <MyButton onClick={(e) => {answerYes(e)}}> Да </MyButton>
                    <MyButton onClick={(e) => {answerNo(e)}}> Нет </MyButton>
                </div>
            </MyModal>
        </div>
    )
}

export default UserBookshelf;