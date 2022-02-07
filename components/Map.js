import React, {useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';


const Map = ({searchResults}) => {
    const [sectedLocation, setSectedLocation] = useState('');
    const coordinates = searchResults.map(reasult => ({
        longitude: reasult.long,
        latitude: reasult.lat
    }));

    const center = getCenter(coordinates);
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/alamgir-roni/cksjqckcc23hi18lulm6ejfiu"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            role="img"
                            aria-label="push-pin"
                            className="cursor-pointer text-2xl animate-bounce"
                            onClick={() => setSectedLocation(result)}
                        >
                            <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/32/map-marker-icon.png"
                                 alt=""/>
                        </p>
                    </Marker>
                    {sectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
