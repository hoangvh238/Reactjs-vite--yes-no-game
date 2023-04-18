import { Route,Routes } from 'react-router-dom';

import './App.css'
import MainMenu from "@pages/MainMenu/index";
import CreateGame from "@pages/CreateGame/index";
import CreateChoice from "@page/CreateChoice/index";
import Submit from "@page/Submit/index";
import Sumary from "@page/Final/index";

function App() {
  return (
    <div className="App">
     
      <div>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/player-choice" element={<CreateChoice/>} />
        <Route path="/submit" element={<Submit/>} />
        <Route path="/sumary" element={<Sumary/>} />
      </Routes>
    </div>
  </div>
  )
}

export default App
