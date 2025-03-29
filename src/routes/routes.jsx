import {  createBrowserRouter ,Route, Routes } from "react-router-dom";
import { Home } from "../containers/Home";
import { Apresentation } from "../containers/Presentation";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Apresentation />,
    },
    {
        path: "/home",
        element: <Home />,
    }
])

