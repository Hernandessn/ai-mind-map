import {  createBrowserRouter ,Route, Routes } from "react-router-dom";
import { Home } from "../containers/Home";
import { Presentation } from "../containers/Presentation";
import { AboutPage } from "../containers/About";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Presentation />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: '/about',
        element: <AboutPage /> 
    }
])

