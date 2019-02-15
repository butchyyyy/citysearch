import Spinner from "component/Spinner"
import { shallow } from "enzyme"
import React from "react"

describe("Test Spinner Component", () => {
  const wrapper = shallow(<Spinner loading={false}>Children</Spinner>)

  it("Test Spinner Snapshot", () => {
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({ loading: true })
    expect(wrapper).toMatchSnapshot()
  })
})
