import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import Home from './pages/home/home';
import "./css/fonts.css"
import "./css/main.css"
import "./css/main_ar.css"
import { RootState } from './store';
import { useSelector } from 'react-redux';
import Location from './pages/location/location';
import Event from './pages/event/event';
import Category from './pages/category/category';
import Service from './pages/service/service';
import Search from './pages/search/search';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const lang = useSelector((state: RootState) => state.settings.lang);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000);
  }, [lang]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/location/:id"
          element={
            <>
              <Location />
            </>
          }
        />
        <Route
          path="/event/:id"
          element={
            <>
              <Event />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <Search />
            </>
          }
        />
        <Route
          path="/service/:id"
          element={
            <>
              <Service />
            </>
          }
        />
        <Route
          path="/categories/:id?"
          element={
            <>
              <Category />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
