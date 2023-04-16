import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export default function ContentContext() {
const {state}= useLocation()
const name = state.name
  return (
    <>
    <div className='name'>
        <p className='title'>{name}</p>
        {/* <p className='fr weather'>天气</p> */}
    </div>
    <br />
    <div className='display'>
      <Outlet></Outlet>
    </div>
    </>
  )
}
