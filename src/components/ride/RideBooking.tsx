'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { GoogleMap, Marker, DirectionsRenderer, Autocomplete } from '@react-google-maps/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ShareRide from './ShareRide'

interface RideOption {
  id: string;
  name: string;
  capacity: number;
  fare: number;
  time: number;
}

interface FareBreakdown {
  baseFare: number;
  distanceFare: number;
  surgeFare: number;
  total: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px'
}

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629
}

const rideOptions: RideOption[] = [
  {
    id: '1',
    name: 'Standard',
    capacity: 4,
    fare: 250,
    time: 25,
  },
  {
    id: '2',
    name: 'Premium',
    capacity: 4,
    fare: 350,
    time: 25,
  },
  {
    id: '3',
    name: 'Van',
    capacity: 6,
    fare: 450,
    time: 30,
  },
]

export default function RideBooking() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [selectedRide, setSelectedRide] = useState<RideOption | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([])
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const [distance, setDistance] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [calculatedFare, setCalculatedFare] = useState<number>(0)
  const [isValidBooking, setIsValidBooking] = useState(false)
  const [fareBreakdown, setFareBreakdown] = useState<FareBreakdown>({
    baseFare: 0,
    distanceFare: 0,
    surgeFare: 0,
    total: 0
  })

  const mapRef = useRef<google.maps.Map | null>(null)
  const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const dropoffAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .pac-container {
        background-color: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        margin-top: 4px;
        font-size: 1rem;
        z-index: 1000;
      }
      .pac-item {
        padding: 8px 12px;
        font-size: 0.95rem;
        cursor: pointer;
      }
      .pac-item:hover {
        background-color: #f3f4f6;
      }
      .pac-item-query {
        font-size: 1rem;
        color: #1f2937;
      }
      .pac-matched {
        font-weight: 600;
      }
      .pac-icon {
        margin-right: 8px;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const isValid = 
      pickup.trim() !== '' && 
      dropoff.trim() !== '' && 
      selectedRide !== null && 
      calculatedFare > 0 && 
      markers.length === 2
    setIsValidBooking(isValid)
  }, [pickup, dropoff, selectedRide, calculatedFare, markers])

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map
    directionsServiceRef.current = new google.maps.DirectionsService()
  }

  const onPickupLoad = (autocomplete: google.maps.places.Autocomplete) => {
    pickupAutocompleteRef.current = autocomplete
  }

  const onDropoffLoad = (autocomplete: google.maps.places.Autocomplete) => {
    dropoffAutocompleteRef.current = autocomplete
  }

  const clearPickup = () => {
    setPickup('')
    setMarkers(prev => prev.filter((_, index) => index !== 0))
    if (directions) {
      setDirections(null)
      setDistance('')
      setDuration('')
      setCalculatedFare(0)
      setFareBreakdown({
        baseFare: 0,
        distanceFare: 0,
        surgeFare: 0,
        total: 0
      })
    }
  }

  const clearDropoff = () => {
    setDropoff('')
    setMarkers(prev => prev.filter((_, index) => index !== 1))
    if (directions) {
      setDirections(null)
      setDistance('')
      setDuration('')
      setCalculatedFare(0)
      setFareBreakdown({
        baseFare: 0,
        distanceFare: 0,
        surgeFare: 0,
        total: 0
      })
    }
  }

  const calculateFare = (distanceInMeters: number, selectedRideType: RideOption | null): { total: number; breakdown: FareBreakdown } => {
    if (!selectedRideType) return { 
      total: 0, 
      breakdown: { 
        baseFare: 0, 
        distanceFare: 0, 
        surgeFare: 0, 
        total: 0 
      } 
    }
    
    const baseRate = selectedRideType.fare
    const ratePerKm = {
      '1': 12,  // Standard
      '2': 15,  // Premium
      '3': 18   // Van
    }[selectedRideType.id] || 12

    const distanceInKm = distanceInMeters / 1000
    const distanceFare = distanceInKm * ratePerKm
    
    // Add surge pricing for longer distances
    const surgeFactor = distanceInKm > 20 ? 1.1 : 1.0
    const surgeFare = ((baseRate + distanceFare) * surgeFactor) - (baseRate + distanceFare)

    // Calculate total fare with base rate and minimum fare check
    const calculatedFare = Math.max(Math.round((baseRate + distanceFare + surgeFare)), selectedRideType.fare)

    return {
      total: calculatedFare,
      breakdown: {
        baseFare: baseRate,
        distanceFare: Math.round(distanceFare),
        surgeFare: Math.round(surgeFare),
        total: calculatedFare
      }
    }
  }

  const calculateRoute = useCallback(async (
    pickupLocation: google.maps.LatLngLiteral,
    dropoffLocation: google.maps.LatLngLiteral
  ) => {
    if (!directionsServiceRef.current) return

    try {
      const result = await directionsServiceRef.current.route({
        origin: pickupLocation,
        destination: dropoffLocation,
        travelMode: google.maps.TravelMode.DRIVING
      })

      setDirections(result)
      
      if (result.routes[0]?.legs[0]) {
        const leg = result.routes[0].legs[0]
        setDistance(leg.distance?.text || '')
        setDuration(leg.duration?.text || '')
        const fareResult = calculateFare(leg.distance?.value || 0, selectedRide)
        setCalculatedFare(fareResult.total)
        setFareBreakdown(fareResult.breakdown)
      }
    } catch (error) {
      console.error('Error calculating route:', error)
    }
  }, [selectedRide])

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickup(e.target.value)
    if (e.target.value === '') {
      setMarkers(prev => prev.filter((_, index) => index !== 0))
      if (directions) {
        setDirections(null)
        setDistance('')
        setDuration('')
        setCalculatedFare(0)
        setFareBreakdown({
          baseFare: 0,
          distanceFare: 0,
          surgeFare: 0,
          total: 0
        })
      }
    }
  }

  const handleDropoffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropoff(e.target.value)
    if (e.target.value === '') {
      setMarkers(prev => prev.filter((_, index) => index !== 1))
      if (directions) {
        setDirections(null)
        setDistance('')
        setDuration('')
        setCalculatedFare(0)
        setFareBreakdown({
          baseFare: 0,
          distanceFare: 0,
          surgeFare: 0,
          total: 0
        })
      }
    }
  }

  const handlePickupSelect = () => {
    if (!pickupAutocompleteRef.current) return

    try {
      const place = pickupAutocompleteRef.current.getPlace()
      if (!place || !place.geometry || !place.geometry.location) {
        console.log('No location data available for pickup')
        return
      }

      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      setPickup(place.formatted_address || '')
      setMarkers(prev => [...prev.filter(m => m !== prev[0]), location])

      if (dropoff && dropoffAutocompleteRef.current) {
        const dropoffPlace = dropoffAutocompleteRef.current.getPlace()
        if (dropoffPlace?.geometry?.location) {
          calculateRoute(location, {
            lat: dropoffPlace.geometry.location.lat(),
            lng: dropoffPlace.geometry.location.lng()
          })
        }
      }

      if (mapRef.current) {
        mapRef.current.panTo(location)
        mapRef.current.setZoom(15)
      }
    } catch (error) {
      console.error('Error handling pickup selection:', error)
    }
  }

  const handleDropoffSelect = () => {
    if (!dropoffAutocompleteRef.current) return

    try {
      const place = dropoffAutocompleteRef.current.getPlace()
      if (!place || !place.geometry || !place.geometry.location) {
        console.log('No location data available for dropoff')
        return
      }

      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      setDropoff(place.formatted_address || '')
      setMarkers(prev => [...prev.filter(m => m !== prev[1]), location])

      if (pickup && pickupAutocompleteRef.current) {
        const pickupPlace = pickupAutocompleteRef.current.getPlace()
        if (pickupPlace?.geometry?.location) {
          calculateRoute({
            lat: pickupPlace.geometry.location.lat(),
            lng: pickupPlace.geometry.location.lng()
          }, location)
        }
      }
    } catch (error) {
      console.error('Error handling dropoff selection:', error)
    }
  }

  const handleRideSelect = (ride: RideOption) => {
    setSelectedRide(ride)
    if (directions?.routes[0]?.legs[0]) {
      const distance = directions.routes[0].legs[0].distance?.value || 0
      const fareResult = calculateFare(distance, ride)
      setCalculatedFare(fareResult.total)
      setFareBreakdown(fareResult.breakdown)
    }
  }

  const handleBookNow = () => {
    if (!isValidBooking) {
      toast.error('Please select pickup, dropoff locations and ride type', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }
    
    console.log('Booking ride:', {
      pickup,
      dropoff,
      ride: selectedRide,
      distance,
      duration,
      fare: calculatedFare
    })

    toast.success(`Ride Booked Successfully! 🚗
    From: ${pickup}
    To: ${dropoff}
    Fare: ₹${calculatedFare}
    Duration: ${duration}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })

    // Clear form after successful booking
    clearPickup()
    clearDropoff()
    setSelectedRide(null)
    setDirections(null)
    setDistance('')
    setDuration('')
    setCalculatedFare(0)
    setFareBreakdown({
      baseFare: 0,
      distanceFare: 0,
      surgeFare: 0,
      total: 0
    })
  }

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <h2 className="text-xl font-semibold mb-6 ">Book a Ride</h2>

      {/* Pickup Location */}
      <div className="mb-4 dark:">
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-50">
          Pickup Location
        </label>
        <div className="relative">
          <Autocomplete
            onLoad={onPickupLoad}
            onPlaceChanged={handlePickupSelect}
            restrictions={{ country: 'in' }}
          >
            <input
              type="text"
              value={pickup}
              onChange={handlePickupChange}
              placeholder="Enter pickup location"
              className="w-full p-2 border rounded-md pl-8 pr-8"
            />
          </Autocomplete>
          <span className="absolute left-2 top-2.5 text-gray-400">📍</span>
          {pickup && (
            <button
              onClick={clearPickup}
              className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
              type="button"
            >
              ❌
            </button>
          )}
        </div>
      </div>

      {/* Dropoff Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-50">
          Dropoff Location
        </label>
        <div className="relative">
          <Autocomplete
            onLoad={onDropoffLoad}
            onPlaceChanged={handleDropoffSelect}
            restrictions={{ country: 'in' }}
          >
            <input
              type="text"
              value={dropoff}
              onChange={handleDropoffChange}
              placeholder="Enter dropoff location"
              className="w-full p-2 border rounded-md pl-8 pr-8"
            />
          </Autocomplete>
          <span className="absolute left-2 top-2.5 text-gray-400">📍</span>
          {dropoff && (
            <button
              onClick={clearDropoff}
              className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
              type="button"
            >
              ❌
            </button>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="mb-6">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={5}
          onLoad={handleMapLoad}
        >
          {markers.map((position, index) => (
            <Marker
              key={index}
              position={position}
              label={index === 0 ? 'P' : 'D'}
            />
          ))}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>

      {/* Route Info */}
      {distance && duration && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-black rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Distance</p>
              <p className="font-semibold">{distance}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{duration}</p>
            </div>
            {calculatedFare > 0 && (
              <div className="bg-blue-50 p-3 rounded-lg relative group dark:bg-black">
                <p className="text-sm text-blue-600 font-medium">Estimated Fare</p>
                <p className="text-xl font-bold text-blue-700">₹{calculatedFare}</p>
                
                {/* Tooltip */}
                <div className="absolute invisible group-hover:visible bg-white dark:bg-black p-4 rounded-lg shadow-lg border border-gray-200 w-64 right-0 top-full mt-2 z-10">
                  <h4 className="font-semibold mb-2 text-gray-500 ">Fare Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-500">
                      <span className="text-gray-500">Base Fare:</span>
                      <span className="font-medium">₹{fareBreakdown.baseFare}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span className="text-gray-500">Distance Fare:</span>
                      <span className="font-medium">₹{fareBreakdown.distanceFare}</span>
                    </div>
                    {fareBreakdown.surgeFare > 0 && (
                      <div className="flex justify-between text-gray-500">
                        <span className="text-gray-500">Surge Charge:</span>
                        <span className="font-medium">₹{fareBreakdown.surgeFare}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-500 ">Total Fare:</span>
                        <span className="text-blue-600">₹{fareBreakdown.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ride Options */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-50">
          Select Ride Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 dark:bg-black dark:text-gray-50 ">
          {rideOptions.map(ride => (
            <div
              key={ride.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors dark:bg-black dark:text-gray-50
                ${selectedRide?.id === ride.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-gray-300'
                }`}
              onClick={() => handleRideSelect(ride)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{ride.name}</h3>
                <span className="text-lg font-semibold">₹{ride.fare}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                <span className="mr-1">👤</span>
                <span>{ride.capacity} seats</span>
                <span className="mx-2">•</span>
                <span>{ride.time} mins</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button 
          onClick={handleBookNow}
          disabled={!isValidBooking}
          className={`dark:bg-blue-600 flex-1 py-2 px-4 rounded-md dark:text-gray-50 ${
            !isValidBooking
              ? 'bg-blue-500 text-white cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-500'
          }`}
        >
          Book Now
        </button>
        <button
          onClick={() => setShowShareModal(true)}
          disabled={!isValidBooking}
          className={`px-4 py-2 rounded-md dark:bg-gray-900 dark:text-gray-50 ${
            !isValidBooking
              ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border border-blue-500 text-blue-500 hover:bg-blue-50'
          }`}
        >
          Share Ride
        </button>
      </div>

      {/* Share Ride Modal */}
      {showShareModal && (
        <ShareRide
          rideId="123"
          fare={calculatedFare || selectedRide?.fare || 0}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}