import React, {useState, useEffect, useContext} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import PublishingHouseService from "../API/publishinghouse/PublishingHouseService";
import BookService from "../API/book/BookService";
import AuthorService from "../API/author/AuthorService";
import SectionService from "../API/section/SectionService";
import {AuthContext} from "../context";
import BookUserService from "../API/bookuser/BookUserService"

import {useHistory} from "react-router-dom";

const TheSecondPartOfAddingTheBook = ({newbook, setNewbook}) => {
    const [section, setSection] = useState([])
    const [publishingHouse, setPublishingHouse] = useState([])

    const {isAuth, setIsAuth} = useContext(AuthContext);
    const router = useHistory()


    async function getSection () {
        const response = await SectionService.getSection();
        setSection(response.data)
    }
    async function getPublishingHouse () {
        const response = await PublishingHouseService.getPublishingHouse();
        setPublishingHouse(response.data)
    }

    async function addNewBook(e) {   //книга не найдена или не та
        e.preventDefault();
        let response_id_author = await AuthorService.getIDAuthorByName(newbook.author_name);
        if(response_id_author.length===0){
            response_id_author = await AuthorService.addAuthorAndGetNewId(newbook.author_name);
            response_id_author=response_id_author.data.insertId
        }
        else{
            response_id_author=response_id_author[0].id_author
        }
        let response_id_section = await SectionService.getSectionByName(newbook.section_title);
        let response_id_publishing_house = await PublishingHouseService.getIDPublishingHouseByName(newbook.publishing_house_title);
        let response = await BookService.addNewBookWithAllParams(newbook.book_title, newbook.book_description, response_id_section[0].id_section, response_id_publishing_house[0].id_publishing_house, response_id_author);
        response = response.data.insertId;
        let response_book_user = await BookUserService.addBookUser(response, isAuth);
        router.push('/my_bookshelf')
    }


    useEffect(() => {
        getSection()
    }, [])
    useEffect(() => {
        getPublishingHouse()
    }, [])

    return (
        <form>
            <MyInput
                    value={newbook.book_description}
                    onChange={e => setNewbook({...newbook, book_description: e.target.value})}
                    type="text"
                    placeholder="description"
                />
                <label>
                  Раздел:
                  <select value={newbook.section_title} onChange={e => setNewbook({...newbook, section_title: e.target.value})}>
                    {section.map((section, index) =>
                        <option
                            value={section.section}
                            key={index}
                        >{section.section_title}</option>
                    )}
                  </select>
                </label>
                <div>
                    <label>
                      Издательство:
                      <select value={newbook.publishing_house_title} onChange={e => setNewbook({...newbook, publishing_house_title: e.target.value})}>
                        {publishingHouse.map((publishingHouse, index) =>
                            <option
                                value={publishingHouse.title}
                                key={index}
                            >{publishingHouse.publishing_house_title}</option>
                        )}
                      </select>
                    </label>
                </div>
                <MyButton onClick={addNewBook}>Добавить книгу!</MyButton>
        </form>
    );
};

export default TheSecondPartOfAddingTheBook;
