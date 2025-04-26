import React from 'react'


const Rank = ({name, entries}) => {
    // console.log(entries)
    return (
        <div>
            <div className='white f3'>
                {`${name}, your current entry count is ...`}
            </div>
            <div className='white f1'>
                {/* {'#5'} */}
                {entries}
            </div>
        </div>
    )
}

export default Rank