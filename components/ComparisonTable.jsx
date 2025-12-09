import React from 'react';
import { Container, Table } from 'react-bootstrap';
import './ComparisonTable.css';

const ComparisonTable = () => {
  return (
    <Container className="py-5 comparison-table-container">
      <h2 className="text-center mb-5">Comparison</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Feature</th>
            <th>NeuroInsight</th>
            <th>Alternative 1</th>
            <th>Alternative 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Voice + AR</td>
            <td><span className="check-icon">&#10003;</span></td>
            <td><span className="cross-icon">&#10007;</span></td>
            <td><span className="cross-icon">&#10007;</span></td>
          </tr>
          <tr>
            <td>Clinical Workflows</td>
            <td><span className="check-icon">&#10003;</span></td>
            <td><span className="check-icon">&#10003;</span></td>
            <td><span className="cross-icon">&#10007;</span></td>
          </tr>
          <tr>
            <td>Explainability</td>
            <td><span className="check-icon">&#10003;</span></td>
            <td><span className="cross-icon">&#10007;</span></td>
            <td><span className="check-icon">&#10003;</span></td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ComparisonTable;
