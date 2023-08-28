import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const gApiKey = "AIzaSyAQgEcPeJuB4Pm65bMrux7s82wfRk-yqws";

const containerStyle = {
  width: "500px",
  height: "500px",
};

const center = {
  lat: 14.632110344771151,
  lng: -90.50486265560536,
};
const zoom = 18;

function MyComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: gApiKey,
  });
  const { latitude, longitude, setLocation } = props;

  const [options, setOptions] = React.useState({
    center,
    zoom,
  });

  React.useEffect(() => {
    if (latitude && longitude) {
        setOptions({
          center: { lat: Number(latitude), lng: Number(longitude) },
          zoom,
        });
      } 
  },[latitude, longitude])

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    if (map) {
      map.addListener("click", (e) => {
        setOptions({
          center: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          zoom,
        });
        setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });
    }

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={options.center}
        zoom={options.zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={options.center} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
