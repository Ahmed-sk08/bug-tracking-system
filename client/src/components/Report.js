import React from 'react';
import axios from 'axios';
import { Container, Button, Alert } from 'react-bootstrap';

const Report = () => {
  const [error, setError] = React.useState('');

  const generateReport = () => {
    axios.get('http://localhost:5000/api/report/generate', { responseType: 'blob' })
      .then(response => {
        // Check if the response is valid
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'report.json');
          document.body.appendChild(link);
          link.click();
          link.remove(); // Clean up
        } else {
          // Handle non-200 responses
          setError('Failed to generate report. Server responded with status: ' + response.status);
        }
      })
      .catch(error => {
        console.error('Error generating report:', error);
        setError('Error generating report: ' + (error.response?.data?.message || error.message));
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Generate Bug Report</h2>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      <div className="text-center">
        <Button onClick={generateReport} variant="primary">
          Generate Report
        </Button>
      </div>
    </Container>
  );
};

export default Report;
