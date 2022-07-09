import React, { createRef } from 'react'
import './Login.scss'
import {motion, useAnimation, AnimatePresence} from 'framer-motion/dist/framer-motion'
import {AiOutlineMail} from 'react-icons/ai'
import {MdOutlineAccountCircle} from 'react-icons/md'
import {RiLockPasswordLine} from 'react-icons/ri'
import { Link, useHistory } from 'react-router-dom'
import { useState, useRef, useEffect,useContext } from 'react'
import {validatePassword, validateEmail} from '../../utils/Validations'
import { useFetch } from '../../hooks/useFetch'
import Loader from '../../components/Loader'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'


export default function Login() {



  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [isPending,setIsPending] = useState(false)
  const [error,setError] = useState('')
  const history = useHistory();

  const {dispatch} = useContext(AuthContext)

  const handleFormSubmit = async(e) => {
    e.preventDefault()
    setIsPending(true);
    setError('')
    try{
    const res = await axios.post('https://localhost:7009/api/users/login',{email,password})
    localStorage.setItem('user',JSON.stringify(res.data));
    dispatch({type: 'LOGIN',payload: res.data})
    history.push('/')
    }
    catch(err){
      console.log(err);
      setError(err.message)
    }
    setIsPending(false)
  }




  const isFormValid = (e) =>{
    return validatePassword(password) && validateEmail(email)
  }

    return (
        <motion.div           
            exit={{ opacity: 0 }}  
            className='login' >
            
            <form onSubmit={handleFormSubmit} className='login-form'> 

             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} 
             className="headings-container">
              <h1>Log in to your account</h1>
              <span>And pick up where you left off</span>
              </motion.div>

              <div className="form-inputs-container">

            

              <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              exit={{ opacity: 0 }}
              className="input-icon-group">
              <input required type="email" 
              className={` ${(!validateEmail(email)  && emailTouched) && 'red-input'}`}
              onChange={e => setEmail(e.target.value)}
              onBlur= {e => setEmailTouched(true)}
              value={email}
              placeholder='Email'/>
               {(!validateEmail(email)  && emailTouched) && <div className='error'>please provide a correct email</div>}

              <AiOutlineMail className={`form-icon ${(!validateEmail(email)  && emailTouched) && 'red-icon'}`}/>
              </motion.div>
              
             
              <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              exit={{ opacity: 0 }}
              className="input-icon-group">
              <input  required type="password" placeholder='Password'
              className={` ${(!validatePassword(password) && passwordTouched) && 'red-input'}`}
              onChange={e => setPassword(e.target.value)}
              onBlur= {e => setPasswordTouched(true)}
              value={password}
              
              />
             {(!validatePassword(password) && passwordTouched) && <div className='error'>please provide a correct password (minimum eight characters,at least one number)</div>}
              <RiLockPasswordLine className={`form-icon ${(!validatePassword(password) && passwordTouched) && 'red-icon'}`}/>
              </motion.div>

              </div>
              <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
              className="form-button-container">
              {error && <div className='server-error'>{error}</div>}

              <button 
               disabled = {!isFormValid() || isPending} 
              className={`signup-btn ${isPending && 'colored-disabled'}`}>{!isPending ? 'Login':<Loader/>}</button>
                <span >dont have an account? <Link  exact to='/signup' className='little-link'>sign up</Link></span>
              </motion.div>
              </form>
              
            <div className='svg-signup-container'>
            </div>
            </motion.div>
    )
}
