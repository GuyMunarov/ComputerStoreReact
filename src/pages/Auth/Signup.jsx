import React, { createRef } from 'react'
import './Signup.scss'
import {motion, useAnimation, AnimatePresence} from 'framer-motion/dist/framer-motion'
import {AiOutlineMail} from 'react-icons/ai'
import {MdOutlineAccountCircle} from 'react-icons/md'
import {RiLockPasswordLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import {validatePassword, validateEmail} from '../../utils/Validations'
import { useFetch } from '../../hooks/useFetch'
import Loader from '../../components/Loader'

export default function Signup() {


  const [fullName, setFullName] = useState('');
  const [fullNameTouched, setFullNameTouched] = useState(false);

  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  const {error, isPending, postData, data} = useFetch('http://localhost:5001/users/signup','POST')

  const handleFormSubmit = (e) => {
    e.preventDefault()
     postData({fullName,email,password})
  }

  useEffect(() => {
    console.log(data,error,isPending);
  }, [data])

  const isFormValid = (e) =>{
    return validatePassword(password) && validateEmail(email) && fullName
  }

    return (
        <motion.div           
            exit={{ opacity: 0 }}  
            className='signup' >
            
            <form onSubmit={(e) => handleFormSubmit(e)} className='signup-form'> 

             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} 
             className="headings-container">
              <h1>Create your account</h1>
              <span>And build your dream computer now</span>
              </motion.div>

              <div className="form-inputs-container">

              <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              exit={{ opacity: 0 }}
              className="input-icon-group">
              <input 
              className={` ${(!fullName && fullNameTouched) && 'red-input'}`}
              required type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              onBlur= {e => setFullNameTouched(true)}
               placeholder='Full Name'
              />

              {(!fullName && fullNameTouched) && <div className='error'>please provide your name</div>}
              <MdOutlineAccountCircle className={`form-icon ${(!fullName && fullNameTouched) && 'red-icon'}`}/>
              </motion.div>

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
             {(!validatePassword(password) && passwordTouched) && <div className='error'>please provide a correct password (minimum eight characters,at least one special character)</div>}
              <RiLockPasswordLine className={`form-icon ${(!validatePassword(password) && passwordTouched) && 'red-icon'}`}/>
              </motion.div>

              </div>
              <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
              className="form-button-container">
              {error && <div className='server-error'>something went wrong</div>}

              <button 
               disabled = {!isFormValid() || isPending} 
              className={`signup-btn ${isPending && 'colored-disabled'}`}>{!isPending ? 'Create My Account':<Loader/>}</button>
                <span >already have an account? <Link  exact to='/login' className='little-link'>sign in</Link></span>
              </motion.div>
              </form>
              
            <div className='svg-signup-container'>
            </div>
            </motion.div>
    )
}
