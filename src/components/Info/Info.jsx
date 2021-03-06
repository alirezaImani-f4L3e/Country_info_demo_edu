import React from 'react'

export default function Info({info ,flag ,selectedCountry}) {
    return (
        <div className="card" >
            <img className="card-img-top" src={flag} alt="Card cap" />
            <ul className="list-group list-group-flush">

                <li className="list-group-item">Name: {selectedCountry}</li>
                <li className="list-group-item">Capital: {info.capital}</li>
                <li className="list-group-item">Official languages: {info.officialLanguages}</li>
                <li className="list-group-item">Population: {info.populationEstimate}</li>
            </ul>
        </div>
    )
}
