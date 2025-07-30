import React, {useState} from 'react'
import getPlaces from '../API/getPlaces'

export default function Searchbox() {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [placeVisibility, setPlaceVisibility] = useState(false);

  const handleSearchChange = async(e) => {
    const value = e.target.value;
    setQuery(value);
    if (!query){
      setPlaces([]);
      setPlaceVisibility(false);
      return;
    }
    try{
      const result = await getPlaces(value);
      setPlaces(result);
      setPlaceVisibility(true);
      console.log(result);
    }catch (error){
      console.error("Error fetching places : ", error);
    }
  }

  const handlePlaceClick = (place) => {
    setQuery(place.properties.name);
    setPlaces([]);
    setPlaceVisibility(false);
  }

  return (
    <div style={{position:'relative', width:'500px', height:'40px'}}>
      <input
        type='text'
        value={query}
        onChange={handleSearchChange}
        placeholder='Search for a place'
        style={{width: '100%'}}
      />
      {placeVisibility && places.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%', 
          left: 0,
          right: 0,
          textAlign: 'left', 
          border: '1px solid', 
          listStyle: 'none', 
          margin: 0,
          padding: 0,
          zIndex: 1000
        }}>
          {places.map((place) => (
            <li
              key = {place.id}
              style={{padding: '8px', cursor: 'pointer'}}
              onClick={() => handlePlaceClick(place)}
            >
              {place.properties.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
