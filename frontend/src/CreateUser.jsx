import React,{useState} from "react";
import axios from "axios";

function CreateRecipe () {
    const [id,setId]=useState("")
    const [recipe,setRecipe]=useState("")
    const [instructions,setInstructions]=useState("")
    const [cookingtime,setCookingTime]=useState("")
    const [nutritinalinformation,setNutritinalInformation]=useState("")
    const [createdby,setCreatedBy]=useState("")
    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    const token = getCookie('token')
    const Formsubmit=(e)=>{

        e.preventDefault();
        axios.post('https://localhost:3000/addflavourfusion',{
        ID:id,
        RECIPE:recipe,
        INSTRUCTIONS:instructions,
        COOKINGTIME:cookingtime,
        NUTRITIONALINFORMATION:nutritinalinformation,
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
                    <div className="div8">
                        <label className="create1">Id</label>
                        <input type="text" placeholder="Enter Id" className="create2" onChange={(e)=>setId(e.target.value)}/>
                    </div>
                    <div className="div1">
                        <label className="create1">Recipe</label>
                        <input type="text" placeholder="Enter Name" className="create2" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="div2">
                        <label className="create1">Instructions</label>
                        <input type="text" placeholder="Enter Email" className="create2" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="div3">
                        <label className="create1">Cookingtime</label>
                        <input type="text" placeholder="Enter MovieName" className="create2" onChange={(e)=>setMovieName(e.target.value)}/>
                    </div>
                    <div className="div4">
                        <label className="create1">Nutritinalinformation</label>
                        <input type="text" placeholder="Enter SongName" className="create2" onChange={(e)=>setSongName(e.target.value)}/>
                    </div>
                    <div className="div5">
                        <label className="create1">Createdby</label>
                        <input type="text" placeholder="Enter SongLink" className="create2" onChange={(e)=>setSongLink(e.target.value)}/>
                    </div>
                    <button type="submit" className="create-submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRecipe;