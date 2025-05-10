import React from 'react';
import { Map, TileLayer } from 'leaflet';

import { City } from '../types/types';

const useMap = (
  mapRef: React.MutableRefObject<HTMLElement | null>,
  currentCity: City
): Map | null => {

  const [map, setMap] = React.useState<Map | null>(null);

  const isRenderedRef = React.useRef<boolean>(false);

  React.useEffect(() => {

    let instance = map;

    if (currentCity !== undefined) {

      if (mapRef.current !== null && !isRenderedRef.current) {

        instance = new Map(mapRef.current, {
          center: {
            lat: currentCity.location.latitude,
            lng: currentCity.location.longitude,
          },
          zoom: currentCity.location.zoom,
        });

        const layer = new TileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        );

        instance.addLayer(layer);

        setMap(instance);
        isRenderedRef.current = true;
      }
    }

  }, [mapRef, currentCity, map]);

  return map;
};

export default useMap;
