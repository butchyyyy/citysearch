import classNames from "classnames"
import CityMap from "component/CityMap"
import CityTable from "component/CityTable"
import Navbar from "component/Navbar"
import SearchInput from "component/SearchInput"
import SearchSummary from "component/SearchSummary"
import Spinner from "component/Spinner"
import City from "model/City"
import React from "react"
import { Col, Container, CustomInput, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap"

interface AppProps {
  /** API key to use with Google Map Javascript API */
  mapApiKey: string
}

interface State {
  /** Active tab Id */
  activeTab: string
  /** Current user search input */
  searchInput: string
  /** Current search result */
  searchResult: City[]
  /** true if serach is actually being performed (data being fetched from backend) */
  searching: boolean
  /** Current marker clustering setting */
  markerClusterer: boolean
}

/**
 * The App component containing main layout and application logc
 */
class App extends React.Component<AppProps, State> {
  constructor(props) {
    super(props)
    this.state = {
      searching: false,
      activeTab: "1",
      searchInput: "",
      searchResult: [],
      markerClusterer: true,
    }
    this.toggle = this.toggle.bind(this)
    this.toggleTab1 = this.toggleTab1.bind(this)
    this.toggleTab2 = this.toggleTab2.bind(this)
    this.searchInput = this.searchInput.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.markerClustererToggle = this.markerClustererToggle.bind(this)
  }

  /**
   * Toggles active Tab
   * @param tab The tab id to activate
   */
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  /**
   * Toggles first tab with city map
   */
  toggleTab1() {
    this.toggle("1")
  }

  /**
   * Toggles second tab with city table
   */
  toggleTab2() {
    this.toggle("2")
  }

  /**
   * Stores current user search input into state
   * @param query The current user search input
   */
  searchInput(query: string) {
    this.setState({ searchInput: query })
  }

  /**
   * Submits the current search input and queries backend service for list of cities
   */
  submitSearch() {
    this.setState({ searching: true })
    return fetch(`/cities/search?query=${this.state.searchInput}`)
        .then((response: Response) => {
          if (response.ok) {
            response.json().then((data) => this.setState({ searching: false, searchResult: data }))
          } else {
            this.setState({ searching: false, searchResult: [] })
            window.alert("Failed to load cities: " + response.statusText)
          }
        })
        .catch((error) => {
          this.setState({ searching: false, searchResult: [] })
          window.alert("Failed to load cities: " + error)
        })
  }

  /**
   * Toggle marker clustering map setting on/offs
   */
  markerClustererToggle() {
    this.setState({ markerClusterer: !this.state.markerClusterer })
  }

  render() {
    return (
        <Container>
          <Navbar />
          <Spinner loading={this.state.searching}>
            <Row>
              <Col>
                <SearchInput value={this.state.searchInput} onSearchInput={this.searchInput} onSubmitSearch={this.submitSearch} />
              </Col>
            </Row>
            <Row className="row-top-buffer-small">
              <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                <SearchSummary cities={this.state.searchResult} />
              </Col>
              <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                <CustomInput
                    type="switch"
                    label="Cluster Markers"
                    id="markerClusetere"
                    checked={this.state.markerClusterer}
                    onChange={this.markerClustererToggle}
                />
              </Col>
            </Row>
            <Row className="row-top-buffer-small">
              <Col>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                        className={classNames({ active: this.state.activeTab === "1" })}
                        onClick={this.toggleTab1}
                    >
                      Map View
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                        className={classNames({ active: this.state.activeTab === "2" })}
                        onClick={this.toggleTab2}
                    >
                      Table view
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row className="row-top-buffer">
                      <Col>
                        <CityMap mapApiKey={this.props.mapApiKey} cities={this.state.searchResult} markerClusterer={this.state.markerClusterer} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row className="row-top-buffer">
                      <Col>
                        <CityTable cities={this.state.searchResult} />
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </Spinner>
        </Container>
    )
  }
}

export default App
