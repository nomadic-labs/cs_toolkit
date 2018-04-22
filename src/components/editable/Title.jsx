import React from 'react'

import Editable from './Editable';
import PlainTextEditor from '../editingTools/PlainTextEditor'


const Title = (props) => {
  const handleSave = (newContent) => {
    props.updateTitle(newContent.text)
  }

  return (
    <h1>
      <Editable
        editor={PlainTextEditor}
        handleSave={handleSave}
        content={{ text: props.text }}
        { ...props }
      >
        { props.text }
      </Editable>
    </h1>
  )
};

export default Title;