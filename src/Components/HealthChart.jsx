import React, { Component, useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const HealthChart = ({ symbol, market }) => {
    const [histData, setHistData] = useState(null);

      return (
        <div>
          {histData ? (// rendering only if API call actually returned us data
            <div>
              
            </div>
          ) : null}
        </div>
      );
    
  };

export default HealthChart;