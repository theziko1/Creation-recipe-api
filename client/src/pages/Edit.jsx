import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Edit() {
    // const nav = useNavigate();
    const { id } = useParams();
    // console.log(id);
    const [isLoading, setIsLoading] = useState()
    const nav = useNavigate()
    const [uplate, setUplate] = useState({
        image: "",
        name: '',
        ingrediants: [],
        inscructions: []
    })
    const updatePlates = async () => {
        await axios.put(`http://localhost:5000/recipe/${id}`, uplate)
            .then(response => {
                console.log('Le plat a été mis à jour avec succès !');
                console.log(response.data); // Afficher la réponse du serveur si nécessaire
            })
        nav(`/${id}`)

    };
    useEffect(() => {
        axios.get(`http://localhost:5000/recipe/${id}`)
            .then(response => {
                setUplate(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [id])


    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="mt-28 bg-gray-300 p-8 gap-3 w-[50rem] rounded-lg">
                    <div>
                        <label>name:</label><br />
                        <input className="min-w-full border p-2" type="text" value={uplate.name} onChange={(e) => {
                            setUplate({
                                ...uplate,
                                name: e.target.value
                            })
                        }} /><br />
                        <label>Ingredients:</label><br />

                        <textarea className="min-w-full border p-2" type="text" value={uplate.ingrediants} onChange={(e) => {
                            setUplate({
                                ...uplate,
                                ingrediants: e.target.value.trim().replace(/\r\n/g, "\n").split("\n")
                            })
                        }} />

                        <label>instructions:</label><br />
                        <textarea className="min-w-full border p-2" type="text" value={uplate.inscructions} onChange={(e) => {
                            setUplate({
                                ...uplate,
                                inscructions: e.target.value.trim().replace(/\r\n/g, "\n").split("\n")
                            })
                        }} />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className={`first-letter:capitalize transition-all duration-300 p-3 hover:bg-slate-600 bg-slate-500 hover:text-white rounded ${isLoading && "cursor-wait"}`} disabled={isLoading && true} onClick={updatePlates}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Edit;