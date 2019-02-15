import City from "model/City"
import React from "react"
import { Badge } from "reactstrap"

interface Props {
  cities: City[]
}

const SearchSummary = (props: Props) => (
    <h6>Cities: <Badge color="secondary">{props.cities && props.cities.length}</Badge></h6>
)

export default SearchSummary
