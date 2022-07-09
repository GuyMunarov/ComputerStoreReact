import './App.scss';
import Navbar from './components/Navbar'
import {Route,Redirect,Switch, useLocation} from 'react-router-dom'
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Bookmarks from './pages/Bookmarks/Bookmarks'
import Build from './pages/Build/Build';

import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';

import { AnimatePresence } from 'framer-motion/dist/framer-motion';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Products from './pages/Products/Products';

function App() {

  const location = useLocation();
  const {user,authIsReady} = useContext(AuthContext);
  return (
   
   <div className='main-container'>
    <div className='bg-image'></div>
    {authIsReady&&(<>
        <Navbar/>
    <div className='page-container'>

     <AnimatePresence> 

        <Switch location={location} key={location.key}>

          <Route  path='/login'>
          {!user && <Login/>}
          {user && <Redirect to='/'/>}
          </Route>

          <Route  path='/signup'>
          {!user && <Signup/>}
          {user && <Redirect to='/'/>}
          </Route>

          <Route  path='/bookmarks'>
          {user && <Bookmarks/>}
          {!user && <Redirect to='/login'/>}
          </Route>

          <Route exact path='/build'>
          {user && <Build/>}
          {!user && <Redirect to='/login'/>}
          </Route>

          <Route exact path='/'>
          {user && <Products/>}
          {!user && <Redirect to='/login'/>}
          </Route>

          <Route  path='/cart'>
          {user && <Cart/>}
          {!user && <Redirect to='/login'/>}
          </Route>
          <Route  path='/profile'>
          {user && <Profile/>}
          {!user && <Redirect to='/login'/>}
          </Route>

        </Switch>
      </AnimatePresence>
      </div>
      </>
  )}
      </div>
    
  );
}

export default App;
