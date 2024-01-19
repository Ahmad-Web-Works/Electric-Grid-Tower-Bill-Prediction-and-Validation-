import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from 'axios';
import '../ChartCss/barChart.css';
import '../StyleSheet/Dashboard.css';
import '../StyleSheet/Logout.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [columnsName, setColumnsName] = useState('Central 1');
    const [chartOf, setChartOf] = useState('comercialRegionData');
    const [columnsNamesList, setColumnsNamesList] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [formattedData, setFormattedData] = useState([['Year', 'LoadShedding(HRS)', { role: 'style' }]]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Retrieve user_name from local storage
        const storedUserName = localStorage.getItem('user_name');

        if (storedUserName) {
            setUser(storedUserName);
        }
    }, []);

    const handleSortClick = () => {
        const sortedChartData = [...formattedData]; // Create a copy of the formatted data
        sortedChartData.sort((a, b) => b[1] - a[1]); // Sort the copy
        setSortedData(sortedChartData); // Store the sorted data separately
        setIsSorted(!isSorted); // Toggle isSorted state
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/${chartOf}?column=${columnsName}`);
                const yearColors = {
                    '2017': '#4285F4',
                    '2018': '#34A853',
                    '2019': '#FBBC05',
                    // Add more years with respective colors here
                };
                const updatedFormattedData = [['Year', 'LoadShedding(HRS)', { role: 'style' }]];
                response.data.forEach(entry => {
                    const yearMonth = `${entry.Year}-${entry.Month}`;
                    updatedFormattedData.push([
                        yearMonth,
                        entry.Total,
                        yearColors[entry.Year],
                    ]);
                });
                setFormattedData(updatedFormattedData); // Update formattedData with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (columnsName) {
            fetchData();
        }
    }, [columnsName, chartOf]);

    useEffect(() => {
        const fetchColumns = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/${chartOf}/columns`);
                setColumnsNamesList(response.data);
                setColumnsName(response.data[0]); // Set the default column name
            } catch (error) {
                console.error('Error fetching column names:', error);
            }
        };

        fetchColumns();
    }, [chartOf]);

    const handleChartChange = (e) => {
        setChartOf(e.target.value);
    };

    const handleInputChange = (e) => {
        setColumnsName(e.target.value);
    };

    const options = {
        chart: {
            title: "Company Performance",
            subtitle: "Load Shedding for each month of each year",
        },
        legend: 'none', // Hide legend to prevent duplicate legend items
        series: {
            0: { // This represents the first series (bar)
                bar: {
                    groupWidth: '90%', // Adjusts width of bars
                },
                // Adjust the space between bars
                // You can use values between 0 to 1 for spacing
                // For example, setting it to 0.5 will provide 50% space between bars
                spacing: 0.5,
            },
        },
        chartArea: {  // Adjust chart area to remove extra space
            left: '11%',
            right: '1%',
            top: '1%',
            bottom: '1%',
            width: '70%',
            height: '70%',
        },
        margin: 'auto', // Center the chart horizontally
    };


    const handleIconClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogoutClick = () => {
        // Handle logout logic here
        console.log('Logout successful');
    };

    return (
        <div>
            <div id="topbar" style={{ marginTop: '-80px' }}>
                <h3 className="dash-nav">Dashboard</h3>
                {user && <h3 className="user-nav" style={{ marginTop: '0.4vh' }}>{user}</h3>}
                <div className="custom-dropdown" id="dropdown" onClick={handleIconClick}>
                    <i className="fas fa-user-circle icon-nav"></i>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <Link to="/signin" onClick={handleLogoutClick}>Logout</Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="sec-1">
                <div style={{ position: 'fixed', fontFamily: 'Arial, sans-serif', marginTop: '-16px' }} className="sidebar">
                    <nav>
                        <ul className="list-group">
                            <li style={{ padding: '0px', borderRadius: '5px', backgroundColor: '#9A0A0F' }}>
                                <Link style={{ paddingLeft: '12px', paddingRight: '13px' }} to="/dashboard">DASHBOARD</Link>
                            </li>
                            <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/loadShd">LOAD SHEDDING CALCULATION</Link></li>
                            <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/uploadReport">UPLOAD REPORT</Link></li>
                            <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/reportGen">BILL REPORT GENERATOR</Link></li>
                            <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/billPre">BILL PREDICTION</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="content">

                    <div style={{ display: 'flex', padding: '20px' }}>
                        <div className="index-sec">
                            <div className="col-7">
                                <select className="form-select form-select-sm inputState" value={chartOf} onChange={handleChartChange}>
                                    <option value="comercialRegionData">Commercial Region Data</option>
                                    <option value="mbusData">Mbus Data</option>
                                    <option value="mainregions">Main Regions Data</option>
                                </select>
                            </div>
                        </div>

                        <div className="index-sec">
                            <div className="col-7">
                                <select className="form-select form-select-sm inputState" value={columnsName} onChange={handleInputChange}>
                                    {columnsNamesList.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="index-sec">
                            <div className="col-7">
                                {/* <select className="form-select form-select-sm inputState">
                                    <option selected>MBU</option>
                                    <option value="1">C1-LHR-01</option>
                                    <option value="1">C1-LHR-02</option>
                                    <option value="1">C1-LHR-03</option>
                                    <option value="1">C1-LHR-04</option>
                                    <option value="1">C1-LHR-05</option>
                                    <option value="1">C1-LHR-06</option>
                                    <option value="1">C1-LHR-07</option>
                                    <option value="2">C2-KSR-03</option>
                                    <option value="3">C2-MKR-02</option>
                                    <option value="3">...</option>
                                </select> */}
                                <button className="form-select form-select-sm inputState" onClick={handleSortClick}>
                                    {isSorted ? 'Original Data' : 'Sort Descending'}
                                </button>
                            </div>
                        </div>

                    </div>

                    <div style={{ display: 'flex', padding: '20px' }}>

                        <div className="sec2">
                            <div className="heading">
                                <h2>Load-Shedding (HRS)</h2>
                            </div>
                            <div className="chart">
                                <Chart
                                    chartType="BarChart"
                                    width="100%"
                                    height="250%"
                                    data={isSorted ? sortedData : formattedData}
                                    options={options}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
