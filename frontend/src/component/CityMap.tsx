import CityMarker from "component/CityMarker"
import CityMarkerClusterer from "component/CityMarkerClusterer"
import City from "model/City"
import React from "react"
import { GoogleMap, withGoogleMap, WithGoogleMapProps, withScriptjs, WithScriptjsProps } from "react-google-maps"

interface OwnProps {
  /** List of cities to display on map */
  cities: City[]
  /** Marker clustering setting */
  markerClusterer: boolean
}

interface WrapperProps {
  /** The API key to use with Google Map Javascript API */
  mapApiKey: string
}

type Props = OwnProps & WithGoogleMapProps & WithScriptjsProps

/**
 * Renders Google Map with list of cities represented as map markers
 */
class CityMap extends React.PureComponent<Props> {
  mapRef: React.RefObject<GoogleMap>

  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  render() {
    return (
        <GoogleMap
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={2}
            ref={this.mapRef}
        >
          <CityMarkerClusterer markerClusterer={this.props.markerClusterer}>
            {this.props.cities.map((city, index) => (
                <CityMarker key={index} city={city} />
            ))}
          </CityMarkerClusterer>
        </GoogleMap>
    )
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.cities && this.props.cities.length > 0 && this.props.cities !== prevProps.cities) {
      const bounds = new google.maps.LatLngBounds()
      this.props.cities.forEach((city) => {
        bounds.extend({ lat: city.lat, lng: city.lng })
      })
      this.mapRef.current.fitBounds(bounds)
    }
  }
}

const Enhanced = withScriptjs(withGoogleMap(CityMap))

const composed = (props: OwnProps & WrapperProps) => (
    <Enhanced
        cities={props.cities}
        markerClusterer={props.markerClusterer}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${props.mapApiKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)

export default composed
