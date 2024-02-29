import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Grid } from '@mui/material';

export const LineChart = ({ data }) => {

    const chartRef = useRef(null);

    const chartInstanceRef = useRef(null);

    const monthQuantity = calculateMonthQuantity(data);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (ctx) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: monthQuantity.map((entry) => entry.name),
                    datasets: [
                        {
                            label: 'Quantity',
                            data: monthQuantity.map((entry) => entry.value),
                            fill: false,
                            borderColor: '#0088FE',
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Quantity',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Month',
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
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
    }, [monthQuantity]);

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

const calculateMonthQuantity = (data) => {
    const quantityPerMonth = {};

    data?.forEach((entry) => {
        const month = new Date(entry.createdAt).toLocaleString('default', { month: 'long' });
        const quantity = entry.quantity || 0;

        if (quantityPerMonth[month]) {
            quantityPerMonth[month] += quantity;
        } else {
            quantityPerMonth[month] = quantity;
        }
    });

    return Object.keys(quantityPerMonth).map((key) => ({ name: key, value: quantityPerMonth[key] }));
};
