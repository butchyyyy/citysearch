import { cityNullPopulation, cityPrague } from "__tests__/TestData"
import CityMarker from "component/CityMarker"
import { shallow } from "enzyme"
import React from "react"
import { InfoWindow } from "react-google-maps"

describe("Test CityMarker Component", () => {
  const wrapper = shallow(<CityMarker city={cityPrague} />)

  it("Test CityMarker Snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("Test Mouse Events", () => {
    // Test InfoWindow gets rendered on mouseover
    wrapper.simulate("mouseover")
    expect(wrapper.state("hovered")).toBeTruthy()
    expect(wrapper.find(InfoWindow).exists()).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
    // Test with null population City
    wrapper.setProps({ city: cityNullPopulation })
    expect(wrapper).toMatchSnapshot()
    // Test Info window gets hidden on mouseout
    wrapper.simulate("mouseout")
    expect(wrapper.state("hovered")).toBeFalsy()
    expect(wrapper.find(InfoWindow).exists()).toBeFalsy()
  })
})
