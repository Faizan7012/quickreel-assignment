import { useEffect, useRef, useState } from "react";
import * as faceapi from 'face-api.js'
import Uploader from "./Uploader";
import './player.css'

export default function VideoPlayer(){
    const vidH = 360;
    const vidW= 630;
    const [vidUrl , setVidUrl] = useState('');
    const [isPlay , setIsPlay] = useState(false)
    const vidRef = useRef();
    const canvRef = useRef();
    const ID = useRef();


    useEffect(()=>{
      const loadModels = async()=>{
        const MODEL_URL = process.env.PUBLIC_URL + '/models';

     await  Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ])
      }
      loadModels();
    },[])

  const DrawRectangle = ()=>{
    if(vidUrl){

        ID.current = setInterval(async()=>{
            canvRef.current.innerHTML = faceapi.createCanvas(vidRef.current);
            const displaySize = {
                width : vidW,
                height : vidH
            }
    
            faceapi.matchDimensions(canvRef.current , displaySize);
             const detections = await faceapi.detectAllFaces(vidRef.current , new faceapi.TinyFaceDetectorOptions).withFaceLandmarks()
             .withFaceExpressions().withFaceDescriptors();
             const resizeDetections = faceapi.resizeResults(detections , displaySize);
             canvRef.current.getContext('2d').clearRect(0,0,vidW,vidH);
             console.log(canvRef.current)
             faceapi.draw.drawDetections(canvRef.current , resizeDetections);
             faceapi.draw.drawFaceLandmarks(canvRef.current , resizeDetections);
             
        },100)
    }

  }

  const handlePlayPause = () => {
    const video = vidRef.current;
    if (video.paused) {
      video.play();
      setIsPlay(true)
    } else {
      video.pause();
      setIsPlay(false)
    }
  };

  const handlePlayDel = ()=>{
    window.location.reload();

  }
 
    return <div>
      {
        vidUrl? <div>
        <div className="flexBox">
        <video className="video" ref={vidRef} src={vidUrl} height={vidH} width={vidH} muted onPlay={DrawRectangle} loop/>
        <canvas ref ={canvRef} className="canvas"/>
        </div>
        <div className="btnBox">
        <button onClick={handlePlayPause}>{isPlay?'Pause':'Play'}</button>
        <button onClick={handlePlayDel}>Delete</button>
        </div>

        </div> : <Uploader setVidUrl = {setVidUrl}/>
      }

    </div>
}