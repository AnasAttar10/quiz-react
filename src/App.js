import React from 'react'
import {Route, Routes,} from 'react-router-dom';
import "./App.css" ;
import Header from "./Components/Header/Header";
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Quiz from './Components/Quiz/Quiz';
import { useState } from "react";


export default function App() {

  const [category , setCategory] = useState('');
  const [difficulty , setDifficulty] = useState('');
  const [name , setName] = useState('');

  function Select_Data_From_Home_Comp (username,category,difficulty){
    setCategory(category) ; 
    setDifficulty(difficulty) ;
    setName(username) ;
  }
  return (
    <>

<div className="app" style={{ backgroundImage: 'url("/ques1.png")'  }}>

<Header />

<Routes>

<Route path='/' element ={<Home Select_Data_From_Home_Comp={Select_Data_From_Home_Comp}/>} />
< Route path="quiz" element={<Quiz  name={name} category={category} difficulty={difficulty} />}  />

</Routes>

 </div>
<Footer />


    </>
  )
}

