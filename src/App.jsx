//import Routes
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'

//import pages
import Home from './pages/Home';

//import layouts
import RootLayout from './layouts/RootLayout';

const router=createBrowserRouter(
   createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
      </Route>
   )
)

function App(){
    return(
      <RouterProvider router={router}/>
    )
}

export default App;