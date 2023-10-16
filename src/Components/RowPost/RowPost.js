import React, { useEffect } from 'react'
import "./RowPost.css"
import axios from '../../axios'
import {imageUrl,API_KEY} from '../../constants/constants'
import { useState } from 'react'
import Youtube from "react-youtube"

function RowPost(props) {

const [movie,setMovie]=useState([])
const [Url,setUrl]=useState('')

  useEffect(()=>{
      axios.get(props.url).then(Response=>{
      console.log(Response.data)
      setMovie(Response.data.results)
    })
  },[props.url])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie= (id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(Response=>{
      if(Response.data.results.length!==0)
      {
        setUrl(Response.data.results[0].key)
      }
      else
      {
        console.log("Trailer not available")
      }

    })
    console.log(id)
  }

  return (
    <div className='row'>
      <h1>{props.title}</h1>
      <div className='posters'>
        {
          movie.map((obj)=>
           
            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall? "smallPoster" : "poster"} src={`${imageUrl+obj.backdrop_path}`} alt="" />

          )
            
        }
        
     </div>
       { Url && <Youtube opts={opts} videoId={Url} /> }
    </div>
  )
}

export default RowPost
