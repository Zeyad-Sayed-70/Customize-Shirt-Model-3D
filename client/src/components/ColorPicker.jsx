import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'
import CustomButton from './CustomButton'

const ColorPicker = ({ setActiveEditorTab }) => {
  const snap = useSnapshot(state)
  return (
    <div className='colorpicker-container bg-gray-200 p-2 absolute left-full ml-3'>
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => state.color = color.hex}
      />
      <CustomButton 
        title={'Close'}
        type={'outlined'}
        handleClick={() => setActiveEditorTab('')}
        customStyles={'rounded  py-1 text-xs w-fit'}
      />
    </div>
  )
}

export default ColorPicker