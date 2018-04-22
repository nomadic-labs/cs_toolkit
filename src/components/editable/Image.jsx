import React from 'react'

import Editable from './Editable'
import ImageEditor from '../editingTools/ImageEditor'


const Image = (props) => {
  const handleSave = content => {
    props.updateContent(props.sectionIndex, props.index, content)
  }

  return (
    <Editable
      editor={ImageEditor}
      handleSave={handleSave}
      content={{ source: props.source, caption: props.caption }}
      { ...props }
    >
      <div className='img edit-container'>
        <img src={props.source} alt={props.caption} />
        <small>{props.caption}</small>
      </div>
    </Editable>
  );
};

export default Image;