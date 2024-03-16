import React, {useEffect, useState} from "react"
import axios from 'axios'
import {Link} from "react-router-dom"
import Welcome from "./SubComponent/Welcome"

function Home (){
    const[data,setData]=useState([])
    const [filter,setFilter] = useState("All")

    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    const token = getCookie('token')

    useEffect(()=>{
        axios.get('http://localhost:3000/getallflavourfusion')
        .then((response)=> {setData(response.data);
        console.log(response.data)})
        .catch(error =>console.error(error))
    }, []);

    const filteredData = data.filter((item) => {
        if (filter === "All") {
          return item;
        } else if (item.Created_by && item.Created_by.includes(filter)) {
          return item;
        }
      });
    const deleteData=(id)=>{
        axios.delete(`http://localhost:3000/deleteFlavourFusion/${id}`)
        .then((response)=>{ console.log(response.data);
            window.location.reload()})
        .catch((error)=> console.error(error))       
    }

    return (
        <>
        <div className="container">
        <Welcome/>
        <h1 className="head">Recipes</h1>
        <Link to='/create'><button className="add">Add+</button></Link>
        <p className="created"> Created By : </p> 
            <select className="created" name="CREATEDBY" id="CREATEDBY" onChange={(e)=>{setFilter(e.target.value)}}>
              <option value="All">All</option>
              <option value="Raghav">Raghav</option>
              <option value="Goutham">Mridula</option>
              <option value="Esther">Revathi</option>
              <option value="Nithya">Karthik</option>
            </select>
        <div className="profile">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>RECIPE</th>
                <th>INSTRUCTIONS</th>
                <th>COOKINGTIME</th>
                <th>NUTRITIONALINFORMATION</th>
                <th>CREATEDBY</th>
                <th>UPDATE & DELETE</th>
            </tr>
            </thead>
            <tbody>
            {/* <div className="profile"> */}
            {data.map((profile,index)=>(
                <tr>
                    <td>{profile.ID}</td>
                    <td>{profile.RECIPE}</td>
                    <td>{profile.INSTRUCTIONS}</td>
                    <td>{profile.COOKINGTIME}</td>
                    <td>{profile.NUTRITIONALINFORMATION}</td>
                    <td>{profile.CREATEDBY}</td>
                    <td><Link to={`/update/${profile.ID}`} state={profile}><button id="update">Update</button></Link> <button className="delete" onClick={(e)=>deleteData(profile.ID)}>Delete</button></td>
                </tr>
            ))}
            {/* </div>:<div id='Body-content'>
            <div id="login">
            <h1>Please Login To Continue</h1>
            </div>
          </div> */}
            </tbody>
        </table>
    </div>
    </div>
    </>
)}                            
        
    
export default Home;
