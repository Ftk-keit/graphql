// import React, { useEffect, useState } from 'react';
// import fetchData from './fetchData';

// const DataDisplayComponent = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const fetchedData = await fetchData();
//         setData(fetchedData);
//       } catch (error) {
//         setError(error);
//       }
//     };

//     getData();
//   }, []);

//   if (error) {
//     return <div>Error: {JSON.stringify(error)}</div>;
//   }

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default DataDisplayComponent;
