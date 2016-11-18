import React, { Component } from 'react'
import Link from '../Link'
import Icon from '../Icon'
import Form from '../Form'
import Card from './Card'
import Button from '../Button'
import ToggleComponent from '../ToggleComponent'
import ConfirmationButton from '../ConfirmationButton'
import boardStore from '../../stores/boardStore'
import DialogBox from '../DialogBox'
import $ from 'jquery'


export default class CopyCard extends Component {
  static propTypes = {
    card: React.PropTypes.object.isRequired,
    list: React.PropTypes.object.isRequired,
    board: React.PropTypes.object.isRequired,
    top: React.PropTypes.integer.isRequired,
    left: React.PropTypes.integer.isRequired,
  }
  constructor(props){
    super(props)
    this.state = {
      editingDescription: false,
      editingName: false,
    }
  }

  render() {

    return <DialogBox />
  }
}

class ListsMenu extends Component {
  static propTypes = {
    list: React.PropTypes.object.isRequired,
    board: React.PropTypes.object.isRequired,
  }

  render() {
    const lists = board.lists
    .filter(list => !list.archived)
    .map( list => {
         <option value={list.id}>{list.name}</option>
       }).toString()
    return 
      <select className="CopyCard-list">
        {lists}
      </select>
  }
}
