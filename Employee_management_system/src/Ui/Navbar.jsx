import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function BasicExample() {
  return (
   <Container >
     <Navbar className="bg-dark p-2 rounded">
      
        <Navbar.Brand href="#home" className='text-white'>Employee Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to={"/"} className='text-white'>Employee</Nav.Link>
            <Nav.Link as={NavLink} to={"/add"} className='text-white'>Add Employee</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    
    </Navbar>
   </Container>
  );
}

export default BasicExample;