import React, {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW5uc2hpIiwiYSI6ImNrNW8yang2YzBjbHEzb21wdTZ4ZzllYW8ifQ.RpEmZRg6HNkC_3lS47apiQ';
export default (props) => {
    const mapContainer = useRef();
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [props.lng, props.lat],
            zoom: 20
        });
        const loadMap = () => {
            map.on('load', function () {
                map.addSource('point', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates':  [props.lng, props.lat]
                                }
                            }]
                    }
                });
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'point',
                    'layout': {
                        'icon-image': 'restaurant-15',
                    }
                });
            });
        };
        loadMap();
    }, []);
    return (
        <>
            <div ref={el => mapContainer.current = el} className="map__container" />
        </>
    );
};
