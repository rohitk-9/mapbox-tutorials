import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map(){
    const mapRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current,
            center: [78, 21], //[lng, lat]
            zoom: 9,
        });
        
        map.on('load', ()=>{
            new mapboxgl.Marker({
                color: "red",
                draggable: true
            })
            .setLngLat([78,21])
            .addTo(map);
        })

        return () => map.remove();
    }, []);

    return <div ref={mapRef} style={{width:"1000px", height:"500px"}} />;
}