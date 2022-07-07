import React from 'react';
import './Navbar.scss'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdBuild} from 'react-icons/io'
import { AiOutlineSearch,AiOutlineShoppingCart,AiOutlineHeart,AiOutlineLogin,AiOutlineUserAdd,} from 'react-icons/ai'
import { RiLogoutBoxFill} from 'react-icons/ri'
import { useState } from 'react';
import {MdOutlineAccountCircle} from 'react-icons/md'

import {motion, useAnimation, AnimatePresence} from 'framer-motion'

const Navbar = () => {
    const [navActive, setNavActive] = useState(false);
    const navbarAnimationControls = useAnimation();
    const authSectionAnimationControls = useAnimation();


    const handleHamburgerClick = ()=>{
        if(!navActive){
            if(window.innerWidth > 768){
                navbarAnimationControls.start({width: '18%', transition: {duration: .3}})
            }
            else{
                navbarAnimationControls.start({width: '100%', transition: {duration: .3}})
            }
            authSectionAnimationControls.start({flexDirection: 'row',transition: {duration: .3}})
        }
        else{
            if(window.innerWidth > 768){
            navbarAnimationControls.start({width: '5%', transition: {duration: .3}})
            }
            else{
                navbarAnimationControls.start({width: '15%', transition: {duration: .3}})
                
            }
            authSectionAnimationControls.start({ flexDirection: 'column',transition: {duration: .3}})
        }
            setNavActive(!navActive);

       
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
            <div className="main-nav-section">

            {!navActive &&
            <li className='icon-container icon-container-active'>
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
                exit={{ width: '0%' }} 
                className='search-input' type="text" placeholder='Search Products...'/>
                </AnimatePresence>
                }
            </li>
            }
            <li className='icon-container'><IoMdBuild className='nav-icon'></IoMdBuild>
            {navActive && 
            <AnimatePresence>

                <motion.h3 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }} 
                className='nav-expanded-text'>Build</motion.h3>
            </AnimatePresence>
            }
            </li>
            <li className='icon-container'><AiOutlineShoppingCart className='nav-icon'>
                </AiOutlineShoppingCart>{navActive &&
                <AnimatePresence>

                <motion.h3 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }} 
                className='nav-expanded-text'>Cart</motion.h3>
            </AnimatePresence>
                
                }
                </li>
            <li className='icon-container'><MdOutlineAccountCircle className='nav-icon'></MdOutlineAccountCircle>
            {navActive &&
        <AnimatePresence>
            <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            className='nav-expanded-text'>Profile</motion.h3>
            </AnimatePresence>
            }</li>
            <li className='icon-container'><AiOutlineHeart className='nav-icon'></AiOutlineHeart>
            {navActive &&
            <AnimatePresence>

            <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            className='nav-expanded-text'>Bookmarks</motion.h3>
            </AnimatePresence>

            }
            </li>
            </div>

            <motion.div   initial= {{flexDirection:'column'}} className="auth-nav-section" animate={authSectionAnimationControls}>
            {false && 
                        <li className='icon-container'><RiLogoutBoxFill className='nav-icon'></RiLogoutBoxFill>{navActive &&

                            <AnimatePresence>

                            <motion.h3 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }} 
                            className='nav-expanded-text'>Logout</motion.h3>
                            </AnimatePresence>                        
                        }</li>  }
            {true &&<>
            <li className='icon-container'><AiOutlineLogin className='nav-icon'></AiOutlineLogin>{navActive &&
             <AnimatePresence>

             <motion.h3 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }} 
             className='nav-expanded-text'>Login</motion.h3>
             </AnimatePresence>
            }</li>
            <li className='icon-container '><AiOutlineUserAdd className='nav-icon'></AiOutlineUserAdd>{navActive &&
             <AnimatePresence>

             <motion.h3 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }} 
             className='nav-expanded-text'>Signup</motion.h3>
             </AnimatePresence>
            }</li></>
            }
            </motion.div>

    </motion.ul>
    </>
    );
}

export default Navbar;
