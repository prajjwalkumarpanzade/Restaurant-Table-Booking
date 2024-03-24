import React from 'react';
import logo from './logo.svg';
import '../App.css';
import SignUp from '../pages/signup/container/SignUp';
import SignIn from '../pages/signin/container/SignIn';
import BookTable from '../pages/booktable/container/BookTable';
import AdminDashboard from '../pages/admin_dashboard/container/admindashboard';

function App() {
  return ( 
    <div className="App">
       {/* <SignIn /> */}
       {/* <SignUp/> */}
       {/* <BookTable/> */}
       <AdminDashboard />
    </div>
  );
}

export default App;
