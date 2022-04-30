import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import {CardReducerState} from "./types/types";
import PopUpCard from "./components/PopUpCard";
import {useSelector} from "react-redux";

function App() {

  const currentCard = useSelector((state: CardReducerState) => state.cardReducer.currentCard)

  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='todo-react-redux/' element={<Home/>}/>
          <Route path='todo-react-redux/about' element={<About/>}/>
          <Route path={`todo-react-redux/popup/:${currentCard?.id}`} element={<PopUpCard/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
