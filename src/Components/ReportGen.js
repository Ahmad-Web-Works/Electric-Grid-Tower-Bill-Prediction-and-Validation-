import React from 'react';
import '../StyleSheet/Assets/styles.css'; 
import { Link } from 'react-router-dom';

const ReportGenerator = () => {
    return (
        <div>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />

            <header>
                <div className="header-path">Dashboard &nbsp; / &nbsp; Report Generation</div>
                <div className="user-info">User</div>
            </header>

            <div style={{ position: 'fixed', fontFamily: 'Arial, sans-serif' }} className="sidebar">
                <nav>
                    <ul className="list-group">
                        <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/dashboard">DASHBOARD</Link></li>
                        <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/loadShd">LOAD SHEDDING CALCULATION</Link></li>
                        <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/uploadReport">UPLOAD REPORT</Link></li>
                        <li style={{ padding: '0px', borderRadius: '5px', backgroundColor: '#9A0A0F' }}><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/reportGen">BILL REPORT GENERATOR</Link></li>
                        <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/">BILL PREDICTION</Link></li>
                        {/* Add more sidebar items here */}
                    </ul>
                </nav>
            </div>

            <div style={{ marginLeft: '278px' }} className="main-form">
                <div style={{ marginRight: '60px' }} className="row main-inputs">

                    <div style={{ display: 'flex' }} className="col-4">
                        <label style={{ width: '120px', textAlign: 'center' }} className="form-label">Main Region</label>
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
                        <label style={{ width: '120px' }} className="form-label">Commercial Region</label>
                        <div className="col-8">
                            <select className="form-select form-select-sm inputState">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', paddingLeft: '40px' }} className="col-4">
                        <label style={{ width: '120px', textAlign: 'center' }} className="form-label">MBU</label>
                        <div className="col-8">
                            <select className="form-select form-select-sm inputState">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>

                </div>

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
                            <input style={{ marginLeft: '47px', textAlign: 'center' }} type="date" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', paddingLeft: '40px' }} className="col-4">
                        <label style={{ width: '120px', textAlign: 'center' }} className="form-label">To</label>
                        <div className="col-8">
                            <input style={{ textAlign: 'center' }} type="date" className="form-control form-control-sm" />
                        </div>
                    </div>

                    <div style={{ textAlign: 'right', padding: '15px 50px 15px 0px' }} className="submit-btn data-controls">
                        <button style={{ fontWeight: '600', marginTop: '30px' }} type="submit">Get Report</button>
                    </div>

                </div>

                <section style={{ marginLeft: '278px', marginRight: '20px' }} className="data-container">
                    <div className="data-controls">
                        <button>CSV</button>
                        <button>EXCEL</button>
                        <button>COPY</button>
                    </div>
                    <div className="data-table">
                        {/* Data table goes here */}
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Site Code</th>
                                    <th>Major City</th>
                                    {/* More table headers */}
                                    <th>Total Load Shedding</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="8">No data is available</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

        </div>
    );
};

export default ReportGenerator;
