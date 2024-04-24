import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';


const showButton = {
	hidden: {
		opacity: 0,
		y: '80%',
	},
	visible: {
		opacity: 1,
		y: '0%',
		transition: {
			duration: '0.5',
			ease: 'easeInOut',
		},
	},
};
const showIcon = {
	hidden: {
		opacity: 0,
		y: '-80%',
	},
	visible: {
		opacity: 1,
		y: '0%',
		transition: {
			duration: '2',
			ease: 'easeInOut',
		},
	},
};

function Home() {
  return (
    <div className="cover-container justify-content-center d-flex h-100 p-3 mx-auto flex-column" style={{ background: 'hsla(235, 20%, 10%)'}}>
      <div className='row'>
        <motion.div className='bi text-center text-white' style={{ fontSize: '64px' }}
        initial='hidden'
        animate='visible'
        variants={showIcon}>
          <img src="logo_remuzio.png" style={{ width: '10vw' }}alt="music" />
        </motion.div>
        <h1 className='text-white text-center'>Remuz.io App</h1>
        <div className='cover-container text-center '>
          <Link to={"/app"} className="text-white">
              <motion.div className="btn btn-primary fs-3 px-4 mx-2"
              initial='hidden'
              animate='visible'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={showButton}
              style={{ background: 'hsla(255, 50%, 50%)', border: 'none'}}
              >Start</motion.div>
          </Link>
          {/* <Link to={"/about"} className="text-white">
              <motion.div className="btn btn-secondary fs-3 px-4 mx-2"
              initial='hidden'
              animate='visible'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={showButton}
              >About</motion.div>
          </Link> */}
        </div>
        </div>
    </div>
  );
}

export default Home;