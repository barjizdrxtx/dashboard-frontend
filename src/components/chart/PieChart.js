import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Grid } from '@mui/material';

export const PieChart = ({ data }) => {

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const monthFrequency = calculateMonthFrequency(data);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (ctx) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: monthFrequency.map((entry) => entry.name),
                    datasets: [
                        {
                            label: 'Frequency',
                            data: monthFrequency.map((entry) => entry.value),
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                                '#8121E2',
                                '#00B400',
                                '#FF5733',
                            ],
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: 'rgba(0, 0, 0, 0.8)',
                                boxWidth: 12,
                                padding: 10,
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [monthFrequency]);

    return (
        <Grid container justifyContent="center" sx={{
            width: "100%",
            height: { xs: "fit-content", md: '60vh' }
        }}>
            <canvas
                ref={chartRef}
            ></canvas>
        </Grid>
    );
};

const calculateMonthFrequency = (data) => {
    const frequency = {};

    data?.forEach((entry) => {
        const month = new Date(entry.createdAt).toLocaleString('default', { month: 'long' });

        if (frequency[month]) {
            frequency[month] += 1;
        } else {
            frequency[month] = 1;
        }
    });

    return Object.keys(frequency).map((key) => ({ name: key, value: frequency[key] }));
};
