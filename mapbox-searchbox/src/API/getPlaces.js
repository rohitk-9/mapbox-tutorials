import axios from "axios";
export default async function getPlaces(query){
    try{
        const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
        const response = await axios.get(
            `https://api.mapbox.com/search/searchbox/v1/forward?q=${query}&country=in&auto_complete=true&access_token=${TOKEN}`
        );
        return response.data.features;
    }catch(error){
        console.error("There was error fetching places : ", error);
        return [];
    }
}