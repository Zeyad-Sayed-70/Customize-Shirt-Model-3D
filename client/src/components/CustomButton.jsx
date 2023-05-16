import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio'

const CustomButton = ({type, title, customStyles, handleClick}) => {
  const snap = useSnapshot(state)
  
  const getStylesByType = (_type) => {
    if ( _type === 'filled' ) {
      return {
        'backgroundColor': snap.color,
        'color': '#fff'
      }
    } else if ( _type === 'outlined' ) {
      return {
        background: 'none',
        borderWidth: '2px',
        borderColor: snap.color,
        borderStyle: 'solid'
      }
    }
  }
  
  return (
    <button
      className={`px-3 py-2 rounded ${customStyles}`}
      style={getStylesByType(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton