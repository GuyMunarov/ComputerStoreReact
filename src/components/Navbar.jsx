import React from 'react';
import './Navbar.scss'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdBuild} from 'react-icons/io'
import { AiOutlineSearch,AiOutlineShoppingCart,AiOutlineHeart,AiOutlineLogin,AiOutlineUserAdd,} from 'react-icons/ai'
import { RiLogoutBoxFill} from 'react-icons/ri'
import { useState ,useEffect,useContext} from 'react';

import {MdOutlineAccountCircle,MdComputer} from 'react-icons/md'

import {motion, useAnimation, AnimatePresence} from 'framer-motion/dist/framer-motion'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'


const Navbar = () => {
    const [navActive, setNavActive] = useState(false);
    const [search, setSearch] = useState(null);
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const [searchRef, setSearchRef] = useState(null)
    const {user,dispatch} = useContext(AuthContext)

    const navbarAnimationControls = useAnimation();
    const authSectionAnimationControls = useAnimation();
    

    const logoutClicked = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }

    useEffect(() => {
        setSearchRef(React.createRef());
        
    }, []);


    useEffect(()=> {
        if(search){
            setIsSearchFocus(true)
        }
        else{
        setIsSearchFocus(false)
        }
    },[search])

    const handleHamburgerClick = async ()=>{
            handleWindowSize();
            setNavActive(!navActive);

       
    }

    const handleWindowSize = async() => {
        if(!navActive){
            if(window.innerWidth > 768){
                navbarAnimationControls.start({width: '18%', transition: {duration: .3}})
            }
            else{
                navbarAnimationControls.start({width: '100%', transition: {duration: .3}, position: 'absolute'})
            }
            authSectionAnimationControls.start({flexDirection: 'row',transition: {duration: .3}})
        }
        else{
            if(window.innerWidth > 768){
            navbarAnimationControls.start({width: '5%', transition: {duration: .3}})
            }
            else{
                navbarAnimationControls.start({width: '15%', transition: {duration: .3},position: 'sticky'})
                
            }
            authSectionAnimationControls.start({ flexDirection: 'column',transition: {duration: .3}})
        }
    }






    window.addEventListener('resize',async ()=>{

        if(!navActive){
            if(window.innerWidth > 768){
                navbarAnimationControls.start({width: '5%', transition: {duration: .3}})
            }
            else{
                navbarAnimationControls.start({width: '15%', transition: {duration: .3},position: 'sticky'})
            }
        }
        else{
            if(window.innerWidth > 768){
                navbarAnimationControls.start({width: '18%', transition: {duration: .3}})
            }
            else{
                navbarAnimationControls.start({width: '100%', transition: {duration: .3}, position: 'absolute'})
            }
        }
        
    })
   
    
    const handleSearchClicked = async () => {
        if(!navActive){
        await handleHamburgerClick();
        searchRef.current.focus()
    }
}

    return (
        <>

        <motion.ul  
         animate={navbarAnimationControls}
         initial= {{width:window.innerWidth > 768 ? '5%': '15%'}}
        className={`navbar ${navActive? 'active': ''}`}>
            
            <li className='icon-container title-container'>

                {navActive && 
                <AnimatePresence>
                <motion.h2 
                 initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }} 
                  className='nav-title'>GComputers</motion.h2>
                </AnimatePresence>

                }<span onClick={handleHamburgerClick} className='hamburger-icon'><GiHamburgerMenu className='nav-icon'></GiHamburgerMenu> </span>
            </li>
            {user && 
            <div className="main-nav-section">

            {!navActive &&
            <li onClick={() => handleSearchClicked()} className='icon-container icon-container-active'>
                <AiOutlineSearch  className='nav-icon '></AiOutlineSearch>
                </li>
            }

            {navActive &&
            <li className='container-search'>
                <AiOutlineSearch  className='nav-icon'></AiOutlineSearch>
                {navActive &&
                 <AnimatePresence>
                <motion.input 
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                ref={searchRef} 
                exit={{ width: '0%' }} 
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className={`search-input ${isSearchFocus? 'focused': ''}`} type="text" placeholder='Search Products...'/>
                </AnimatePresence>
                }
            </li>
            }
            <NavLink to='/' exact>
                        <li className='icon-container'><MdComputer className='nav-icon'></MdComputer>{navActive &&
                        <AnimatePresence>
                        <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} 
                        className='nav-expanded-text'>Products</motion.h3>
                        </AnimatePresence>
                        }</li>
                </NavLink>

            <NavLink to='/build' exact>
                        <li className='icon-container'><IoMdBuild className='nav-icon'></IoMdBuild>{navActive &&
                        <AnimatePresence>
                        <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} 
                        className='nav-expanded-text'>Build</motion.h3>
                        </AnimatePresence>
                        }</li>
                </NavLink>
            <NavLink to='/cart' exact>
                        <li className='icon-container'><AiOutlineShoppingCart className='nav-icon'></AiOutlineShoppingCart>{navActive &&
                        <AnimatePresence>
                        <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} 
                        className='nav-expanded-text'>Cart</motion.h3>
                        </AnimatePresence>
                        }</li>
                </NavLink>
                <NavLink to='/profile' exact>
                        <li className='icon-container'><MdOutlineAccountCircle className='nav-icon'></MdOutlineAccountCircle>{navActive &&
                        <AnimatePresence>
                        <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} 
                        className='nav-expanded-text'>Profile</motion.h3>
                        </AnimatePresence>
                        }</li>
                </NavLink>
             <NavLink to='/bookmarks' exact>
                        <li className='icon-container'><AiOutlineHeart className='nav-icon'></AiOutlineHeart>{navActive &&
                        <AnimatePresence>
                        <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} 
                        className='nav-expanded-text'>Bookmarks</motion.h3>
                        </AnimatePresence>
                        }</li>
                </NavLink>
            </div>
            }
            <motion.div   initial= {{flexDirection:'column'}} className="auth-nav-section" animate={authSectionAnimationControls}>
            {user && 
                        <li onClick={logoutClicked} className='icon-container'><RiLogoutBoxFill className='nav-icon'></RiLogoutBoxFill>{navActive &&

                            <AnimatePresence>
                            
                            <motion.h3 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }} 
                            className='nav-expanded-text'>{user.fullName}</motion.h3>

                            <motion.h3 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }} 
                            className='nav-expanded-text'>Logout</motion.h3>
                            </AnimatePresence>                        
                        }</li>  }
            {!user &&<>
                    <NavLink to='/login' exact>
                        <li className='icon-container'><AiOutlineLogin className='nav-icon'></AiOutlineLogin>{navActive &&
                        <AnimatePresence>
                        <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} 
                        className='nav-expanded-text'>Login</motion.h3>
                        </AnimatePresence>
                        }</li>
                    </NavLink>

                    <NavLink to='/signup' exact>
                        <li className='icon-container'><AiOutlineUserAdd className='nav-icon'></AiOutlineUserAdd>{navActive &&
                        <AnimatePresence>
                        <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} 
                        className='nav-expanded-text'>Signup</motion.h3>
                        </AnimatePresence>
                        }</li>
                    </NavLink></>
            }
            </motion.div>
            
    </motion.ul>
    </>
    );
}

export default Navbar;
