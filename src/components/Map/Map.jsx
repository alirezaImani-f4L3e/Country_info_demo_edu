import React from 'react'
import map from './coords.json'
import ImageMapper from 'react-image-mapper';
import world from './map.jpg'

export default function Map({ handleSelectCountry }) {
    return (
        <ImageMapper
            onClick={(e) => handleSelectCountry(e.name)}
            src={world}
            map={map}
            width={800}
            imgWidth={1000} />
    )
}
