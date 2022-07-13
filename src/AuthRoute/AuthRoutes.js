import React from "react";
import {
    BrowserRouter as Router,
    Routes, //replaces "Switch" used till v5
    Route,
  } from "react-router-dom";
import CharacterDetail from "../Components/CharacterDetail";
import CharacterList from "../Components/CharacterList";
import FavoriteList from "../Components/FavoriteList";

  const AuthRoutes = () =>{
    return(
      <div className="container">
        <Router>
          <Routes>
              <Route path="/" element={<CharacterList/>}/>
              <Route path="/favoriteList" element={<FavoriteList/>}/>
              <Route path="/characterDetail" element={<CharacterDetail/>}/>
          </Routes>
      </Router>
      </div>
    );
  }

  export default AuthRoutes;