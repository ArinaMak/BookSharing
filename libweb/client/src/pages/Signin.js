import React, {useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import RegistrationService from "../API/registration/RegistrationService"

const Signin = () => {
    const [newuser, setNewuser] = useState({login: '', email: '', surname: '', name: '', patronymic: '', userpassword: ''})

    const addUser = (e) => {
        e.preventDefault()
        RegistrationService.postNewUser(newuser)
        setNewuser({login: '', email: '', surname: '', name: '', patronymic: '', userpassword: ''})
    }

    return (
        <div>
            <h1>Регистрация</h1>
            <form>
                <MyInput
                    value={newuser.login}
                    onChange={e => setNewuser({...newuser, login: e.target.value})}
                    type="text"
                    placeholder="Логин"
                />
                <MyInput
                    value={newuser.email}
                    onChange={e => setNewuser({...newuser, email: e.target.value})}
                    type="text"
                    placeholder="email"
                />
                <MyInput
                    value={newuser.surname}
                    onChange={e => setNewuser({...newuser, surname: e.target.value})}
                    type="text"
                    placeholder="Фамилия"
                />
                <MyInput
                    value={newuser.name}
                    onChange={e => setNewuser({...newuser, name: e.target.value})}
                    type="text"
                    placeholder="Имя"
                />
                <MyInput
                    value={newuser.patronymic}
                    onChange={e => setNewuser({...newuser, patronymic: e.target.value})}
                    type="text"
                    placeholder="Отчество"
                />
                <MyInput
                    value={newuser.userpassword}
                    onChange={e => setNewuser({...newuser, userpassword: e.target.value})}
                    type="text"
                    placeholder="Пароль"
                />
                <MyButton onClick={addUser}>Зарегистрироваться</MyButton>
            </form>
        </div>
    );
};

export default Signin;
