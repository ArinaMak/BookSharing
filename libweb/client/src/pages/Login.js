import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../context";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import UserService from "../API/user/UserService";
import classes from '../components/UI/Navbar/Navbar.module.css';

const Login = () => {
    const [user, setUser] = useState({user_login: '', user_password: ''})
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const router = useHistory()

    async function userLogin (e){
        e.preventDefault();
        let response = await UserService.getIDUserByLoginAndPassword2(user.user_login, user.user_password);

        if (response.length!==0){
            setIsAuth(response[0].id_user);
            localStorage.setItem('auth', response[0].id_user)
            router.push("home")

        }
        else{
            setIsAuth(false);
            localStorage.setItem('auth', 'false')
        }

    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <form>
                <MyInput
                    value={user.user_login}
                    onChange={e => setUser({...user, user_login: e.target.value})}
                    type="text"
                    placeholder="Введите логин"
                />
                <MyInput
                    value={user.user_password}
                    onChange={e => setUser({...user, user_password: e.target.value})}
                    type="password"
                    placeholder="Введите пароль"
                />
                <MyButton onClick={userLogin}>Войти!</MyButton>
                <div>
                    <Link to="/signin" className={classes.myLnk2}>Ещё не зарегистрированы?</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
