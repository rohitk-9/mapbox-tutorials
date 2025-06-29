import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map(){
    const mapRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current,
            center: [78, 21], //[lng, lat]
            zoom: 9,
        });
        return () => map.remove();
    }, []);

    return <div ref={mapRef} style={{width:"1000px", height:"500px"}} />;
}