import React from 'react';
import { RouterProvider } from "react-router-dom";
import { routes } from './routes/Routes';
function App() {
  return (
    <div className="App ">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
