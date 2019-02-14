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

const CityMap: React.FunctionComponent<Props> = (props: Props) => (
    <GoogleMap defaultCenter={{ lat: 0, lng: 0 }} defaultZoom={2}>
      {props.cities.map((city, index) => (
          <CityMarker key={index} city={city} />
      ))}
    </GoogleMap>
)

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
