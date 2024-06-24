
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import PlacesScreen from "./screens/placesScreen";
import BlogsScreen from "./screens/blogsScreen";
import NavBar from "./components/navBar/navBar";
import LoginScreen from './screens/loginScreen';
import AddPlaceScreen from './screens/addPlaceScreen';
import EditPlaceScreen from './screens/editPlaceScreen';
import PlaceSearchResultScreen from './screens/placeSearchResultScreen';
import BlogSearchResultScreen from './screens/blogSearchResultScreen';
import DeleteBlogScreen from './screens/deleteBlogScreen';

function App() {
  const location = useLocation();

  const shouldDisplayNavBar = location.pathname !== '/';

  return (

    <div className="App">
      {shouldDisplayNavBar && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/places" element={<PlacesScreen />} />
          <Route path="/blogs" element={<BlogsScreen />} />
          <Route path='/places/add' element={<AddPlaceScreen />} />
          <Route path='/places/edit' element={<EditPlaceScreen />} />
          <Route path='/blogs/delete' element={<DeleteBlogScreen />} />
          <Route path='/placesearch' element={<PlaceSearchResultScreen/>}/>
          <Route path='/blogsearch' element={<BlogSearchResultScreen/>}/>
        </Routes>
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;