import React, { useRef } from 'react';
import '../StyleSheet/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';


const UploadReport = () => {

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('http://localhost:3001/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle the response from the backend (if needed)
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      // Handle any errors that occurred during the file upload
      console.error('Error uploading file:', error);
    }
  };


  return (
    <div>
      <div id="topbar">
        <h3 className="dash-nav">Dashboard / Upload Report</h3>
        <FontAwesomeIcon icon={faUserCircle} className="icon-nav" />
        <h3 className="user-nav">User</h3>
      </div>

      <div className="sec-1">
        <div style={{ position: 'fixed', fontFamily: 'Arial, sans-serif' }} className="sidebar">
          <nav>
            <ul className="list-group">
              <li><Link style={{ paddingLeft: '12px', paddingRight: '13px' }} to="/dashboard">DASHBOARD</Link></li>
              <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/LoadShd">LOAD SHEDDING CALCULATION</Link></li>
              <li style={{ padding: '0px', borderRadius: '5px', backgroundColor: '#9A0A0F' }}><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/uploadReport">UPLOAD REPORT</Link></li>
              <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/reportGen">BILL REPORT GENERATOR</Link></li>
              <li><Link style={{ paddingLeft: '12px', paddingRight: '12px' }} to="/">BILL PREDICTION</Link></li>
              {/* Add more sidebar items here */}
            </ul>
          </nav>
        </div>

        <div className="main-div">
          <div className="main">
            <div className="upload-section">
              <h1>UPLOAD A REPORT</h1>
              <div className="form-group">
                <label htmlFor="from">From</label>
                <input type="date" id="from" />
              </div>
              <div className="form-group">
                <label htmlFor="to">To</label>
                <input type="date" id="to" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <img
                className="up-img"
                src="./Images/upload.png"
                alt="Button"
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;
