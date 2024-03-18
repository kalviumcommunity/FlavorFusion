import {Link} from 'react-router-dom'


function Welcome() {
    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    if(getCookie('username')!=undefined) {return(
        <div className='navbar-container'>
            <div className='navbar-content'>
                <h3 className='title'>Welcome {getCookie('username')}</h3>
                {getCookie('username') !== undefined ? (
                    <Link to="/logout" id='logout' className='button'>Logout</Link>
                ) : (
                    <Link to="/login" className='button'>Login</Link>
                )}
            </div>
        </div>)}
      else{return(
      <Link to="/login"><button id='login' className='button'>Login</button></Link>)}}


export default Welcome