import React, { useEffect, useState } from 'react';
import '../StyleSheet/Assets/styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../DataDisplay.css'

// import { Helmet } from 'react-helmet';


const LoadShedding = () => {

    const [originalData, setOriginalData] = useState([]);
    const [calculatedData, setCalculatedData] = useState([]);
    const [showOriginal, setShowOriginal] = useState(false);
    const [showCalculatedBill, setShowCalculatedBill] = useState(false);
    const [showCalculatedData, setShowCalculatedData] = useState(true);

    const [showMainRegion, setShowMainRegion] = useState(false);
    const [mainRegionColumns, setMainRegionColumns] = useState([]);
    const [selectedMainRegionColumn, setSelectedMainRegionColumn] = useState('Main Region');
    const [mainRegionData, setMainRegionData] = useState([]);

    const [showComRegion, setShowComRegion] = useState(false);
    const [comRegionColumns, setComRegionColumns] = useState([]);
    const [selectedComRegionColumn, setSelectedComRegionColumn] = useState('Comercial Region');
    const [comRegionData, setComRegionData] = useState([]);

    const [showMbu, setShowMbu] = useState(false);
    const [mbuColumns, setMbuColumns] = useState([]);
    const [selectedMbuColumn, setSelectedMbuColumn] = useState('Mbu');
    const [mbuData, setMbuData] = useState([]);

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        fetchOriginalData();
        fetchCalculatedData();
        fetchMainRegionColumns();
        fetchComRegionColumns();
        fetchMbuColumns();
    }, []);

    const fetchOriginalData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/data');
            setOriginalData(response.data);
        } catch (error) {
            console.error('Error fetching original data:', error);
        }
    };

    const fetchCalculatedData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/calculatedData');
            setCalculatedData(response.data);
        } catch (error) {
            console.error('Error fetching calculated data:', error);
        }
    };

    const fetchMainRegionColumns = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/mainregions/columns');
            setMainRegionColumns(['Main Region', ...response.data]);
        } catch (error) {
            console.error('Error fetching Main Region columns:', error);
        }
    };

    const fetchComRegionColumns = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/comercialRegionData/columns');
            setComRegionColumns(['Comercial Region', ...response.data]);
        } catch (error) {
            console.error('Error fetching Comercial Region columns:', error);
        }
    };

    const fetchMbuColumns = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/mbusData/columns');
            setMbuColumns(['Mbu', ...response.data]);
        } catch (error) {
            console.error('Error fetching Mbu columns:', error);
        }
    };

    const handleShowMainRegion = async () => {
        try {
            let response;

            if (selectedMainRegionColumn === 'Main Region') {
                response = await axios.get('http://localhost:3001/api/mainRegionsTableData', {
                    params: { from: fromDate, to: toDate }
                });
            } else {
                response = await axios.get(`http://localhost:3001/api/mainRegionsTableData/column/${selectedMainRegionColumn}`, {
                    params: { from: fromDate, to: toDate }
                });
            }

            setMainRegionData(response.data);
            setShowMainRegion(true);
            setShowOriginal(false);
            setShowComRegion(false);
            setShowMbu(false);
            setShowCalculatedBill(false);
            setShowCalculatedData(false);
        } catch (error) {
            console.error('Error fetching main region data:', error);
        }
    };

    const handleShowComRegion = async () => {
        try {
            let response;

            if (selectedComRegionColumn === 'Comercial Region') {
                response = await axios.get('http://localhost:3001/api/comercialRegionsTableData', {
                    params: { from: fromDate, to: toDate }
                });
            } else {
                response = await axios.get(`http://localhost:3001/api/comercialRegionsTableData/column/${selectedComRegionColumn}`, {
                    params: { from: fromDate, to: toDate }
                });
            }

            setComRegionData(response.data);
            setShowComRegion(true);
            setShowOriginal(false);
            setShowMainRegion(false);
            setShowMbu(false);
            setShowCalculatedBill(false);
            setShowCalculatedData(false);
        } catch (error) {
            console.error('Error fetching main region data:', error);
        }
    };

    const handleShowMbu = async () => {
        try {
            let response;

            if (selectedMbuColumn === 'Mbu') {
                response = await axios.get('http://localhost:3001/api/mbusTableData', {
                    params: { from: fromDate, to: toDate }
                });
            } else {
                response = await axios.get(`http://localhost:3001/api/mbusTableData/column/${selectedMbuColumn}`, {
                    params: { from: fromDate, to: toDate }
                });
            }

            setMbuData(response.data);
            setShowMbu(true);
            setShowComRegion(false);
            setShowOriginal(false);
            setShowMainRegion(false);
            setShowCalculatedBill(false);
            setShowCalculatedData(false);
        } catch (error) {
            console.error('Error fetching main region data:', error);
        }
    };

    const handleColumnChange = (selectedColumn) => {
        setSelectedMainRegionColumn(selectedColumn);
        setSelectedComRegionColumn(selectedColumn);
        setSelectedMbuColumn(selectedColumn);
    };

    const handleShowCalculatedBill = () => {
        setShowOriginal(false);
        setShowCalculatedData(false);
        setShowCalculatedBill(true);
        setShowMainRegion(false);
        setShowComRegion(false);
        setShowMbu(false);
    };

    const handleShowOriginalData = () => {
        setShowOriginal(true);
        setShowCalculatedData(false);
        setShowCalculatedBill(false);
        setShowMainRegion(false);
        setShowComRegion(false);
        setShowMbu(false);
    };

    const handleShowCalculatedData = () => {
        setShowOriginal(false);
        setShowCalculatedBill(false);
        setShowCalculatedData(true);
        setShowMainRegion(false);
        setShowComRegion(false);
        setShowMbu(false);
    };

    return (
        <div>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />

            <header>
                <div className="header-path">Dashboard &nbsp; / &nbsp; Load Shedding Calculation</div>
                <div className="user-info">User</div>
            </header>

            <div style={{ position: 'fixed', fontFamily: 'Arial, sans-serif' }} className="sidebar">
                <nav>
                    <ul className="list-group">
                        <li><Link style={{ paddingLeft: '12px', paddingRight: '13px' }} to="/dashboard">DASHBOARD</Link></li>
                        <li style={{ padding: '0px', borderRadius: '5px', backgroundColor: '#9A0A0F' }}><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/loadShd">LOAD SHEDDING CALCULATION</Link></li>
                        <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/uploadReport">UPLOAD REPORT</Link></li>
                        <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/reportGen">BILL REPORT GENERATOR</Link></li>
                        <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/">BILL PREDICTION</Link></li>
                        {/* Add more sidebar items here */}
                    </ul>
                </nav>
            </div>

            {/* Main Form */}
            <div style={{ marginLeft: '278px' }} className="main-form">

                {/* Form Sections */}
                <div style={{ marginRight: '60px' }} className="row main-inputs">
                    <div style={{ display: 'flex' }} className="col-4">
                        <label style={{ width: '120px', textAlign: 'center' }} className="form-label">Main Region</label>
                        <div className="col-7">
                            <select className="form-select form-select-sm inputState" value={selectedMainRegionColumn} onChange={(e) => handleColumnChange(e.target.value)}>
                                {mainRegionColumns.map((column, index) => (
                                    <option key={index} value={column}>
                                        {column}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', paddingLeft: '40px' }} className="col-4">
                        <label style={{ width: '120px' }} className="form-label">Commercial Region</label>
                        <div className="col-8">
                            <select className="form-select form-select-sm inputState" value={selectedComRegionColumn} onChange={(e) => handleColumnChange(e.target.value)}>
                                {comRegionColumns.map((column, index) => (
                                    <option key={index} value={column}>
                                        {column}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', paddingLeft: '40px' }} className="col-4">
                        <label style={{ width: '120px', textAlign: 'center' }} className="form-label">MBU</label>
                        <div className="col-8">
                            <select className="form-select form-select-sm inputState" value={selectedMbuColumn} onChange={(e) => handleColumnChange(e.target.value)}>
                                {mbuColumns.map((column, index) => (
                                    <option key={index} value={column}>
                                        {column}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* <!-- 2 --> */}
                <div style={{ marginRight: '60px' }} className="row main-inputs">
                    <div style={{ display: 'flex' }} className="col-4">
                        <label style={{ width: '120px', textAlign: 'center' }} className="form-label">Site Code</label>
                        <div className="col-7">
                            <select className="form-select form-select-sm inputState">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', paddingLeft: '40px' }} className="col-4">
                        <label style={{ width: '120px' }} className="form-label">From</label>
                        <div className="col-8">
                            <input style={{ marginLeft: '47px', textAlign: 'center' }} type="date" className="form-control form-control-sm" value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', paddingLeft: '40px' }} className="col-4">
                        <label style={{ width: '120px', textAlign: 'center' }} className="form-label">To</label>
                        <div className="col-8">
                            <input style={{ textAlign: 'center' }} type="date" className="form-control form-control-sm" value={toDate}
                                onChange={(e) => setToDate(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Calculate LS Button */}
                <div style={{ textAlign: 'right', padding: '15px 50px 15px 0px' }} classNameName="submit-btn data-controls">
                <div style={{ display: 'flex' }} className="col-4">
                        <label style={{ width: '120px', textAlign: 'center' }} className="form-label">Site Code</label>
                        <div className="col-7">
                            <select className="form-select form-select-sm inputState">
                                <option selected>Calculate LS</option>
                                <option value="1" onClick={ handleShowMainRegion}> Main Region </option>
                                <option value="2"onClick={ handleShowComRegion}> Comertial Region</option>
                                <option value="3"onClick={ handleShowMbu}> Main Region</option>
                            </select>
                        </div>
                    </div>
                    {/* <button style={{ fontWeight: '600', marginTop: '30px' }} type="submit" 
                    onClick={ handleShowMainRegion}>Calculate LS</button> */}
                </div>

            </div>

            {/* Data Container */}
            <section style={{ marginLeft: '278px', marginRight: '20px' }} className="data-container">
                <div className="data-controls">
                    <button>CSV</button>
                    <button>EXCEL</button>
                    <button>COPY</button>
                </div>
                <div className="data-table">
                    {/* Data Table */}
                    <div className="alignTable">
                        <div className="tableData">
                            {showComRegion && (
                                <table>
                                    <thead>
                                        <tr>
                                            {selectedComRegionColumn === 'Comercial Region' ? (
                                                <>
                                                    <th>Date</th>
                                                    {comRegionColumns
                                                        .filter(column => column !== 'Comercial Region')
                                                        .map((column, index) => (
                                                            <th key={index}>{column}</th>
                                                        ))}
                                                </>
                                            ) : (
                                                <>
                                                    <th>Date</th>
                                                    <th>{selectedComRegionColumn}</th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comRegionData.map((row, index) => (
                                            <tr key={index}>
                                                {selectedComRegionColumn === 'Comercial Region' ? (
                                                    <>
                                                        <td>{row.Date}</td>
                                                        {comRegionColumns
                                                            .filter(column => column !== 'Comercial Region')
                                                            .map((column, index) => (
                                                                <td key={index}>{row[column]}</td>
                                                            ))}
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{row.Date}</td>
                                                        <td>{row[selectedComRegionColumn]}</td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {showCalculatedBill && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Site Code</th>
                                            <th>Major City</th>
                                            <th>Prime</th>
                                            <th>OSV</th>
                                            <th>Region</th>
                                            <th>Comm Region</th>
                                            <th>Commercial with Split</th>
                                            <th>Zone</th>
                                            <th>Vendor</th>
                                            <th>MBU</th>
                                            <th>Units Consumption</th>
                                            <th>Electricity Bill</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {calculatedData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.Date}</td>
                                                <td>{row['Site Code']}</td>
                                                <td>{row['Major City']}</td>
                                                <td>{row.Prime}</td>
                                                <td>{row.OSV}</td>
                                                <td>{row.Region}</td>
                                                <td>{row['Comm Region']}</td>
                                                <td>{row['Commercial with Split']}</td>
                                                <td>{row.Zone}</td>
                                                <td>{row.Vendor}</td>
                                                <td>{row.MBU}</td>
                                                <td>{row['Units Consumption']}</td>
                                                <td>{row['Electricity Bill']}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {showOriginal && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Site Code</th>
                                            <th>Major City</th>
                                            <th>Prime</th>
                                            <th>OSV</th>
                                            <th>Region</th>
                                            <th>Comm Region</th>
                                            <th>Commercial with Split</th>
                                            <th>Zone</th>
                                            <th>Vendor</th>
                                            <th>MBU</th>
                                            <th>SOB</th>
                                            <th>LV</th>
                                            <th>GRM</th>
                                            <th>MF</th>
                                            <th>Total Load shedding (MINS)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {originalData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.Date}</td>
                                                <td>{row['Site Code']}</td>
                                                <td>{row['Major City']}</td>
                                                <td>{row.Prime}</td>
                                                <td>{row.OSV}</td>
                                                <td>{row.Region}</td>
                                                <td>{row['Comm Region']}</td>
                                                <td>{row['Commercial with Split']}</td>
                                                <td>{row.Zone}</td>
                                                <td>{row.Vendor}</td>
                                                <td>{row.MBU}</td>
                                                <td>{row.SOB}</td>
                                                <td>{row.LV}</td>
                                                <td>{row.GRM}</td>
                                                <td>{row.MF}</td>
                                                <td>{row['Total Load shedding (MINS)']}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {showMbu && (
                                <table>
                                    <thead>
                                        <tr>
                                            {selectedMbuColumn === 'Mbu' ? (
                                                <>
                                                    <th>Date</th>
                                                    {mbuColumns
                                                        .filter(column => column !== 'Mbu')
                                                        .map((column, index) => (
                                                            <th key={index}>{column}</th>
                                                        ))}
                                                </>
                                            ) : (
                                                <>
                                                    <th>Date</th>
                                                    <th>{selectedMbuColumn}</th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mbuData.map((row, index) => (
                                            <tr key={index}>
                                                {selectedMbuColumn === 'Mbu' ? (
                                                    <>
                                                        <td>{row.Date}</td>
                                                        {mbuColumns
                                                            .filter(column => column !== 'Mbu')
                                                            .map((column, index) => (
                                                                <td key={index}>{row[column]}</td>
                                                            ))}
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{row.Date}</td>
                                                        <td>{row[selectedMbuColumn]}</td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {showCalculatedData && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Site Code</th>
                                            <th>Major City</th>
                                            <th>Prime</th>
                                            <th>OSV</th>
                                            <th>Region</th>
                                            <th>Comm Region</th>
                                            <th>Commercial with Split</th>
                                            <th>Zone</th>
                                            <th>Vendor</th>
                                            <th>MBU</th>
                                            <th>SOB</th>
                                            <th>LV</th>
                                            <th>GRM</th>
                                            <th>MF</th>
                                            <th>Total Load shedding (MINS)</th>
                                            <th>Total Load Shedding (HRS)</th>
                                            <th>System On Electricity (HRS)</th>
                                            <th>Units Consumption</th>
                                            <th>Electricity Bill</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {calculatedData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.Date}</td>
                                                <td>{row['Site Code']}</td>
                                                <td>{row['Major City']}</td>
                                                <td>{row.Prime}</td>
                                                <td>{row.OSV}</td>
                                                <td>{row.Region}</td>
                                                <td>{row['Comm Region']}</td>
                                                <td>{row['Commercial with Split']}</td>
                                                <td>{row.Zone}</td>
                                                <td>{row.Vendor}</td>
                                                <td>{row.MBU}</td>
                                                <td>{row.SOB}</td>
                                                <td>{row.LV}</td>
                                                <td>{row.GRM}</td>
                                                <td>{row.MF}</td>
                                                <td>{row['Total Load shedding (MINS)']}</td>
                                                <td>{row['Total Load Shedding (HRS)']}</td>
                                                <td>{row['System On Electricity (HRS)']}</td>
                                                <td>{row['Units Consumption']}</td>
                                                <td>{row['Electricity Bill']}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {showMainRegion && (
                                <table>
                                    <thead>
                                        <tr>
                                            {selectedMainRegionColumn === 'Main Region' ? (
                                                <>
                                                    <th>Date</th>
                                                    {mainRegionColumns
                                                        .filter(column => column !== 'Main Region')
                                                        .map((column, index) => (
                                                            <th key={index}>{column}</th>
                                                        ))}
                                                </>
                                            ) : (
                                                <>
                                                    <th>Date</th>
                                                    <th>{selectedMainRegionColumn}</th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mainRegionData.map((row, index) => (
                                            <tr key={index}>
                                                {selectedMainRegionColumn === 'Main Region' ? (
                                                    <>
                                                        <td>{row.Date}</td>
                                                        {mainRegionColumns
                                                            .filter(column => column !== 'Main Region')
                                                            .map((column, index) => (
                                                                <td key={index}>{row[column]}</td>
                                                            ))}
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{row.Date}</td>
                                                        <td>{row[selectedMainRegionColumn]}</td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

        </div>
    );
};

export default LoadShedding;
