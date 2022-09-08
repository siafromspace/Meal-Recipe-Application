import './App.css';
import AppContextProvider from './context';
import Search from './components/Search';
import Meals from './components/Meals';
import Favorites from './components/Favorites';
import Modal from './components/Modal';

function App() {
  return (
    <AppContextProvider>
      <Search />
      <Favorites />
      <Meals />
      <Modal />
    </AppContextProvider>
  );
}

export default App;
