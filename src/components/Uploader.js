import {MdCloudUpload} from 'react-icons/md'
import './uploader.css'

const Uploader = ({setVidUrl})=>{
        const handleVideoUpload = (e) => {
            const file = e.target.files[0];
            setVidUrl(URL.createObjectURL(file))
           }
    return (
        <main>
            <h2>Face Detector App</h2>
             <form action="" onClick={()=> document.querySelector('input').click()}>
            <input type="file" accept="video/*" hidden onChange={handleVideoUpload}/>
             <div className="uplaodBox">
            <MdCloudUpload color='#1475cf' size={60} />
            <p>Browse Files To Upload</p>
             </div>
            </form> 
        </main>
    )

}

export default Uploader