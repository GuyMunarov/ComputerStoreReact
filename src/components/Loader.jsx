import React from 'react'
import {motion} from 'framer-motion/dist/framer-motion'
import './Loader.scss';

const loaderVariants = {
    animationOne: {
        x: [-10,10],
        y: [0,-10],
        transition: {
            x: {
                yoyo: Infinity,
                duration: 0.5
            },
            y: {
                yoyo: Infinity,
                duration: 0.25
            }
        }
    }
}

export default function Loader() {
  return (
    <>
    <motion.div 
    variants={loaderVariants} animate='animationOne'
     className='buttonLoader'>
    </motion.div>
    </>
  )
}
