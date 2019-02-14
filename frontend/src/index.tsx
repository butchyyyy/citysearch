import { library } from "@fortawesome/fontawesome-svg-core"
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons"
import App from "App"

import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDom from "react-dom"
import "style/CitySearch.less"

library.add(faSearchLocation)

ReactDom.render(<App />, document.getElementById("root"))
