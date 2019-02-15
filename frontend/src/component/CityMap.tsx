import CityMarker from "component/CityMarker"
import City from "model/City"
import React from "react"
import { GoogleMap, withGoogleMap, WithGoogleMapProps, withScriptjs, WithScriptjsProps } from "react-google-maps"
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel"

interface OwnProps {
  cities: City[]
}

interface WrapperProps {
  mapApiKey: string
}

type Props = OwnProps & WithGoogleMapProps & WithScriptjsProps

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
          {this.props.cities.map((city, index) => (
              <CityMarker key={index} city={city} />
          ))}
        </GoogleMap>
    )
  }

  componentDidUpdate() {
    if (this.props.cities && this.props.cities.length > 0) {
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
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${props.mapApiKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)

export default composed
