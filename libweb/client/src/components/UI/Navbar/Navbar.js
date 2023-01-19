import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import classes from './Navbar.module.css';

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const router = useHistory()
    let profile_url="/profile/"+isAuth

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
    const login = () => {
        router.push('/login')
    }

    return (
        <div className="navbar">
            <div className="navbar__links">
                <Link to="/home" className={classes.myLnk}>Дом</Link>
            </div>
            {isAuth ?
                <div>
                    <Link to={profile_url} className={classes.myLnk}>Профиль</Link>
                    <MyButton onClick={logout}>
                        Выйти
                    </MyButton>
                </div> :
                <div>
                    <MyButton onClick={login}>
                        Войти
                    </MyButton>
                </div>
            }



        </div>
    );
};

export default Navbar;
