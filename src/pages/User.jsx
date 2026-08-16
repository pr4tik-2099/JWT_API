// import React from "react";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from 'react';
// import { Navigate, useNavigate} from 'react-router-dom';
// import {Chart as ChartJS, registerables } from 'chart.js';
// import { Doughnut, Bar } from 'react-chartjs-2';
// import axios from "axios";

// ChartJS.register(...registerables);

// function User() {
//     const { userName } = useParams();

//     let[BloodSugarReadings, setBloodSugarReadings] = useState([]);
//     const token = sessionStorage.getItem('token');

//     useEffect(() => {
//   const fetchBloodSugarReadings = async () => {
//     try {
//     await axios.post(
//         "https://localhost:44380/api/MedSpace/GetUserBloodSugarReadings",
//         {username: userName},
//         {
//           headers:{
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       ).then((response) =>{
//         setBloodSugarReadings(response.data.data);
//         console.log(response.data.data);
//         console.log("Fetched: ", BloodSugarReadings);
//       })


//     } catch (error) {
//       console.error(
//         "Failed to fetch user data:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   fetchBloodSugarReadings();
// }, []);

//   return (
//     <>
//       <div className="card w-96 bg-base-100 shadow-xl m-10 border-2 border-cyan-400">
//       <div className="card-body">
//        <Bar
//         data={{
//           labels: ['Red', 'Blue', 'Yellow'],
//           datasets: [
//             {
//               label: '# of Votes',
//               // data: BloodSugarReadings.map((data) => data.bsLvl)
//             }
//           ]
//         }}
//         />
//       </div>
//     </div>
//     </>
//   );
// }

// export default User;

import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(...registerables);

function User() {
  const { userName } = useParams();

  // 1. Use const instead of let for React state
  const [BloodSugarReadings, setBloodSugarReadings] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchBloodSugarReadings = async () => {
      try {
        // 2. Cleaned up the async/await (removed .then)
        const response = await axios.post(
          "https://localhost:44380/api/MedSpace/GetUserBloodSugarReadings",
          { username: userName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const fetchedData = response.data.data;
        console.log("Direct API response:", fetchedData);

        // 3. Safety check to guarantee state is ALWAYS an array
        if (Array.isArray(fetchedData)) {
          setBloodSugarReadings(fetchedData);
        } else {
          console.warn("API returned non-array data, setting to empty array.");
          setBloodSugarReadings([]);
        }

      } catch (error) {
        console.error(
          "Failed to fetch user data:",
          error.response?.data || error.message
        );
      }
    };

    fetchBloodSugarReadings();
  }, [userName, token]); // Added dependencies to useEffect

  return (
    <>
      <div className="card w-200 bg-base-100 shadow-xl m-10 border-2 border-cyan-400">
        <Bar
          data={{
            // 4. Dynamically generate labels so they match the amount of data
            // If your data has a date, use `data.date` instead of `Reading ${index + 1}`
            labels: BloodSugarReadings.map((data) => data.rpDate),
            datasets: [
              {
                label: "Blood Sugar Level",
                // 5. Safely map the data
                data: BloodSugarReadings.map((data) => data.bsLvl),
                backgroundColor: "#1BFA87", // Added color to match your cyan border
                borderColor: "rgba(14, 11, 938, 76)",
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
      
        <div className="card w-200 bg-base-100 shadow-xl m-10 border-2 border-cyan-400">
        <Doughnut
          data={{
            // 4. Dynamically generate labels so they match the amount of data
            // If your data has a date, use `data.date` instead of `Reading ${index + 1}`
            labels:BloodSugarReadings.map((data) => data.rpDate),
            datasets: [
              {
                label: "Blood Sugar Level",
                data: BloodSugarReadings.map((data) => data.bsLvl),
              },
            ],
          }}
        />
      </div>

    </>
  );
}

export default User;