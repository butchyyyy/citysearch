import classNames from "classnames"
import CityTable from "component/CityTable"
import Navbar from "component/Navbar"
import SearchInput from "component/SearchInput"
import City from "model/City"
import React from "react"
import { Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap"

interface State {
  activeTab: string
  searchInput: string
  searchResult: City[]
}

class App extends React.Component<{}, State> {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      searchInput: "",
      searchResult: [],
    }
    this.toggle = this.toggle.bind(this)
    this.searchInput = this.searchInput.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  searchInput(query: string) {
    this.setState({ searchInput: query })
  }

  submitSearch() {
    fetch(`/api/cities/search?query=${this.state.searchInput}`)
        .then((response: Response) => {
          if (response.ok) {
            response.json().then((data) => this.setState({searchResult: data}))
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
                      onClick={() => this.toggle("1")}
                  >
                    Map View
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                      className={classNames({ active: this.state.activeTab === "2" })}
                      onClick={() => this.toggle("2")}
                  >
                    Table view
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row className="row-top-buffer">
                    <Col>
                      Map view here
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row className="row-top-buffer">
                    <Col>
                      Table view here
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