import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
        return (
        <nav style={{display:'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
        )
    } else {
        return (
            <nav style={{display:'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
            )
    }
    
} 

export default Navigation

// f3: Font size
// link: Removes underline and gives pointer cursor (like <a>)
// dim: Adds a slight dim effect on hover
// black: Text color
// underline: Underline text
// pa3: Padding (top, right, bottom, left) of 3 units
// pointer: Changes cursor to pointer on hover