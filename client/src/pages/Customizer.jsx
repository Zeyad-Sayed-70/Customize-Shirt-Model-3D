import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from '../config/config'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { CustomButton, AIPicker, ColorPicker, FilePicker, Tab } from '../components'
import { reader } from '../config/helpers'

const Customizer = () => {
  const snap = useSnapshot(state)

  const [file, setFile] = useState('')

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  const generatingContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker 
          dColor={snap.color}
          palettes={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]}
          setActiveEditorTab={setActiveEditorTab}
        />
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case 'aipicker':
        return <AIPicker />
      default:

    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab(prev => {
      return {
        ...prev,
        [tabName]: !activeFilterTab[tabName]
      }
    })
  }
  
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const readFile = (type) => {
    if ( !file ) return alert("you should select a photo first") 
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }


  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
              key="custom"
              className="absolute top-0 left-0 z-10"
              {...slideAnimation('left')}
            >
              <div className="flex items-center min-h-screen">
                <div className="editortabs-container tabs">
                  {EditorTabs.map((tab, ind) => (
                    <Tab 
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                    />
                  ))}

                  {generatingContent()}
                </div>
              </div>
            </motion.div>

            <motion.div
              className='absolute top-5 right-5 z-10'
              {...fadeAnimation}
            >
              <CustomButton 
                type={'filled'}
                title={"Go Back"}
                handleClick={() => state.intro = true}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 z-10 w-full"
              {...slideAnimation('up')}
            >
              <div className="flex justify-center filtertabs-container tabs">
                {FilterTabs.map((tab, ind) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={() => handleActiveFilterTab(tab.name)}
                  />
                ))}
              </div>
            </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer

