import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Books3 from "../pages/Books3";
import Home from "../pages/Home";
import UserBookshelf from "../pages/UserBookshelf";
import ExtraditionIdBook from "../pages/ExtraditionIdBook";
import ExtraditionIdBookUser from "../pages/ExtraditionIdBookUser";
import UserProfile from "../pages/UserProfile";
import BorrowedBooks from "../pages/BorrowedBooks";

export const privateRoutes = [
    {path: '/signin', component: Signin, exact: true},
    {path: '/books3', component: Books3, exact: true},
    {path: '/my_bookshelf', component: UserBookshelf, exact: true},
    {path: '/home', component: Home, exact: true},
    {path: '/extradition/:id_book', component: ExtraditionIdBook, exact: true},
    {path: '/extradition/book/:id_book_user', component: ExtraditionIdBookUser, exact: true},
    {path: '/profile/:id_user', component: UserProfile, exact: true},
    {path: '/borrowed_books', component: BorrowedBooks, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
    {path: '/signin', component: Signin, exact: true},
    {path: '/home', component: Home, exact: true},
]
