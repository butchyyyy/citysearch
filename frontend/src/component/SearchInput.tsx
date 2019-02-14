import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"

interface Props {
  value: string
  onSubmitSearch: () => void
  onSearchInput: (query: string) => void
}

const SearchInput = (props: Props) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearchInput(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onSubmitSearch()
    }
  }

  return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon="search-location"/>
          </InputGroupText>
        </InputGroupAddon>
        <Input value={props.value} onChange={handleChange} onKeyPress={handleKeyPress}/>
      </InputGroup>
  )

}

export default SearchInput