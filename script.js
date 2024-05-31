document.addEventListener('DOMContentLoaded', () => {
    const countries = [
        "United States", "China", "Japan", "Germany", "India",
        "United Kingdom", "France", "Italy", "Brazil", "Canada"
    ];

    const data = {
        "United States": [342, 25.46, 16.65, 87.9, 4200, 9.2, 858, 1250, 500, 43, 5.42, 12, 25, 35, 25, 25, 7.2, 30, 50, 400, 20, 300, 140],
        "China": [1430, 19.37, 28.37, 1033, 7600, 26.1, 252, 2500, 700, 120, 10.06, 20, 55, 40, 30, 45, 10.2, 40, 70, 900, 45, 37000, 600],
        "Japan": [126, 4.23, 10.7, 104.1, 950, 8.7, 50, 300, 88, 1, 1.2, 9, 22, 10, 15, 20, 1.8, 25, 18, 180, 10, 3000, 50],
        "Germany": [84, 4.43, 10.1, 40.8, 670, 4.9, 53, 200, 55, 1.5, 0.8, 11, 20, 18, 20, 18, 1.5, 18, 28, 220, 15, 3300, 45],
        "India": [1400, 3.73, 16.3, 115.6, 1750, 4.1, 76, 800, 620, 2.3, 3.6, 4, 13, 15, 10, 10, 3.6, 15, 23, 180, 12, 6000, 30],
        "United Kingdom": [67, 3.33, 6.5, 7.1, 335, 1.8, 68, 150, 24, 0.5, 0.4, 7, 10, 8, 7, 12, 1.2, 8, 12, 140, 7, 700, 28],
        "France": [65, 3.05, 7.1, 14.5, 455, 2.3, 63, 180, 30, 0.6, 0.3, 8, 14, 9, 8, 11, 1.1, 10, 16, 160, 9, 900, 32],
        "Italy": [60, 2.19, 5.8, 11.3, 300, 1.5, 38, 100, 21, 0.4, 0.2, 6, 11, 7, 6, 9, 1.0, 7, 13, 130, 6, 800, 25],
        "Brazil": [214, 2.13, 5.0, 36.0, 645, 3.2, 27, 150, 150, 0.4, 0.4, 5, 10, 5, 10, 9, 1.5, 10, 15, 180, 10, 1500, 27],
        "Canada": [38, 2.12, 5.0, 12.2, 350, 2.2, 35, 110, 25, 0.3, 0.6, 5, 9, 6, 5, 8, 1.3, 6, 10, 140, 8, 750, 27]
    };

    const categories = [
        "Total Population", "GDP (2023)", "Industrial Output (2023)", "Steel Production (2023)", 
        "Electricity Production (2023)", "Automobile Production (2023)", "Military Expenditure (2023)", 
        "Renewable Energy Production (2023)", "Agricultural Output (2023)", "Rare Earth Minerals Production (2023)", 
        "CO2 Emissions (2023)", "Semiconductor Production (2023)", "Pharmaceutical Production (2023)", 
        "Aerospace and Defense Industry (2023)", "Machine Tools Production (2023)", "Robotics and Automation (2023)", 
        "Electric Vehicles Production (2023)", "Artificial Intelligence Development (2023)", "Advanced Materials (2023)", 
        "Chemical Production (2023)", "Shipbuilding Capacity (2023)", "High-speed Rail Infrastructure (2023)", 
        "Energy Storage Capacity (2023)"
    ];

    const country1Select = document.getElementById('country1');
    const country2Select = document.getElementById('country2');
    const chartCanvas = document.getElementById('comparisonChart');

    countries.forEach(country => {
        const option1 = document.createElement('option');
        option1.value = country;
        option1.textContent = country;
        country1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = country;
        option2.textContent = country;
        country2Select.appendChild(option2);
    });

    country1Select.value = 'United States';
    country2Select.value = 'China';

    let comparisonChart;

    function updateChart() {
        const country1 = country1Select.value;
        const country2 = country2Select.value;
        const data1 = data[country1];
        const data2 = data[country2];

        const totalValues = data1.map((val, i) => val + data2[i]);
        const percentages1 = data1.map((val, i) => (val / totalValues[i]) * 100);
        const percentages2 = data2.map((val, i) => (val / totalValues[i]) * 100);

        const chartData = {
            labels: categories,
            datasets: [
                {
                    label: country1,
                    data: percentages1,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: country2,
                    data: percentages2,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        };

        if (comparisonChart) {
            comparisonChart.destroy();
        }

        comparisonChart = new Chart(chartCanvas, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Categories'
                        }
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Percentage of Total Value'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += Math.round(context.raw * 100) / 100 + '%';
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    country1Select.addEventListener('change', updateChart);
    country2Select.addEventListener('change', updateChart);

    updateChart();
});
