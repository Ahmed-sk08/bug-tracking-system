// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBugs: 0,
    openBugs: 0,
    closedBugs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const bugCountResponse = await axios.get('http://localhost:5000/api/stats/bugCount');
        const bugsByStatusResponse = await axios.get('http://localhost:5000/api/stats/bugsByStatus');
        setStats({
          totalBugs: bugCountResponse.data.totalBugs,
          openBugs: bugsByStatusResponse.data.openBugs,
          closedBugs: bugsByStatusResponse.data.closedBugs,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" /> Loading...
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          Error: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <p className="text-center">Welcome to the Bug Tracking System!</p>
      <Row>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Card.Title>Total Bugs</Card.Title>
              <Card.Text>
                {stats.totalBugs}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Card.Title>Open Bugs</Card.Title>
              <Card.Text>
                {stats.openBugs}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Card.Title>Closed Bugs</Card.Title>
              <Card.Text>
                {stats.closedBugs}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
