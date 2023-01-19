import React, {useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Calendar from 'react-calendar';
import {AuthContext} from "../context";
import ExtraditionService from "../API/extradition/ExtraditionService";
import 'react-calendar/dist/Calendar.css';
import '../styles/Extradition.css';
import '../styles/App.css';

const ExtraditionIdBookUser = () => {
    const params = useParams()
    //const [extradition, setExtradition] = useState({extradition_id_book_user: '', extradition_id_user: '', extradition_date_of_extradition: '', extradition_required_return_date: ''})
    const [date, setDate] = useState(new Date());
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const router = useHistory()

    async function addExtradition (e){
        e.preventDefault();
        let start_date=""
        let end_date=""
        start_date=date[0].getFullYear()+'.'+(date[0].getMonth()+1)+'.'+date[0].getDate()
        end_date=date[1].getFullYear()+'.'+(date[1].getMonth()+1)+'.'+date[1].getDate()
        let response = await ExtraditionService.addNewExtradition(params.id_book_user, isAuth, start_date, end_date);
        router.push('/home')
    }

    return (
        <div>
            <div>
                <form>
                    <div className='app'>
                      <h1 className='text-center'>Пожалуйста, выберите нужные вам даты</h1>
                      <div className='calendar-container'>
                        <Calendar
                          onChange={setDate}
                          value={date}
                          selectRange={true}
                        />
                        <div className='buttonLend'>
                            <button className='buttonLendIn' onClick={addExtradition}>Одолжить!</button>
                        </div>
                      </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExtraditionIdBookUser;
