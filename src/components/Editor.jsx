import React, { useRef, useState } from 'react'
import "./editor.css";
import { UnControlled as CodeMirror } from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { FiMaximize2,FiMinimize2 } from "react-icons/fi";


export default function Editor({ title, value, language, setValue }) {
  const [open, setOpen] = useState(true)


  // let options = {
  //   lineWrapping: true,
  //   lint: true,
  //   mode: language,
  //   lineNumber: true,
  //   theme: "material"
  // }

  const handleChange = (editor, data, value_) => {
    setValue(value_)
  }

  const editor = useRef()
  const wrapper = useRef()
  const editorWillUnmount = () => {
    editor.current.display.wrapper.remove()
    wrapper.current.hydrated = false
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {title}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
         {open ?  <FiMinimize2 className='icon' />:<FiMaximize2 className='icon' /> } 
        </button>
      </div>

    
        <CodeMirror
          ref={wrapper}
          //  onBeforeChange={handleChange}
          value={value ?? ""}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: 'material',
            lineNumbers: true
          }}
          onChange={ handleChange}
          editorDidMount={(e) => editor.current = e}
          editorWillUnmount={editorWillUnmount}
        />
    </div>
  )
}
