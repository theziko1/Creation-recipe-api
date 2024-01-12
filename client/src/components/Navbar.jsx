import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaXmark , FaBars } from "react-icons/fa6";

const NavBar = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [lastBtn, setBtn] = useState(null)
    const [isHidden, setIsHidden] = useState(false)
    const [isFalse, setIsFalse] = useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const nav = useNavigate()
    const [data, setData] = useState({
        dishType: "",
        name: "",
        image: null,
        ingrediants: "",
        inscructions: "",

    })
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handelClick = (e) => {
        if (lastBtn == null) {

            setBtn(e)
            e.target.classList.add("bg-slate-600")
            e.target.classList.add("text-white")
        } else {
            lastBtn.target.classList.remove("bg-slate-600")
            lastBtn.target.classList.remove("text-white")
            e.target.classList.add("bg-slate-600")
            e.target.classList.add("text-white")
            setBtn(e)
        }
        setIsHidden(false)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };  

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setData((prevData) => ({
          ...prevData,
          image: imageFile,
        }));
      };  
    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'image') {
          setData((prevData) => ({
            ...prevData,
            [name]: files[0],
          }));
        } else {
          setData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Créer un objet FormData pour l'envoi des données du formulaire
        const formDataToSend = new FormData();
        formDataToSend.append('name', data.name);
        formDataToSend.append('image', data.image);
        formDataToSend.append('dishType', data.dishType);
        formDataToSend.append('ingrediants', data.ingrediants);
        formDataToSend.append('inscructions', data.inscructions);
    
        try {
          // Utiliser Axios pour envoyer la requête POST avec FormData
          const response = await axios.post("http://localhost:5000/recipe", formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log('Réponse du serveur :', response.data);
    
          // Réinitialiser le formulaire après la soumission si nécessaire
          setData({
            dishType: "",
            name: "",
            image: null,
            ingrediants: "",
            inscructions: "",
          });
        } catch (error) {
          console.error('Erreur lors de l\'envoi du formulaire :', error);
        }
      };


    const uploadImages = async (e) => {
        // alert("")
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append("image",data.image)
            await axios.post("http://localhost:5000/upload", formData)
            console.log(res.data.image);
            setIsLoading(false)
        }

        catch (error) {
            console.log(error)
        }
    }


    const handleSave = async (e) => {
        e.preventDefault()
        try {
            if (data.image == ""  || data.dishType == "" || data.ingrediants == "" || data.inscructions == "") {

                setIsFalse(true)
            } else {
                const {dishType,name,image,ingrediants,inscructions} = data
                const formData = new FormData()
                formData.append("dishType",dishType)
                formData.append("name",name)
                formData.append("image",image)
                formData.append("ingrediants",ingrediants)
                formData.append("inscructions",inscructions)

                await axios.post("http://localhost:5000/recipe",formData )
                .then(setIsHidden(false))
                .then(setData({
                    dishType: "",
                    name: "",
                    image: null,
                    ingrediants: "",
                    inscructions: "",
                }))
                // .then(window.location.reload())
                alert('Form submitted successfully!');
                console.log(res.data)
            }

        } catch (error) {
            console.log(error)
            alert('An error occurred while submitting the form.'+ErrorEvent);
        }
    }


    useEffect(() => {
        Aos.init({
            // offset: 200,
            duration: 200,
            // easing: 'ease-in-sine',
            // delay: 100,
        });
    }, [isHidden])
    return (
        <div className="text-xl transition-all duration-300 px-14 flex justify-between items-center top-0 bg-[rgb(255,242,213,.7)] w-full fixed p-2 z-10 h-min">
            <Link to="/"><img src="/img/logo.png" className="w-20" alt="" /></Link>
            <div className="gap-x-11 hidden md:flex ">
                <Link to="/all-plates"><div className="first-letter:capitalize transition-all duration-300 p-2 hover:bg-slate-600 hover:text-white rounded" onClick={handelClick}>all the plates</div></Link>
                <Link to="/"><div className="first-letter:capitalize transition-all duration-300 p-2 hover:bg-slate-600 hover:text-white rounded" onClick={handelClick}>by category</div></Link>
            </div>
            <div>
                <button className="first-letter:capitalize transition-all duration-300 p-3 w-16 hover:bg-slate-600 hover:text-white rounded" onClick={() => setIsHidden(!isHidden)}>add</button>
            </div>

            <div className="md:hidden">
                     <button onClick={toggleMenu} className="text-NeutralDGrey focus:outline-none focus:text-gray-500">
                        {
                            isMenuOpen ? (<FaXmark className="h-6 w-6 "/>) : (<FaBars className="h-6 w-6 "/>)
                        }
                     </button>
                </div>
                <div className={`${isMenuOpen ? "fixed top-[100px] left-0 right-0  text-center block bg-[rgb(255,242,213,.7)]" : "hidden"}`}>
                <Link to="/all-plates"><div className="first-letter:capitalize transition-all duration-300 p-2 hover:bg-slate-600 hover:text-white rounded" onClick={handelClick}>all the plates</div></Link>
                <Link to="/"><div className="first-letter:capitalize transition-all duration-300 p-2 hover:bg-slate-600 hover:text-white rounded" onClick={handelClick}>by category</div></Link>
              </div>    
            <div className={`pb-16 mt-0 absolute top-24  left-0 backdrop-blur-sm bg-black/30 h-screen w-screen ${isHidden == false ? "hidden" : "flex"} flex-col justify-start items-center gap-2`} data-aos="zoom-in">
                <form className="w-[90%] h-[70%] grid grid-cols-1  " onSubmit={handleSubmit} >
                    <div className="grid-cols-1 grid h-[90%]">
                        <div className="flex h-[90%]">

                            <div className="w-full">

                                <label htmlFor="dishtype" className="block mb-2 text-sm font-medium text-gray-900 ">Select an option</label>
                                <select name="dishtype" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize outline-none" onChange={handleInputChange}>
                                    <option >Choose a category</option>
                                    <option  defaultValue="appetizer" value={data.dishType}>appetizer</option>
                                    <option defaultValue="main" value={data.dishType}>main course</option>
                                    <option defaultValue="dessert" value={data.dishType}>dessert</option>
                                </select>

                            </div>
                            <div className="w-full">
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900  capitalize">image</label>
                                <input type="file" accept="image/*" name="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  outline-none" placeholder="image" onChange={handleImageChange} multiple={false} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900  capitalize">name</label>
                            <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  outline-none" placeholder="Pizza" value={data.name} onChange={handleInputChange} />
                        </div>
                        <div className="flex justify-around gap-x-5">
                           
                            <div className="w-full">
                                <label htmlFor="ingrediants" className="block mb-2 text-sm font-medium text-gray-900 ">Ingredients</label>
                                <textarea name="ingrediants" rows="4" className="w-full outline-none block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  " placeholder="Write your a Ingredients here..." value={data.ingrediants} onChange={handleInputChange}></textarea>

                            </div>
                        </div>
                       {/* // .replace(/\r\n/g, "\n").split("\n") }) */}
                        <div>
                            <label htmlFor="inscructions" className="block mb-2 text-sm font-medium text-gray-900 ">Instructions</label>
                            <textarea name="inscructions" rows="4" className="w-full outline-none block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  " placeholder="Write your Instructions here..." value={data.inscructions} onChange={handleInputChange}></textarea>

                        </div>
                    </div>
                    <div className=" mt-2 grid grid-cols-1 justify-center w-full">

                    <button type="submit" className="text-white  p-3 bg-green-400 hover:bg-green-700 transition-all rounded-md ">save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NavBar;