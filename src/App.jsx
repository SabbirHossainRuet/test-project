import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './App.css'; // For basic styling

const App = () => {
  const [data, setData] = useState([]);

  // Fetch CSV data
  useEffect(() => {
    fetchCSV();
  }, []);

  const fetchCSV = async () => {
    const response = await fetch('/data.csv'); // Place your CSV file in the public folder
    const reader = response.body.getReader();
    const result = await reader.read(); // raw array
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value); // the csv text
    Papa.parse(csv, {
      header: true,
      complete: (result) => {
        setData(result.data); // JSON object after CSV parsing
      },
    });
  };

  return (
    <div className="app-container">
      <h1>Property Date Boxes</h1>
      <div className="property-container">
        {data.map((property, index) => (
          <div key={index} className="property-box">
            <h2>{property.property}</h2>
            <ul>
              {[property.date1, property.date2, property.date3, property.date4, property.date5].map((date, idx) => (
                <li key={idx}>{date || 'No Date'}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
