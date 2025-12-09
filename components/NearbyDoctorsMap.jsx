import React, { useEffect, useRef } from 'react';

const NearbyDoctorsMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOCrVX-abT1doCNQTUesmHihYpSMCV2OE&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap; // Make initMap globally accessible for the callback
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Initialize map
          mapInstance.current = new window.google.maps.Map(mapRef.current, {
            center: userLocation,
            zoom: 14,
          });

          // Add user marker
          new window.google.maps.Marker({
            position: userLocation,
            map: mapInstance.current,
            title: "You are here!",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          });

          // Draw a 5 km radius circle
          const searchRadius = 5000;
          new window.google.maps.Circle({
            strokeColor: "#1E90FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#1E90FF",
            fillOpacity: 0.15,
            map: mapInstance.current,
            center: userLocation,
            radius: searchRadius,
          });

          // Initialize Places service
          const service = new window.google.maps.places.PlacesService(mapInstance.current);

          // Two search keywords
          const keywords = ["neurologist", "neuro-oncologist"];

          // Loop through each keyword and search
          keywords.forEach((keyword) => {
            const request = {
              location: userLocation,
              radius: searchRadius,
              keyword: keyword,
            };

            service.nearbySearch(request, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                  const place = results[i];
                  const marker = new window.google.maps.Marker({
                    position: place.geometry.location,
                    map: mapInstance.current,
                    title: place.name,
                    icon:
                      keyword === "neurologist"
                        ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        : "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  });

                  // Info window
                  const infoWindow = new window.google.maps.InfoWindow({
                    content: `<strong>${place.name}</strong><br>
                              ${place.vicinity || ""}<br>
                              Rating: ${place.rating || "N/A"}<br>
                              <em>(${keyword})</em>`,
                  });

                  marker.addListener("click", () => {
                    infoWindow.open(mapInstance.current, marker);
                  });
                }
              } else {
                console.warn("Search failed for " + keyword + ": " + status);
              }
            });
          });
        });
      } else {
        alert("Geolocation not supported by your browser.");
      }
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div className="map-section">
      <h3 style={{ color: '#333', marginBottom: '15px' }}>Nearby Neurologists</h3>
      <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default NearbyDoctorsMap;