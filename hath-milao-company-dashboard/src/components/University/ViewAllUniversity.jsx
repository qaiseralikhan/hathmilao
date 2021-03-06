import React, { Component } from "react";
// reactstrap components
import {
  Row,
  CardBody,
  Col,
  PaginationItem,
  PaginationLink,
  Button,
  Pagination,
  Form,
  FormGroup,
  Input
} from "reactstrap";

// Service
import {
  ViewUniversities,
  SearchUniversities
} from "../../services/university.service";

// Components
import SingleUniversity from "./SingleUniversity.jsx";
import { Spin } from "antd";

export default class ViewAllUniversity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOption: false,
      detailIndex: null,
      totalPages: null,
      currentPage: 1,
      docs: null,
      pages: null,
      Loading: false,
      name: null,
      city: null,
      field: null,
      contacts: null
    };
  }

  componentDidMount() {
    this.setState({
      Loading: false
    });
    ViewUniversities(1)
      .then(response => {
        const pages = [];
        const totalPages = response.data.universities.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.universities.page,
          docs: response.data.universities.docs,
          contacts: response.data.universityContacts,
          Loading: true
        });
        for (let index = 1; index <= totalPages; index++) {
          pages.push(
            <PaginationItem
              key={index}
              className={this.state.currentPage === index ? "active" : null}
            >
              <PaginationLink onClick={() => this.handlePageChange(index)}>
                {index}
              </PaginationLink>
            </PaginationItem>
          );
        }
        this.setState({
          pages: pages
        });
      })
      .catch(e => {
        if (e) {
          console.log(e);
        }
      });
  }

  // TO handle Page Change
  handlePageChange = index => {
    this.setState({
      Loading: false
    });
    ViewUniversities(index)
      .then(response => {
        this.setState({
          docs: response.data.universities.docs,
          currentPage: response.data.universities.page,
          contacts: response.data.universityContacts,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.universities.totalPages;

        for (let index = 1; index <= totalPages; index++) {
          pages.push(
            <PaginationItem
              key={index}
              className={this.state.currentPage === index ? "active" : null}
            >
              <PaginationLink onClick={() => this.handlePageChange(index)}>
                {index}
              </PaginationLink>
            </PaginationItem>
          );
        }

        this.setState({
          pages: pages
        });
      })
      .catch(e => {
        if (e) {
          console.log(e);
        }
      });
  };

  // Search Handler Start
  handleSearchChange = event => {
    event.preventDefault();
    this.setState({
      Loading: false
    });
    const { name, city, field } = this.state;
    SearchUniversities(1, name, city, field)
      .then(response => {
        const pages = [];
        const totalPages = response.data.universities.totalPages;
        this.setState({
          totalPages: totalPages,
          currentPage: response.data.universities.page,
          docs: response.data.universities.docs,
          contacts: response.data.universityContacts,
          Loading: true
        });
        for (let index = 1; index <= totalPages; index++) {
          pages.push(
            <PaginationItem
              key={index}
              className={this.state.currentPage === index ? "active" : null}
            >
              <PaginationLink
                onClick={() => this.handleSearchPageChange(index)}
              >
                {index}
              </PaginationLink>
            </PaginationItem>
          );
        }
        this.setState({
          pages: pages
        });
      })
      .catch(e => {
        if (e.response.data) {
          console.log(e);
        }
      });
  };

  // To handle Search Page Change
  handleSearchPageChange = index => {
    this.setState({
      Loading: false
    });
    const { name, city, field } = this.state;
    SearchUniversities(index, name, city, field)
      .then(response => {
        this.setState({
          docs: response.data.universities.docs,
          currentPage: response.data.universities.page,
          contacts: response.data.universityContacts,
          Loading: true
        });
        const pages = [];
        const totalPages = response.data.universities.totalPages;

        for (let index = 1; index <= totalPages; index++) {
          pages.push(
            <PaginationItem
              key={index}
              className={this.state.currentPage === index ? "active" : null}
            >
              <PaginationLink
                onClick={() => this.handleSearchPageChange(index)}
              >
                {index}
              </PaginationLink>
            </PaginationItem>
          );
        }

        this.setState({
          pages: pages
        });
      })
      .catch(e => {
        if (e.response.data) {
          console.log(e);
        }
      });
  };

  // To Handle Form Input
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Search Handler End

  // To handle Detail of Company
  handleClick = index => {
    this.setState(prevState => ({
      detailOption: !prevState.detailOption,
      detailIndex: index
    }));
  };

  render() {
    return (
      <>
        {this.state.Loading ? (
          <React.Fragment>
            {this.state.docs.length > 0 ? (
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Input
                          name="name"
                          placeholder="Name"
                          onChange={this.handleInputChange}
                          value={this.state.name}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Input
                          name="city"
                          placeholder="City"
                          onChange={this.handleInputChange}
                          value={this.state.city}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Input
                          name="field"
                          placeholder="Field"
                          onChange={this.handleInputChange}
                          value={this.state.field}
                          type="text"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="1" className="text-center">
                      <FormGroup>
                        <Button
                          className="btn-icon btn-2"
                          color="secondary"
                          outline
                          type="button"
                          onClick={this.handleSearchChange}
                        >
                          <span className="btn-inner--icon">
                            <i className="fas fa-search" />
                          </span>
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>

                {(this.state.docs || []).map((item, index) => (
                  <React.Fragment key={index}>
                    <Row className="shadow--hover job-box">
                      <Col
                        md="3"
                        onClick={() => {
                          this.handleClick(index);
                        }}
                      >
                        <p className="h4 m-0">{item.name}</p>
                      </Col>
                      <Col md="3" className="capital-first-word">
                        {item.city}
                      </Col>
                      <Col md="6">
                        {(item.field || []).map((subitem, subindex) => (
                          <span key={subindex} className="skill-tag">
                            {subitem}
                          </span>
                        ))}
                      </Col>
                    </Row>
                    <br />
                    {/* Student Detail Information  Start*/}

                    {this.state.detailIndex === index &&
                    this.state.detailOption ? (
                      <SingleUniversity
                        university={item}
                        {...this.props}
                        universityContact={this.state.contacts}
                      />
                    ) : null}

                    {/* Student Detail Information  Start*/}
                  </React.Fragment>
                ))}

                {this.state.totalPages && (
                  <Row className="mt-4">
                    <Col>
                      <nav aria-label="Page navigation example">
                        <Pagination
                          className="pagination justify-content-center"
                          listClassName="justify-content-center"
                        >
                          {this.state.pages}
                        </Pagination>
                      </nav>
                    </Col>
                  </Row>
                )}
              </CardBody>
            ) : (
              <CardBody>
                <h1>
                  No universities Found..{" "}
                  <Button
                    className="btn-icon btn-3"
                    color="primary"
                    type="button"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-sync" />
                    </span>
                    <span className="btn-inner--text">Refresh Page</span>
                  </Button>
                </h1>
              </CardBody>
            )}
          </React.Fragment>
        ) : (
          <CardBody>
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px"
              }}
            >
              <Spin tip="Loading Universities..." size="large" />
            </div>
          </CardBody>
        )}
      </>
    );
  }
}
