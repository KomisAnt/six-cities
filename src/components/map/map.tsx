import React from 'react';

import { useSelector } from 'react-redux';

import { Marker, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { City, Location } from '../../types/types';

import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

import useMap from '../../hooks/useMap';
import { getActiveOfferCardId } from '../../redux/slices/offers-data-slice';

type MapLocation = {
  id: number;
  location: Location;
}

type MapLocations = MapLocation[];

type MapProps = {
  locations: MapLocations;
  sectionClassName: string;
  currentCity: City;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const Map = ({ locations, sectionClassName, currentCity }: MapProps): JSX.Element => {

  const activeCardId = useSelector(getActiveOfferCardId);

  const mapRef = React.useRef<HTMLElement>(null);

  const map = useMap(mapRef, currentCity);

  React.useEffect(() => {

    const markers: Marker[] = [];

    if (map) {

      locations.forEach(({ id, location }: MapLocation) => {

        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(id === activeCardId ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);

        markers.push(marker);
      });

      if (currentCity !== null) {
        const { latitude: lat, longitude: lng } = currentCity.location;
        map.setView({ lat, lng });
      }
    }

    return () => {
      if (map) {
        markers.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    };

  }, [map, currentCity, locations, activeCardId]);

  return (
    <section
      className={`${sectionClassName} map`}
      ref={mapRef}
      style={
        {
          width: `${sectionClassName === 'property__map' ? '60%' : ''}`,
          margin: `${sectionClassName === 'property__map' ? '0 auto' : ''}`,
          marginBottom: `${sectionClassName === 'property__map' ? '50px' : ''}`,
        }
      }
    />
  );
};

export default Map;
