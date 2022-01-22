import React, { useState ,useEffect} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import Info from './components/Info/Info'
import Map from './components/Map'
import Summary from './components/Summary'
import wiki from 'wikijs'
import ReactLoading from 'react-loading'
import './style.css'
import 'react-toastify/dist/ReactToastify.css';


export default function App() {


const [selectedCountry, setSelectedCountry] = useState('Iran');
const [summary ,setSummary]=useState('');
const [status ,setStatus]=useState(true);
const [info ,setInfo]=useState('');
const [flag ,setFlag]=useState('');
const [lang ,setLang]=useState(false);
const [api ,setApi]=useState("https://en.wikipedia.org/w/api.php")

async function fetchData(){
    const page= await wiki({apiUrl:api}).page(selectedCountry)
    
    const [summary ,info ,images] =await Promise.all([
        page.summary(),
        page.info(),
        page.images()

    ])

    const flag =info.imageFlag.replace(/\s/g , '_')
    switch(selectedCountry){
        case "Canada":
           setFlag("https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg");
        break;
        
        case "China":
           setFlag("https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg");
           break;
        case "Australia":
            setFlag("https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg");
            break;
        default:
            break;
    }

    images.some(image =>{
        if(image.includes(flag)){
            setFlag(image);
            return true;
        }
        return false;
    })
     toast.info(`we got the ${selectedCountry}'s information :)`,{
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
        
    setSummary(summary);
    setInfo(info);
   setStatus(false)

}
useEffect(()=>{

fetchData();

},[selectedCountry])

    
    function handleSelectCountry(name) {
        setStatus(true)
        setSelectedCountry(name)
    }

    function langHandle() {
        setStatus(true)
        
        if(!lang){
            
            setApi("https://fa.wikipedia.org/w/api.php")
        }else{
            setApi("https://en.wikipedia.org/w/api.php")
        }
        setLang(!lang);
    }
    return (
        <div className="container mt-3 d-flex flex-column justify-content-center">
            <p className="col-12 text-center">پروژه کارگاه کامپیوتر  - علیرضا ایمانی</p>
            
            <div className="row">
                
                <div className="col-12 col-md-9">
                    <Map handleSelectCountry={handleSelectCountry} />
                </div>
                <div className="col-12 col-md-3">
                {status ? <ReactLoading type="spin" color="orange"/>: <Info info={info} flag={flag} selectedCountry={selectedCountry}/>}
                </div>
            </div>
            <div className=" mt-3 col-12 d-flex flex-column justify-content-center">
                {status ? <ReactLoading type="spin" color="orange"/>:<Summary summary={summary}/>}
            </div>
            <ToastContainer/>
        </div>
    )
}
