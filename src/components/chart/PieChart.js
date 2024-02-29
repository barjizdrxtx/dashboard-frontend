import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Grid } from '@mui/material';

export const PieChart = ({ data }) => {
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
                type: 'pie',
                data: {
                    labels: monthQuantity.map((entry) => entry.name),
                    datasets: [
                        {
                            label: 'Quantity',
                            data: monthQuantity.map((entry) => entry.value),
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
