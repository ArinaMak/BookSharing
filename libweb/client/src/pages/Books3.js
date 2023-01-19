import React, {useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import BookForm from "../components/BookForm";
import MyModal from "../components/UI/MyModal/MyModal";
import TheSecondPartOfAddingTheBook from "../components/TheSecondPartOfAddingTheBook"
import TheFirstPartOfAddingTheBook from "../components/TheFirstPartOfAddingTheBook"
import BookService from "../API/book/BookService";

function Books3() {
    const [newbook2, setNewbook2] = useState({id_book: '', book_title: '', author_name: '', book_description: '', section_title: '', publishing_house_title: ''})            //the book that will be added to the database (if there is not one yet)
    const [findingBook, setFindingBook] = useState({id_book: '', book_title: '', author_name: '', book_description: '', section_title: '', publishing_house_title: ''})      //the book found in the database
    const [doWeNeedToFillAllFields, setDoWeNeedToFillAllFields] = useState(false);      //do we need to continue filling in all the fields in the workbook
    const [modal, setModal] = useState(false);                                          //the variable responsible for the visibility of the modal window
    //const {isAuth, setIsAuth} = useContext(AuthContext);



    async function SearchBookInDB(e){           //the function TAKES the name of the book and the author, LOOKS for whether there is such a book in the database
        e.preventDefault();
        let response = await BookService.getBookByTitleAndAuthor(newbook2.book_title, newbook2.author_name);
        if (response.length!==0){
            setModal(true)
            setFindingBook(response)
        }
        else{
            /////setModal(false)
            setDoWeNeedToFillAllFields(true)
            setFindingBook(response)
            setModal(true)
        }

    }



    return (
        <div className="App">
            <TheFirstPartOfAddingTheBook newbook={newbook2} setNewbook={setNewbook2} setDoWeNeedToFillAllFields={setDoWeNeedToFillAllFields}/>
            {doWeNeedToFillAllFields===false ?
                <MyButton style={{marginTop: 30}} onClick={SearchBookInDB}>
                    Далее
                </MyButton>
            : null}
            {findingBook.length>0 ?
                <div>
                    <MyModal visible={modal} setVisible={setModal}>
                        <BookForm finding_book={findingBook[0]} setDoWeNeedToFillAllFields={setDoWeNeedToFillAllFields} setModal={setModal}/>
                    </MyModal>

                    {doWeNeedToFillAllFields===true ?
                        <TheSecondPartOfAddingTheBook newbook={newbook2} setNewbook={setNewbook2}/>
                    : null}
                </div>
            :
                (doWeNeedToFillAllFields===true ?
                    <TheSecondPartOfAddingTheBook newbook={newbook2} setNewbook={setNewbook2}/>
                : null)
            }
        </div>
    );
}

export default Books3;
