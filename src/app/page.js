"use client"

import React from 'react'
import { useDataFetch } from '../hooks/useDataFetch';
import { Grid, Paper, Typography } from '@mui/material';
import CustomTable from '../components/table/CustomTable';
import { PieChart } from '../components/chart/PieChart';
import { LineChart } from '../components/chart/LineChart';

const page = () => {

  // Fetching order data using custom hook
  const { fetchedData: order, refetch } = useDataFetch(`order`);

  // Props for the custom table component
  const tableProps = {
    tableData: order,
    refetch: refetch,
    tableHead: ["Quantity"],
    element: ["quantity"],
  };

  return (
    // Grid layout for the page
    <Grid container spacing={3} sx={{ p: 2 }}>

      <Grid item xs={12}>
        {/* Page title */}
        <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 3 }}>Dashboard</Typography>
      </Grid>

      {/* Pie Chart */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Pie Chart</Typography>
          {/* Pie chart component */}
          <PieChart data={order} />
        </Paper>
      </Grid>

      {/* Line Chart */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Graph</Typography>
          {/* Line chart component */}
          <LineChart data={order} />
        </Paper>
      </Grid>

      {/* Custom Table */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Table</Typography>
          {/* Custom table component */}
          <CustomTable {...tableProps} />
        </Paper>
      </Grid>

    </Grid>
  );
}

export default page;
