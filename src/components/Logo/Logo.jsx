import React from 'react'
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import brain from './brain.png'

const Logo =() => {
    return (
        <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" style={{ width: '150px', height: '150px'}}>
            <div>
                <img style={{paddingTop:'10px', width:'130px', height:'130px'}} src={brain} />
            </div>
        </Tilt>
        </div>
    )
}

export default Logo
// ma4: Margin (top, right, bottom, left) of 4 units
// mt0: Margin top of 0 units
