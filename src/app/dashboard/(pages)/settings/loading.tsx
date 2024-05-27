import React from 'react'
import "../../../globals.css";
import Image from 'next/image';

type Props = {}

const loading = (props: Props) => {
  return (
    <div className='container'>
          <Image 
            src='/loading.png' 
            width={30}
            height={30}
            alt="Loading"
          />
        </div>
    
  )
}

export default loading