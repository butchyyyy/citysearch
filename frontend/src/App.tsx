import classNames from "classnames"
import CityMap from "component/CityMap"
import CityTable from "component/CityTable"
import Navbar from "component/Navbar"
import SearchInput from "component/SearchInput"
import City from "model/City"
import React from "react"
import { Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap"

interface AppProps {
  mapApiKey: string
}

interface State {
  activeTab: string
  searchInput: string
  searchResult: City[]
}

class App extends React.Component<AppProps, State> {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      searchInput: "",
      searchResult: [],
    }
    this.toggle = this.toggle.bind(this)
    this.toggleTab1 = this.toggleTab1.bind(this)
    this.toggleTab2 = this.toggleTab2.bind(this)
    this.searchInput = this.searchInput.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  toggleTab1() {
    this.toggle("1")
  }

  toggleTab2() {
    this.toggle("2")
  }

  searchInput(query: string) {
    this.setState({ searchInput: query })
  }

  submitSearch() {
    fetch(`/cities/search?query=${this.state.searchInput}`)
        .then((response: Response) => {
          if (response.ok) {
            response.json().then((data) => this.setState({ searchResult: data }))
          }
        })
  }

  render() {
    return (
        <Container>
          <Navbar />
          <Row>
            <Col>
              <SearchInput value={this.state.searchInput} onSearchInput={this.searchInput} onSubmitSearch={this.submitSearch} />
            </Col>
          </Row>
          <Row className="row-top-buffer">
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
                      <CityMap mapApiKey={this.props.mapApiKey} cities={this.state.searchResult} />
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
        </Container>
    )
  }
}

export default App
