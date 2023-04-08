import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { DetailsPage, loader as gameDetailsLoader } from './component/detailsPage/DetailsPage';
import { SearchBar } from './component/searchBar/SearchBar';
import { customTheme } from "./themes/theme.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchBar />,
  },
  {
    path: "details/:id",
    element: <DetailsPage />,
    loader: gameDetailsLoader,
  }
]);

function App() {
  return (
    <ChakraProvider theme={customTheme}>      
        <RouterProvider router={router} />
    </ChakraProvider>

  );
}

export default App;
