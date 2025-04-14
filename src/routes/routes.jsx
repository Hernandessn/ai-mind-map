// src/routes.jsx ou onde você define suas rotas
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { Home } from '../containers/Home';
import { MindMapView } from '../containers/MindMapView';
import { Presentation } from '../containers/Presentation';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Presentation />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mindmap-view" element={<MindMapView />} />
      </Routes>
    </BrowserRouter>
  );
}