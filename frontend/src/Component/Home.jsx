import React, {useEffect, useState} from "react"
import axios from 'axios'
import {Link} from "react-router-dom"

function Home (){
    const[data,setData]=useState([])
    const [filter,setFilter] = useState("All")

    useEffect(()=>{
        axios.get('http://localhost:3000/getallflavourfusion')
        .then((response)=> {setData(response.data);
        console.log(response.data)})
        .catch(error =>console.error(error))
    }, []);

    return (
        <>
        <h1 className="head">Profile</h1>
        <div className="container">
        {/* <Welcome/> */}
        <Link to='/create'><button className="add">Add+</button></Link>
        <p className="created"> Created By : </p> 
            <select className="created" name="CREATEDBY" id="CREATEDBY" onChange={(e)=>{setFilter(e.target.value)}}>
              <option value="All">All</option>
              <option value="Raghav">Raghav</option>
              <option value="Goutham">Mridula</option>
              <option value="Esther">Revathi</option>
              <option value="Nithya">Karthik</option>
            </select>
        {/* {(data.length > 1) ? */}
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
            </tr>
            </thead>
            <tbody>
            {data.map((profile,index)=>(
                <tr>
                    <td>{profile.ID}</td>
                    <td>{profile.RECIPE}</td>
                    <td>{profile.INSTRUCTIONS}</td>
                    <td>{profile.COOKINGTIME}</td>
                    <td>{profile.NUTRITIONALINFORMATION}</td>
                    <td>{profile.CREATEDBY}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    </div>
    </>
)}                            
        
    
export default Home;
