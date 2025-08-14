import React, {useState} from 'react'
import { Welcome } from '@/components/Welcome';
import { Features } from '@/components/Features';
import Exams from '@/components/Exams';
import { FAQs } from '@/components/FAQs';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <div>
        <Welcome />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="exams">
        <Exams />
      </div>
      <div id="faq">
        <FAQs />
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}

export default App