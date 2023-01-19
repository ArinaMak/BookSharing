import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context";
import MyButton from "../components/UI/button/MyButton";
import UserService from "../API/user/UserService"
import '../styles/App.css';

function UserProfile() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const router = useHistory()
    const [userInfo, setUserInfo] = useState([])

    async function getInformationAboutUserById () {
        const response = await UserService.getAllInformationAboutUserByIDUser(isAuth);
        setUserInfo(response.data)
    }
    useEffect(() => {
        getInformationAboutUserById()
    }, [])

    return (
        <div className="App">
            <h1>Личный кабинет</h1>
            {userInfo.map((userInfo, index) =>
                <div className="Profile" key={index}>
                    <div><span>Логин: </span>{userInfo.user_login}</div>
                    <div><span>Email: </span>{userInfo.user_email}</div>
                    <div><span>Фамилия: </span>{userInfo.user_surname}</div>
                    <div><span>Имя: </span>{userInfo.user_name}</div>
                    <div><span>Отчество: </span>{userInfo.user_patronymic}</div>
                    <div><span>Станция метро: </span>{userInfo.metro_station_title}</div>
                </div>
            )}
            <MyButton onClick={() => router.push("/my_bookshelf")}> Мои книги </MyButton>
            <MyButton onClick={() => router.push("/borrowed_books")}> Список одолженных книг </MyButton>

        </div>
    )
}

export default UserProfile;