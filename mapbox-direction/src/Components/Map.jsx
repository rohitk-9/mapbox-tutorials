import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import getDirection from "../API/getDirection";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map(){
    const mapRef = useRef(null);

    const start = [75.85, 22.71];   // [longitutde, latitude]
    const end = [75.91, 23.06];

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current,
            center: start,
            zoom: 9,
        });
        
        map.on('load',async()=>{
            new mapboxgl.Marker({color : "green"})
                .setLngLat(start)
                .addTo(map);

            new mapboxgl.Marker({color : "red"})
                .setLngLat(end)
                .addTo(map);

            const directionData = await getDirection(start[0], start[1], end[0], end[1]);
            if (!directionData || !directionData.routes || directionData.routes.length === 0){
                console.error("No route found");
                return;
            }
            const route = directionData.routes[0].geometry;

            map.addSource("route", {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {},
                    geometry: route,
                },
            });
            map.addLayer({
                id: "route-line",
                type: "line",
                source: "route",
                layout: {
                    "line-join" : "round",
                    "line-cap" : "round",
                },
                paint : {
                    "line-color" : "blue",
                    "line-width": 5,
                },
            });

            const coordinates = route.coordinates;
            const bounds = coordinates.reduce((b, coord) => b.extend(coord), new mapboxgl.LngLatBounds( coordinates[0], coordinates[0]));
            map.fitBounds(bounds, {padding: 40});
                
        })

        return () => map.remove();
    }, []);

    return <div ref={mapRef} style={{width:"1000px", height:"500px"}} />;
}


