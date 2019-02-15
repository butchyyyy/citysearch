import Navbar from "component/Navbar"
import { shallow } from "enzyme"
import React from "react"

describe("Test Navbar Component", () => {
  const wrapper = shallow(<Navbar />)

  it("Test Navbar Snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
