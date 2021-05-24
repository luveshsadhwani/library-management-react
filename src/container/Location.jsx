import React,{ useState } from 'react'
import ReactMapGl, {Marker} from "react-map-gl"
import marker from "./assets/marker4.png"

export default function Location() {

    const[config,setConfig] = useState({
        latutude:100,
        longitude:100,
        width:"100%",
        height:"100vh",
        zoom:5
    });

    return(
        <ReactMapGl {...config}
         maxZoom={20}
        mapboxApiAccessToken={'Token From MapBox'}
        onViewportChange={(newViewport)=>{
            setConfig({...newViewport})
        }}>
            <Marker latitude={30.3753} longitude={69.3451}>
                
                    <img src={marker} color={'red'} alt="marker"></img>
                
            </Marker>
            <Marker latitude={4.2105} longitude={101.9758}>
                <img src={marker} alt="marker"></img>
            </Marker>
        </ReactMapGl>
        
    )
}
