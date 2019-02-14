import City from "model/City"
import React from "react"
import { Marker } from "react-google-maps"
import InfoWindow from "react-google-maps/lib/components/InfoWindow"
import { MarkerProps } from "react-google-maps/lib/components/Marker"

interface OwnProps {
  city: City
}

interface State {
  hovered: boolean
}

type Props = Pick<MarkerProps, Exclude<keyof MarkerProps, "position">> & OwnProps

class CityMarker extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
  }

  onMouseOver() {
    this.setState({ hovered: true })
  }

  onMouseOut() {
    this.setState({ hovered: false })
  }

  render() {
    const { city, ...markerProps } = this.props
    return (
        <Marker
            position={{ lat: city.lat, lng: city.lng }}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            {...markerProps}
        >
          {this.state.hovered && (
              <InfoWindow>
                <div>
                  <strong>{city.name}</strong>
                  <br />
                  <small>{city.country}</small>
                  <br />
                  <small>Population: {city.population}</small>
                </div>
              </InfoWindow>
          )}
        </Marker>
    )
  }
}

export default CityMarker
