import React from 'react';
import FontAwesome from 'react-fontawesome';

const innerContentStyles = {
  editContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    border: '1px solid black',
    position: 'relative',
    padding: '10px',
  },
  actions: {
    position: 'absolute',
    left: '10px',
    top: '-15px',
    display: 'flex',
    alignItems: 'center',
    zIndex: '99',
    fontSize: '16px',
  },
  save: {
    border: '1px solid black',
    color: 'black',
    background: 'white',
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    border: '1px solid black',
    color: 'black',
    background: 'white', // teal
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '4px',
  },
  delete: {
    border: '1px solid black',
    color: 'black',
    background: 'white', // plum
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '4px',
  },
  icon: {
    fontSize: '16px'
  }
}

const fullWidthStyles = {
  ...innerContentStyles,
  editContainer: {
    padding: '0'
  },
  actions: {
    ...innerContentStyles.actions,
    top: '5px'
  }
}

const EditorWrapper = (props) => {
  const styles = props.fullWidth ? fullWidthStyles : innerContentStyles;

  return (
    <div className='edit-container' style={styles.editContainer}>
      {
        props.isEditing &&
        <div className='actions' style={styles.actions}>
          <div className='save-icon' style={styles.save} onClick={props.handleSave}>
            <FontAwesome name='check' style={styles.icon} />
          </div>
        </div>
      }
      {
        !props.isEditing &&
        <div className='actions' style={styles.actions}>
          <div className='edit-icon' style={styles.edit} onClick={props.toggleEditing}>
            <FontAwesome name='pencil' style={styles.icon} />
          </div>
          {
            props.handleDelete &&
            <div className='delete-icon' style={styles.delete} onClick={props.handleDelete}>
              <FontAwesome name='remove' style={styles.icon} />
            </div>
          }
        </div>
      }
      { props.children }
    </div>
  )

}

export default EditorWrapper;