import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state)
  const activeStyles = isFilterTab && isActiveTab 
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div 
      className='cursor-pointer'
      style={activeStyles}
      onClick={handleClick}
    >
      <img 
        src={tab.icon}
        alt={tab.title}
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'} mx-auto`}
      />
    </div>
  )
}

export default Tab