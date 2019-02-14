import City from "model/City"
import React from "react"
import { Table } from "reactstrap"

interface Props {
  cities: City[]
}

const CityTable = (props: Props) => (
    <Table>
      <thead>
      <tr>
        <th>City</th>
        <th>Country</th>
        <th>Population</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
      </thead>
      <tbody>
      {props.cities.map((city, index) => (
          <tr key={index}>
            <td>{city.name}</td>
            <td>{city.country}</td>
            <td>{city.population}</td>
            <td>{city.lat}</td>
            <td>{city.lng}</td>
          </tr>
      ))}
      </tbody>
    </Table>
)

export default CityTable
