import {  createBrowserRouter ,Route, Routes } from "react-router-dom";
import { Home } from "../containers/Home";
import { Presentation } from "../containers/Presentation";
import { TestPage } from "../containers/Test";



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
        path: '/test',
        element: <TestPage /> 
    }
])

