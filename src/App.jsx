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

function App() {

  const location = useLocation();

  return (
   <div className='main-container'>
    <div className='bg-image'></div>
    <Navbar/>
    <div className='page-container'>

     <AnimatePresence> 

        <Switch location={location} key={location.key}>

          <Route  path='/login'>
            <Login/>
          </Route>

          <Route  path='/signup'>
            <Signup/>
          </Route>

          <Route  path='/bookmarks'>
            <Bookmarks/>
          </Route>

          <Route  path='/build'>
            <Build/>
          </Route>

          <Route  path='/cart'>
            <Cart/>
          </Route>
          <Route  path='/profile'>
            <Profile/>
          </Route>

        </Switch>
      </AnimatePresence>
      </div>
    </div>
    
  );
}

export default App;
