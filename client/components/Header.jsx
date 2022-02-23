import React from 'react'
import { Link } from 'react-router-dom'
import { PhotoPlaceholder } from 'react-placeholder-image'

// Create header component with logo, navlinks and New post button #4
// Logo, Top, Jobs, Code, Events, New post 

function Header () {


    return (
        <>
        <div>
            <PhotoPlaceholder width={200} height={200} />
        <h1>Rōpū</h1>
        </div>
        <nav>
            <Link to='/'>Top</Link>
            <Link to='/jobs'>Jobs</Link>
            <Link to='/code'>Code</Link>
            <Link to='/events'>Events</Link>
        </nav>
        <button>New Post</button>
        </>
    )
}

export default Header






// function Header () {
//   return (
//     <>
//       <nav className='nav'>
//         <Link to='/'>Shop</Link>
//         <Link to='/cart'>Cart</Link>
//         <Link to='/orders'>My Orders</Link>
//       </nav>
//       <h1>
//         <span className='fa fa-leaf' aria-hidden='true' />
//         {' '}Sweet As Organics{' '}
//         <span className='fa fa-leaf' aria-hidden='true' />
//       </h1>
//     </>
//   )
// }

// export default Header

