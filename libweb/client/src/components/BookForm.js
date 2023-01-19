import React, {useState, useContext} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import BookItem from "./BookItem"

import BookUserService from "../API/bookuser/BookUserService"
import {AuthContext} from "../context";
import {useHistory} from "react-router-dom";

const BookForm = ({finding_book, setDoWeNeedToFillAllFields, setModal}) => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const router = useHistory()

    async function addNewBookUser (e){
        e.preventDefault()
        setDoWeNeedToFillAllFields(false)
        setModal(false)
        const response = await BookUserService.addBookUser(finding_book.id_book, isAuth);
        router.push('/my_bookshelf')

    }
    const doNotAddNewBookUser = (e) => {
        e.preventDefault()
        setDoWeNeedToFillAllFields(true)
        setModal(false)
    }

    return (
        <form>
            <div>Возможно, вы имели в виду эту книгу?</div>
            <BookItem book={finding_book}/>
            <MyButton onClick={addNewBookUser}>Да</MyButton>
            <MyButton onClick={doNotAddNewBookUser}>Нет</MyButton>
        </form>
    );
};

export default BookForm;
