'use client'

import { useState, useCallback, useEffect } from 'react'
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api'

interface MapLocation {
  lat: number;
  lng: number;
}

interface RideMapProps {
  pickup: MapLocation | null;
  destination: MapLocation | null;
}

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 20.5937,
  lng: 78.9629
}

export default function RideMap({ pickup, destination }: RideMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  useEffect(() => {
    if (pickup && destination && window.google) {
      const directionsService = new google.maps.DirectionsService()

      directionsService.route(
        {
          origin: pickup,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === 'OK') {
            setDirectionsResponse(result)
          }
        }
      )
    }
  }, [pickup, destination])

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  )
}