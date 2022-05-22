import React from 'react';

const MAP_API_BASE_URL = `${process.env.REACT_APP_MAP_API_BASE_URL}`;
console.log(MAP_API_BASE_URL);

const getImage = (props) => {
    console.log(props);
    let url = `${MAP_API_BASE_URL}/staticmap?key=${process.env.REACT_APP_LOC_API_KEY}&center=${props.lat},${props.lon}&icon=small-blue-cutout&size={300}x{300}&format=png&zoom=13`;
    return(<><img src={url} alt={`${props.lan},${props.lon}`}/></>);
}

export default getImage;
