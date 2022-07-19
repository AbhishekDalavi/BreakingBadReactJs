import {
  BrowserRouter as Router, //replaces "Switch" used till v5
  Route, Routes
} from "react-router-dom";
import CharacterDetail from "../Components/characterDetail/CharacterDetail";
import CharacterList from "../Components/characters/CharacterList";
import FavoriteList from "../Components/characters/FavoriteList";

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