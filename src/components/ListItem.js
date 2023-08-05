import React from 'react'
import Note from './Note'

const ListItem = ({obj, key}) => {
  return (
    <div>
      <Note note={obj} key={key}/>
    </div>
  )
}

export default ListItem
