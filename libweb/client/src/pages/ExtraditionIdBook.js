import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import BookItem from "../components/BookItem"
import BookService from "../API/book/BookService"
import '../styles/App.css';
import '../styles/Bookshelf.css';

const ExtraditionIdBook = () => {
    const router = useHistory()
    const params = useParams()
    const [books, setBooks] = useState([])
    const [metroStationTitle, setMetroStationTitle] = useState([])

    async function getBooksByIdBookAndMetroStation (metro_station_title) {
        const response = await BookService.getAllInformationAboutBookByIdBookForExtradition(params.id_book, metro_station_title);
        setBooks(response.data)
    }

    async function onChangeInput (metro_station_title) {
        setMetroStationTitle(metro_station_title)
        ///////////////////////////////////////////////////////////////////////////////
        const response = await BookService.getAllInformationAboutBookByIdBookForExtradition(params.id_book, metro_station_title);
        setBooks(response.data)
    }

    useEffect((e) => {
        getBooksByIdBookAndMetroStation("")
    }, [])

    return (
        <div>
            <h1>Список подобных книг</h1>

            <MyInput
                value={metroStationTitle}
                onChange={e => onChangeInput(e.target.value)}
                type="text"
                placeholder="Станция метро..."
            />
            {console.log("metroStationTitle")}
            {console.log(metroStationTitle)}

            <div>
                {books.map((books, index) =>
                    <div key={index} className="book_item_box">
                        <BookItem book={books} index={index} key={index} />
                        {books.metro_station_title ? <div><span>Станция метро: </span>{books.metro_station_title}</div> : null}
                        {books.user_login ? <div><span>Владелец: </span>{books.user_login}</div> : null}
                        <MyButton onClick={() => router.push(`/extradition/book/${books.id_book_user}`)}> Одолжить </MyButton>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ExtraditionIdBook;
