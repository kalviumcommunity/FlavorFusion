import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRecipe () {
    const navigate = useNavigate()
    const [id,setId]=useState("")
    const [recipe,setRecipe]=useState("")
    const [instructions,setInstructions]=useState("")
    const [cookingtime,setCookingTime]=useState("")
    const [nutritionalinformation,setNutritionalInformation]=useState("")
    const [createdby,setCreatedBy]=useState("")
    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    const token = getCookie('token')
    const Formsubmit=(e)=>{

        e.preventDefault();
        axios.post('http://localhost:3000/addflavourfusion',{
        ID:id,
        RECIPE:recipe,
        INSTRUCTIONS:instructions,
        COOKINGTIME:cookingtime,
        NUTRITIONALINFORMATION:nutritionalinformation,
        CREATEDBY:createdby
    },{headers:{authorization:`Bearer ${token}`}})
    .then((response)=>{ console.log(response.data);
        navigate('/')
    })
    .catch((error)=> console.error(error))
    }

    return(
        <div className="create">
            <div>
                <form onSubmit={Formsubmit}>
                    <h2 className="add-user">Add recipe</h2>
                    <div className="div1">
                        <label className="create1">Id</label>
                        <input type="text"  placeholder="Enter Id" className="create2" onChange={(e)=>setId(e.target.value)}/>
                    </div>
                    <div className="div2">
                        <label className="create1">Recipe</label>
                        <input type="text"  placeholder="Enter Recipe" className="create2" onChange={(e)=>setRecipe(e.target.value)}/>
                    </div>
                    <div className="div3">
                        <label className="create1">Instructions</label>
                        <input type="text" placeholder="Enter Instructions" className="create2" onChange={(e)=>setInstructions(e.target.value)}/>
                    </div>
                    <div className="div4">
                        <label className="create1">Cookingtime</label>
                        <input type="text" placeholder="Enter Cookingtime" className="create2" onChange={(e)=>setCookingTime(e.target.value)}/>
                    </div>
                    <div className="div5">
                        <label className="create1">Nutritionalinformation</label>
                        <input type="text" placeholder="Enter Nutritinalinformation" className="create2" onChange={(e)=>setNutritionalInformation(e.target.value)}/>
                    </div>
                    <div className="div6">
                        <label className="create1">Createdby</label>
                        <input type="text" placeholder="Enter Createdby" className="create2" onChange={(e)=>setCreatedBy(e.target.value)}/>
                    </div>
                    <button type="submit" className="create-submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRecipe;