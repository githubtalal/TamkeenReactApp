import React, { useEffect, useRef } from 'react'
import oops from './assets/oops!.png'
import errorCode1 from './assets/errorCode1.png'
import errorCode2 from './assets/errorCode2.png'
import errorCode3 from './assets/errorCode3.png'
import { useLocation } from 'react-router-dom'

const Page404 = () => {
  return (
      <div className='error py-4'>
        <center>
          <img src={oops} alt="" />
          <p className='mt-2'>Oops! page not found</p>
          <div className="d-flex align-items-center mt-2 justify-content-center">
            <img src={errorCode1} alt="" /><img src={errorCode2} alt="" /><img src={errorCode3} alt="" />
          </div>
          <a href="/" className='py-2 mt-4 border-0 d-block w-25'>Go Back</a>
        </center>
      </div>
  )
}

export default Page404