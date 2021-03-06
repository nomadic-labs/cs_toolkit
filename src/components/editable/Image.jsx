import React from 'react'

import Editable from './Editable'
import ImageEditor from '../editingTools/ImageEditor'

const styles = {
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
  }
}


const Image = (props) => {
  const handleSave = content => {
    props.saveChanges(() => props.updateContent(props.sectionIndex, props.index, content))
  }

  return (
    <Editable
      editor={ImageEditor}
      handleSave={handleSave}
      content={{ source: props.source, caption: props.caption }}
      { ...props }
    >
      <div className='img edit-container' style={styles.imageContainer}>
        <img src={props.source} alt={props.caption} style={styles.image} />
        <small>{props.caption}</small>
      </div>
    </Editable>
  );
};

export default Image;