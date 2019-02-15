import { testCities } from "__tests__/TestData"
import SearchSummary from "component/SearchSummary"
import { shallow } from "enzyme"
import React from "react"

describe("Test SearchSummmary Component", () => {
  const wrapper = shallow(<SearchSummary cities={testCities} />)

  it("Test SarchSummary Snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
