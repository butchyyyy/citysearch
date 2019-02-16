import City from "model/City"
import React from "react"
import { Marker } from "react-google-maps"
import InfoWindow from "react-google-maps/lib/components/InfoWindow"
import { MarkerProps } from "react-google-maps/lib/components/Marker"

interface OwnProps {
  city: City
}

interface State {
  opened: boolean
}

type Props = Pick<MarkerProps, Exclude<keyof MarkerProps, "position">> & OwnProps

class CityMarker extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { opened: false }
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  toggleOpen() {
    this.setState({ opened: !this.state.opened })
  }

  render() {
    const { city, ...markerProps } = this.props
    return (
        <Marker
            position={{ lat: city.lat, lng: city.lng }}
            onClick={this.toggleOpen}
            {...markerProps}
        >
          {this.state.opened && (
              <InfoWindow onCloseClick={this.toggleOpen}>
                <div>
                  <strong>{city.name}</strong>
                  <br />
                  <small>{city.country}</small>
                  <br />
                  <small>Population: {city.population || "N/A"}</small>
                </div>
              </InfoWindow>
          )}
        </Marker>
    )
  }
}

export default CityMarker
