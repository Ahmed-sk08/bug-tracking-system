import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BugList from './components/BugList';
import BugDetail from './components/BugDetail';
import AddBug from './components/AddBug';
import EditBug from './components/EditBug';
import Notification from './components/Notification';
import Dashboard from './components/Dashboard';
import Report from './components/Report'; // Import Report component
import { Navbar, Nav } from 'react-bootstrap';
import { SocketProvider } from './context/SocketContext';
import './App.css';

function App() {
  return (
    <SocketProvider>
      <Router>
        <div className="App">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Bug Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/add">Add Bug</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link> {/* Add Dashboard link */}
                <Nav.Link as={Link} to="/report">Report</Nav.Link> {/* Add Report link */}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Notification /> {/* Add Notification component */}
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<BugList />} />
              <Route path="/bug/:id" element={<BugDetail />} />
              <Route path="/add" element={<AddBug />} />
              <Route path="/edit/:id" element={<EditBug />} />
              <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
              <Route path="/report" element={<Report />} /> {/* Add Report route */}
            </Routes>
          </div>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;
