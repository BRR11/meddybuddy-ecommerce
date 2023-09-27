import React from 'react'
import "../reviewcard/reviewcard.scss"
import StarRateIcon from '@mui/icons-material/StarRate';

function Reviewcard(review) {
  
  return (
    <div className='userreview'>
        <h2>{review.name}</h2>
        <div className='rating'>
                <span>{review.rating}</span><StarRateIcon className='icons'/>
        </div>
        <p>{review.comment}</p>
    </div>
  )
}

export default Reviewcard