import React,{useState} from "react";
import axios from "axios";
import { useNavigate,useLocation,Link } from 'react-router-dom';

function UpdateUser () {
    const location = useLocation()
    const data = location.state;
    console.log(location)
    console.log("DATA : ",data)
    const [id,setId]=useState(data.ID)
    const [recipe,setRecipe]=useState(data.RECIPE)
    const [instructions,setInstructions]=useState(data.INSTRUCTIONS)
    const [cookingtime,setCookingTime]=useState(data.COOKINGTIME)
    const [nutritionalinformation,setNutritionalInformation]=useState(data.NUTRITIONALINFORMATION)
    const [createdby,setCreatedBy]=useState(data.CREATEDBY)

    
    const navigate=useNavigate()
    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    const token = getCookie('token')
    const Formsubmit=(e)=>{

        e.preventDefault();
        axios.patch(`http://localhost:3000/updateflavourfusion/${id}`,{
            ID:id,
            RECIPE:recipe,
            INSTRUCTIONS:instructions,
            COOKINGTIME:cookingtime,
            NUTRITIONALINFORMATION:nutritionalinformation,
            CREATEDBY:createdby
    },{headers:{authorization:`Bearer ${token}`}})
    .then((response)=>{ console.log(response.data);
    navigate('/')})
    .catch((error)=> console.error(error))
    }

    return(
        <div className="create">
            <div>
                <form onSubmit={Formsubmit}>
                    <h2 className="add-user">Update recipe</h2>
                    <div className="div1">
                        <label className="create1">Id</label>
                        <input type="text" defaultValue={id} placeholder="Enter Id" className="create2" onChange={(e)=>setId(e.target.value)}/>
                    </div>
                    <div className="div2">
                        <label className="create1">Recipe</label>
                        <input type="text" defaultValue={recipe} placeholder="Enter Recipe" className="create2" onChange={(e)=>setRecipe(e.target.value)}/>
                    </div>
                    <div className="div3">
                        <label className="create1">Instructions</label>
                        <input type="text" defaultValue={instructions} placeholder="Enter Instructions" className="create2" onChange={(e)=>setInstructions(e.target.value)}/>
                    </div>
                    <div className="div4">
                        <label className="create1">Cookingtime</label>
                        <input type="text" defaultValue={cookingtime} placeholder="Enter Cookingtime" className="create2" onChange={(e)=>setCookingTime(e.target.value)}/>
                    </div>
                    <div className="div5">
                        <label className="create1">Nutritionalinformation</label>
                        <input type="text" defaultValue={nutritionalinformation} placeholder="Enter Nutritinalinformation" className="create2" onChange={(e)=>setNutritionalInformation(e.target.value)}/>
                    </div>
                    <div className="div6">
                        <label className="create1">Createdby</label>
                        <input type="text" defaultValue={createdby} placeholder="Enter Createdby" className="create2" onChange={(e)=>setCreatedBy(e.target.value)}/>
                    </div>
                    <button type="submit" className="create-submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;