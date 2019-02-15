import { testCities } from "__tests__/TestData"
import App from "App"
import CityMap from "component/CityMap"
import CityTable from "component/CityTable"
import SearchInput from "component/SearchInput"
import SearchSummary from "component/SearchSummary"
import { shallow } from "enzyme"
import "jest-fetch-mock"
import City from "model/City"
import React from "react"
import { CustomInput, NavLink } from "reactstrap"

describe("Test App Component", () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => null)
  const wrapper = shallow<App>(<App mapApiKey="" />)

  const testCityComponentProp = (expectedValue: City[]) => {
    expect(wrapper.find(SearchSummary).props().cities).toEqual(expectedValue)
    expect(wrapper.find(CityMap).props().cities).toEqual(expectedValue)
    expect(wrapper.find(CityTable).props().cities).toEqual(expectedValue)
  }

  it("Test App Snapshost", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("Test Fetch Data", () => {
    testCityComponentProp([])
    fetchMock.mockResponseOnce(JSON.stringify(testCities))
    return wrapper.instance().submitSearch().then(() => {
      testCityComponentProp(testCities)
    })
  })

  it("Test Fetch Data Not Ok Response", () => {
    fetchMock.mockResponseOnce(null, { status: 400, statusText: "Bad Request" })
    return wrapper.instance().submitSearch().then(() => {
      testCityComponentProp([])
      expect(alertSpy).toHaveBeenCalledWith("Failed to load cities: Bad Request")
    })
  })

  it("Test Fetch Data Rejectd", () => {
    fetchMock.mockRejectOnce(new Error("Test Error"))
    return wrapper.instance().submitSearch().catch(() => {
      testCityComponentProp([])
      expect(alertSpy).toHaveBeenCalledWith("Failed to load cities: Test Error}")
    })
  })

  it("Test Search Input", () => {
    expect(wrapper.find(SearchInput).props().value).toEqual("")
    wrapper.instance().searchInput("foo")
    expect(wrapper.find(SearchInput).props().value).toEqual("foo")
  })

  it("Test Tab Toggle", () => {
    expect(wrapper.find(NavLink).at(0).hasClass("active")).toBeTruthy()
    expect(wrapper.find(NavLink).at(1).hasClass("active")).toBeFalsy()
    wrapper.find(NavLink).at(1).simulate("click")
    expect(wrapper.find(NavLink).at(0).hasClass("active")).toBeFalsy()
    expect(wrapper.find(NavLink).at(1).hasClass("active")).toBeTruthy()
    wrapper.find(NavLink).at(0).simulate("click")
    expect(wrapper.find(NavLink).at(0).hasClass("active")).toBeTruthy()
    expect(wrapper.find(NavLink).at(1).hasClass("active")).toBeFalsy()
  })

  it("Test Cluster Marker Toggle", () => {
    expect(wrapper.find(CityMap).props().markerClusterer).toBeTruthy()
    const markerClusterSwitch = wrapper.find(CustomInput)
    markerClusterSwitch.simulate("change")
    expect(wrapper.find(CityMap).props().markerClusterer).toBeFalsy()
    markerClusterSwitch.simulate("change")
    expect(wrapper.find(CityMap).props().markerClusterer).toBeTruthy()
  })
})
