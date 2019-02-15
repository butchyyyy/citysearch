import App from "App"
import { mount } from "enzyme"
import registerIcons from "Icons"
import React from "react"

registerIcons()

describe("App Test", () => {
  it("App Mount", () => {
    mount(<App mapApiKey="" />)
  })
})
