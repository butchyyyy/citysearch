import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"

interface Props {
  /** Actual search input value */
  value: string
  /** Method handling search submit */
  onSubmitSearch: () => void
  /** Method handling search input */
  onSearchInput: (query: string) => void
}

/**
 * Component rendering user city search input p
 */
const SearchInput = (props: Props) => {
  /** Handle user input change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearchInput(e.target.value)
  }

  /** Hender 'Emter' keypress input, that submits search */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onSubmitSearch()
    }
  }

  return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon="search-location" />
          </InputGroupText>
        </InputGroupAddon>
        <Input value={props.value} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Enter City Name, Maximum of 1000 results will be shown" />
      </InputGroup>
  )
}

export default SearchInput
