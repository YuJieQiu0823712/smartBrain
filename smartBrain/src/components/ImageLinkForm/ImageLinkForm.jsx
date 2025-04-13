import React from 'react'
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5' style={{ width: '700px'}}>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )

}

export default ImageLinkForm
// f3: Font size
// pa2: Padding (top, right, bottom, left) of 2 units
// w-70: Width of 70%
// center: Centers the element
// grow: Adds a grow effect on hover
// link: Removes underline and gives pointer cursor (like <a>)
// ph3: Padding (left, right) of 3 units
// pv2: Padding (top, bottom) of 2 units
// dib: Display inline-block
// white: Text color
// bg-light-purple: Background color (light purple)