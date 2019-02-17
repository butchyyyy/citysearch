import React from "react"
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer"

interface Props {
  /** Marker clustering setting */
  markerClusterer: boolean
  children?: any
}

/**
 * Renders either clustered or non clustered makers on the map based on the props
 */
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
