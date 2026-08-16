import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDetails() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
  const navigate = useNavigate();

  useEffect(() => {
    //debugger;
    const fetchUsers = async () => {
      try {
        // Fetching data from your local API
        const response = await fetch('https://localhost:44380/api/MedSpace/GetUsersList',
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched user data:", data);
        // If your API returns a single object instead of an array, wrap it in an array:
        // const userData = Array.isArray(data) ? data : [data];
        setUsers(Array.isArray(data.data) ? data.data : [data.data]);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRowDoubleClick = (userName) => {
    navigate(`/User/${encodeURIComponent(userName)}`);
  };


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-green-400">
        <p className="text-xl font-semibold animate-pulse">Loading patient data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-red-400">
        <p className="text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 font-sans">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-3xl font-bold text-emerald-400 tracking-wider">
          Med Space Users Records
        </h2>

        <div className="overflow-x-auto border border-green-700 shadow-lg shadow-green-900/20">
          <table className="w-full text-left text-sm text-green-400">
            <thead className="bg-gray-800 text-xs uppercase text-green-400">
              <tr>
                {/* <th className="px-6 py-4 border-b border-green-900">ID</th> */}
                <th className="px-6 py-4 text-white border-b border-green-700">Patient Name</th>
                <th className="px-6 py-4 text-white border-b border-green-700">Contact & Location</th>
                <th className="px-6 py-4 text-white border-b border-green-700">Vitals (Age/Ht/Wt)</th>
                <th className="px-6 py-4 text-white border-b border-green-700">Health History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-900/50 bg-gray-900">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-800/50 transition-colors"
                onDoubleClick={() => handleRowDoubleClick(user.userName)}
                >
                  {/* <td className="px-6 py-4 font-medium">#{user.userId}</td> */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-lg text-cyan-400">{user.fullName}</div>
                    <div className="text-xs text-green-400">{user.gender} • DOB: {user.birthDate}</div>
                     <div className="text-xs font-bold text-red-500">{user.userName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{user.emailId}</div>
                    <div className="text-xs text-cyan-500">+91-{user.contactNumber}</div>
                    <div className="text-xs text-green-400 mt-1">{user.city}, {user.state}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{user.age} yrs</div>
                    <div className="text-xs text-green-400">
                      {user.height} cm • {user.weight} kg
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 rounded text-xs w-max ${user.hypertension ? 'bg-green-900/60 text-emerald-400 border border-green-500' : 'text-gray-500'}`}>
                        Hypertension: {user.hypertension ? 'Yes' : 'No'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs w-max ${user.diabetes ? 'bg-green-900/60 text-emerald-400 border border-green-500' : 'text-gray-500'}`}>
                        Diabetes: {user.diabetes ? 'Yes' : 'No'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs w-max ${user.smoking ? 'bg-green-900/60 text-emerald-400 border border-green-500' : 'text-gray-500'}`}>
                        Smoking: {user.smoking ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="p-8 text-center text-green-400">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default UserDetails;