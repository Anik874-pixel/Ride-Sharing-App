'use client'

import { LoadScript } from '@react-google-maps/api'
import RideBooking from './RideBooking'

const libraries: ("places")[] = ["places"]

export default function RideBookingWrapper() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      libraries={libraries}
    >
      <RideBooking />
    </LoadScript>
  )
}