import '../App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return ( 
    <Router>
      <Routes />
      <ToastContainer autoClose={3000} />
  </Router>
  );
}

export default App;
