import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './Component/Home.jsx'
import CreateUser from './Component/CreateUser.jsx';
import UpdateUser from './Component/UpdateUser.jsx';
import LogInPage  from './Component/Login.jsx';
import LogOutPage from './Component/Logout.jsx';
import SignupPage from './Component/Signup.jsx';


function AllRouter(){
    return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/create' element={<CreateUser/>}/>
            <Route path='/update/:id' element={<UpdateUser/>}></Route>
            <Route path='/login' element={<LogInPage/>}></Route>
            <Route path='/logout' element={<LogOutPage/>}></Route>
            <Route path='/signup' element={<SignupPage/>}></Route>

        </Routes>
    )
}

export default AllRouter;