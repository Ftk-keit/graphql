import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = btoa(unescape(encodeURIComponent(`${emailOrUsername}:${password}`)));
    fetch("https://learn.zone01dakar.sn/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${data}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
            setError(result.error)
          } else {
            setError(null)
            localStorage.setItem('Token', result);
            navigate('/home');
          }
        } else {
          console.log("error");
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <section className='pt-[10%] bg-[#d4d3dcbd] min-h-screen rounded-xl'>
      <div className="w-full max-w-[35%] mx-auto overflow-hidden rounded-xl shadow-md bg-[#011826]">
        <div className="p-10">


          <h3 className="mt-3 text-xl font-medium text-center text-white dark:text-gray-200">Welcome Back</h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login to your account</p>
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {error ? (
              <>
                <span className="font-medium">Oops!</span> {error}
              </>
            ) : (
              ""
            )}
          </p>

          <form id="formConnexion" onSubmit={handleSubmit}>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                className="block w-full py-3 text-gray-700 bg-white border rounded-[5px] px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email or username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-[5px] dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between mt-4 ">
              <button type="submit" id="bntSend" className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1d3849] rounded-[5px] hover:bg-[#172c38] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Connexion;
