
        document.addEventListener('DOMContentLoaded', function() {
            const chartFont = {
                family: "'Segoe UI', sans-serif",
                size: 12,
                weight: '600'
            };

            // Reports Line Chart
            const ctxReports = document.getElementById('reportsChart').getContext('2d');
            new Chart(ctxReports, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Reported Cases',
                        data: [12, 19, 15, 25, 22, 30],
                        borderColor: '#d97706',
                        backgroundColor: 'rgba(217, 119, 6, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#d97706',
                        pointRadius: 5
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: chartFont } },
                        x: { grid: { display: false }, ticks: { font: chartFont } }
                    }
                }
            });

            // Donations Doughnut Chart
            const ctxDonation = document.getElementById('donationChart').getContext('2d');
            new Chart(ctxDonation, {
                type: 'doughnut',
                data: {
                    labels: ['Food', 'Medicine', 'Cash', 'Supplies'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: ['#d97706', '#fbbf24', '#f59e0b', '#78350f'],
                        hoverOffset: 10,
                        borderWidth: 0
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { font: chartFont, padding: 15, usePointStyle: true }
                        }
                    }
                }
            });
        });

        // Simple handler for the "Are you sure?" prompt
        function handleAction(type) {
            if (confirm("Are you sure you want to " + type + " this request?")) {
                alert("Request " + type + "ed successfully.");
            }
        }
