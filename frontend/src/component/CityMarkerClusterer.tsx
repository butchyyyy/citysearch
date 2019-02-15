import React from "react"
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer"

interface Props {
  markerClusterer: boolean
  children?: any
}

const CityMarkerClusterer = (props: Props) => {
  if (props.markerClusterer) {
    return (
        <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
          {props.children}
        </MarkerClusterer>
    )
  } else {
    return props.children
  }
}

export default CityMarkerClusterer
