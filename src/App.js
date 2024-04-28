import React, { useState, useEffect } from 'react';
import Map from './views/Page/Map';
import './styles/Main.scss';
import Header from './views/Page/Header';
import Menu from './views/Page/Menu';
import Dashboard from './views/Page/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { changeCountry, changeISO3 } from './store';
import { africa_shape } from './views/Graphs/africa';


function App() {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const africaMap = africa_shape.features.map((feature) => feature.properties.admin);
  const handleCountryChange = (selectedCountry, selectedISO3) => {
    dispatch(changeCountry(selectedCountry))
    dispatch(changeISO3(selectedISO3))
  };
  
  useEffect(() => {

  }, [country]);

  return (
    <div className="app">
      <header className='app__header'>
        <Header />
      </header>
      <main className='app__content'>
        <nav className='app__menu'>
          <Menu />
        </nav>
        <main className='app__dashboard'>
          <Dashboard country={country.id} iso3={country.iso3}/>
        </main>
        <main className='app__map'>
          <Map africaMap={africaMap} onClick={handleCountryChange} />
        </main>
      </main>
    </div>
  );
}

export default App;
