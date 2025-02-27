// export const GOOGLE_MAPS_API_KEY = 'AIzaSyBzHghjafQIN1htN80q_p3gViBsI9PQb0E'
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";


export const GOOGLE_MAPS_LIBRARIES: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"]

// console.log("Google Maps API Key:", GOOGLE_MAPS_API_KEY);