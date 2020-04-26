import React, { PureComponent, createRef } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'


class NavbarPage extends PureComponent {
  state = {
    isOpen: false,
  };
  openModal = () => this.setState(() => ({ isOpen: true }));
  closeModal = () => this.setState(({ isOpen }) => (isOpen ? { isOpen: false } : null));
  render() {
    const { onSideToggle, onMobileNavToggle, isSideFolded, isMobileNavFolded, showSideNav, transparent } = this.props;

    return (
<Navbar bg="dark" variant="dark" expand="lg">
  <Navbar.Brand href="/">Local Dining, MERN</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/restaurants/list">List</Nav.Link>
      <Nav.Link href="/restaurants/create">Create</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
    );
  }
}

export default NavbarPage;