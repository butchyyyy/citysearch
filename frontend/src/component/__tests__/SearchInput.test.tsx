import SearchInput from "component/SearchInput"
import { shallow, ShallowWrapper } from "enzyme"
import React from "react"
import { Input } from "reactstrap"

describe("Test SerachInput Component", () => {
  const submitSearchMock = jest.fn()
  const searchInputMock = jest.fn()
  const wrapper = shallow(<SearchInput value="test" onSubmitSearch={submitSearchMock} onSearchInput={searchInputMock} />)

  it("Test SerachInput Snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("Test Search Submit", () => {
    const input: ShallowWrapper = wrapper.find(Input)
    input.simulate("keyPress", { key: "a" })
    expect(submitSearchMock).toHaveBeenCalledTimes(0)
    input.simulate("keyPress", { key: "Enter" })
    expect(submitSearchMock).toHaveBeenCalled()
  })

  it("Test Search Input", () => {
    const input: ShallowWrapper = wrapper.find(Input)
    input.simulate("change", { target: { value: "newValue" } })
    expect(searchInputMock).toHaveBeenCalledWith("newValue")
  })
})
