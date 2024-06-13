import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'

import { MantineProvider } from '@mantine/core'; 
import '@mantine/carousel/styles.css';

import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])


// const routes =
//     createRoutesFromElements(
//       <Route path="/" element={<App />}>
//         <Route path="/" element={<Home />} loading />
//         <Route
//           path="/login"
//           element={
//             <AuthLayout authentication={false}>
//               <Login />
//             </AuthLayout>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <AuthLayout authentication={false}>
//               <Signup />
//             </AuthLayout>
//           }
//           loading
//         />
//         <Route
//           path="/all-posts"
//           element={
//             <AuthLayout authentication>
//               <AllPosts />
//             </AuthLayout>
//           }
//           loading
//         />
//         <Route
//           path="/add-post"
//           element={
//             <AuthLayout authentication>
//               <AddPost />
//             </AuthLayout>
//           }
//           loading
//         />
//         <Route
//           path="/edit-post/:slug"
//           element={
//             <AuthLayout authentication>
//               <EditPost />
//             </AuthLayout>
//           }
//           loading
//         />
//         <Route path="/post/:slug" element={<Post />} loading />
//       </Route>
//  )



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
