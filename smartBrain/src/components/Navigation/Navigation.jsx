import React from 'react'

const Navigation = () => {
    return (
        <nav style={{display:'flex', justifyContent: 'flex-end'}}>
        <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
    )
} 

export default Navigation
// f3: Font size
// link: Removes underline and gives pointer cursor (like <a>)
// dim: Adds a slight dim effect on hover
// black: Text color
// underline: Underline text
// pa3: Padding (top, right, bottom, left) of 3 units
// pointer: Changes cursor to pointer on hover