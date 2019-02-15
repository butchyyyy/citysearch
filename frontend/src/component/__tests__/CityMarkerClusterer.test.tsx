import CityMarkerClusterer from "component/CityMarkerClusterer"
import { shallow } from "enzyme"
import React from "react"

describe("Test CityMarkerClusterer Component", () => {
  const wrapper = shallow(<CityMarkerClusterer markerClusterer={false}>TestChildren</CityMarkerClusterer>)

  it("Test CityMarkerClusterer Snapshot", () => {
    expect(wrapper).toMatchSnapshot()
    // Enable marker clusters
    wrapper.setProps({ markerClusterer: true })
    expect(wrapper).toMatchSnapshot()
  })
})
