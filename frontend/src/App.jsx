import React, { createContext, useState } from 'react'
import MyNav from './Components/MyNav'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Upload from './Pages/upload';
import Download from './Pages/download';

export const globalContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Upload />
  },
  {
    path: "/download",
    element: <Download />
  }
]);

const App = () => {
  const [mode, setMode] = useState(1);

  return (
    <globalContext.Provider value={{ mode, setMode }}>
      <div className={`${mode === 1 ? 'text-black bg-neutral-200' : 'text-white bg-neutral-700'} h-screen`}>
        <MyNav />
        <RouterProvider router={router} />
      </div>
    </globalContext.Provider>
  );
}

export default App;
