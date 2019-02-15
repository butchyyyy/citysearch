import { testCities } from "__tests__/TestData"
import CityTable from "component/CityTable"
import { shallow } from "enzyme"
import React from "react"

describe("Test CityTable Component", () => {
  const wrapper = shallow(<CityTable cities={testCities} />)

  it("Test CityTable Snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
