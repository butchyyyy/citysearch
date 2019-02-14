import City from "model/City"
import React from "react"
import { GoogleMap, Marker, withGoogleMap, WithGoogleMapProps, withScriptjs, WithScriptjsProps } from "react-google-maps"

interface OwnProps {
  cities: City[]
}

type Props = OwnProps & WithGoogleMapProps & WithScriptjsProps

const CityMap: React.FunctionComponent<Props> = (props: Props) => (
    <GoogleMap defaultCenter={{ lat: 0, lng: 0 }} defaultZoom={2}>
      {props.cities.map((city) => (
          <Marker key={city.name} position={{ lat: city.lat, lng: city.lng }} />
      ))}
    </GoogleMap>
)

const Enhanced = withScriptjs(withGoogleMap(CityMap))

const composed = (props: OwnProps) => (
    <Enhanced
        cities={props.cities}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)

export default composed
