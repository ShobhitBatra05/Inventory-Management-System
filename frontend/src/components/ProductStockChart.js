import { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchProducts } from '../services/productService';


// Register all necessary components
Chart.register(...registerables);

const ProductStockChart = () => {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const data = await fetchProducts();
                const limitedData=data.slice(0,10);
                setStockData(limitedData);
            } catch (error) {
                console.error('Error fetching stock data', error);
            }
        };

        fetchStockData();
    }, []);

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true, // Optional: Start the y-axis at zero
            },
        },
    };

    // Prepare chart data
    const chartData = {
        labels: stockData.map(product => product.name),
        datasets: [
            {
                label: 'Number of Packets Available',
                data: stockData.map(product => product.stock),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className='w-full'>
            <Bar data={chartData} options={chartOptions}/>
        </div>
    );
};

export default ProductStockChart;
