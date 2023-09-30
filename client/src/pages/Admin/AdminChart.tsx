import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const AdminChart = () => {
  // State to store the chart data
  const [chartData, setChartData] = useState(null);

  // Fetch your data and update the chartData state accordingly
  useEffect(() => {
    // Fetch the necessary data from your API endpoint or any other source
    // Replace this with your actual API call to fetch data for the chart
    const fetchData = async () => {
      try {
        // Fetch data from your API or other source
        // For example, if you want to get the most ordered products, revenue, etc.
        const response = await fetch('api/v1/orders'); // Replace with your actual endpoint
        const data = await response.json();

        // Process the data as needed and format it for the chart
        const chartData = {
          labels: [], // Labels for the X-axis (e.g., product names, dates)
          datasets: [
            {
              label: 'Data Label', // Label for the dataset
              data: [], // Data points for the Y-axis
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for the bars
              borderColor: 'rgba(75, 192, 192, 1)', // Border color for the bars
              borderWidth: 1, // Border width for the bars
            },
          ],
        };

        // Populate the chartData object with your data
        data.forEach((item) => {
          chartData.labels.push(item.label); // Push labels to X-axis
          chartData.datasets[0].data.push(item.value); // Push data to Y-axis
        });

        // Set the chart data state
        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chart.js options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="admin-chart">
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default AdminChart;
