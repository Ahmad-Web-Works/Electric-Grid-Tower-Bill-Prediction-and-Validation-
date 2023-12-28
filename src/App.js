import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import DataDisplay from './DataDisplay';
// import ComercialRegionTable from '../src/TableDisplayData/ComercialRegionTable';
// import LoadSheddingChart from './LoadSheddingChart';
// import MbuData from './MbuData';
// import ComercialRegion from './ComercialRegion';
// import { Route } from 'react-router-dom';
import Signin from '../src/Components/Signin';
import Dashboard from '../src/Components/Dashboard';
import LoadShd from '../src/Components/LoadShd';
import ReportGen from '../src/Components/ReportGen';
import UploadReport from '../src/Components/UploadReport';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Signin />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/loadShd" element={<LoadShd />} />
            <Route exact path="/reportgen" element={<ReportGen />} />
            <Route exact path="/uploadReport" element={<UploadReport />} />
          </Routes>
        </div>
      </Router>
    </>

  );
};
export default App;
