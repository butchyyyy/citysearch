import { testCities } from "__tests__/TestData"
import CityMap from "component/CityMap"
import { shallow } from "enzyme"
import React from "react"

describe("Test CityMap Component", () => {
  it("Test CityMap Snapshot", () => {
    const wrapper = shallow(<CityMap cities={testCities} mapApiKey="" markerClusterer />)
    expect(wrapper).toMatchSnapshot()
  })
})
