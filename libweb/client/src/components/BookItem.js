import React from 'react';
import MyButton from "./UI/button/MyButton";

const BookItem = (props) => {

    return (
        <div className="book">
            <div className="book__content" key={props.index+1}>
                <strong>{props.index+1}. {props.book.book_title}</strong>
                <div>
                    <div><span>Автор: </span>{props.book.author_name}</div>
                    {props.book.section_title ? <div><span>Раздел: </span>{props.book.section_title}</div> : null}
                    {props.book.publishing_house_title ? <div><span>Издательство: </span>{props.book.publishing_house_title}</div> : null}
                    {props.book.book_description ? <div><span>Описание: </span>{props.book.book_description}</div> : null}
                </div>
            </div>
        </div>
    );
};

export default BookItem;
