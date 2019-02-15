import App from "App"

import "bootstrap/dist/css/bootstrap.min.css"
import registerIcons from "Icons"
import React from "react"
import ReactDom from "react-dom"
import "style/CitySearch.less"

registerIcons()

fetch("/config/mapApiKey")
    .then((response) => {
      if (response.ok) {
        response.text().then((apiKey) => {
          ReactDom.render(<App mapApiKey={apiKey} />, document.getElementById("root"))
        })
      }
    })
    .catch(() => window.alert("Failed to init app :`("))
