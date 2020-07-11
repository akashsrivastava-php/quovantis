import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import View from './View'
import List from './List'
import Login from './Login'
import { isloggedIn } from './utils'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

toast.configure()

function App() {
  return (
    <>
      <Router>
		<Switch>
			<Route exact path="/" render={(props)=>{
				return isloggedIn() ? <Redirect to={{pathname: "/dashboard"}}/> : <Login {...props} />
			}}/>
			<Route path="/dashboard" render={(props)=>{
				return isloggedIn() ? <List {...props} /> : <Redirect to={{
					pathname: "/",
				}}/>
			}}/>
			<Route path="/user/:id" render={(props)=>{
				return isloggedIn() ? <View {...props} /> : <Redirect to={{
					pathname: "/",
				}}/>
			}}/>
		</Switch>
	</Router>
    </>
  );
}

export default App;
