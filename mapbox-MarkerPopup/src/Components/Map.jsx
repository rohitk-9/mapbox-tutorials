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

            const popup = new mapboxgl.Popup({})
            .setHTML('<div style = "font-weight : bold; color: red">This is another method</div>')

            const marker = new mapboxgl.Marker({
                color: "red",
                draggable: true
            })
            .setLngLat([78,21])
            .setPopup(popup)
            .addTo(map);

            popup.addTo(map);

            marker.on('dragend', () => {
                const lngLat = marker.getLngLat();
                popup.setHTML(`
                    <div>
                        Current Location : <br/>
                        Lng : ${lngLat.lng} <br/>
                        Lat : ${lngLat.lat}
                    </div>    
                `)
            })

        })

        return () => map.remove();
    }, []);

    return <div ref={mapRef} style={{width:"1000px", height:"500px"}} />;
}