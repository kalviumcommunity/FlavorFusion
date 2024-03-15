import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './Component/Home.jsx'
import CreateUser from './CreateUser.jsx';

function AllRouter(){
    return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/create' element={<CreateUser/>}/>
        </Routes>
    )
}

export default AllRouter;