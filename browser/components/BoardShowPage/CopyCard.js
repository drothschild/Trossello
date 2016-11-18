import React, { Component } from 'react'
import Link from '../Link'
import Icon from '../Icon'
import Form from '../Form'
import Card from './Card'
import Button from '../Button'
import ToggleComponent from '../ToggleComponent'
import ConfirmationButton from '../ConfirmationButton'
import boardStore from '../../stores/boardStore'
import '../ModalView'
import $ from 'jquery'


export default class CopyCard extends Component {
  static propTypes = {
    card: React.PropTypes.object.isRequired,
    list: React.PropTypes.object.isRequired,
    board: React.PropTypes.object.isRequired,
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
