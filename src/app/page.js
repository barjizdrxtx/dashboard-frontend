"use client"

import React from 'react'
import { useDataFetch } from '../hooks/useDataFetch';
import { Grid, Paper, Typography } from '@mui/material';
import CustomTable from '../components/table/CustomTable';
import { PieChart } from '../components/chart/PieChart';
import { LineChart } from '../components/chart/LineChart';

const page = () => {

  const { fetchedData: order, refetch } = useDataFetch(`order`);

  const tableProps = {
    tableData: order,
    refetch: refetch,
    tableHead: ["Quantity"],
    element: ["quantity"],
  };

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>

      <Grid item xs={12}>
        <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 3 }}>Dashboard</Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Pie Chart</Typography>

          <PieChart data={order} />

        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>

        <Paper elevation={3} sx={{ p: 2 }}>

          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Graph</Typography>

          <LineChart data={order} />

        </Paper>

      </Grid>

      <Grid item xs={12} md={6}>

        <Paper elevation={3} sx={{ p: 2 }}>

          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Table</Typography>

          <CustomTable {...tableProps} />

        </Paper>
      </Grid>

    </Grid>
  );
}

export default page
