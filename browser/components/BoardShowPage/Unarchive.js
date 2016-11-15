import React, { Component } from 'react'
import boardStore from '../../stores/boardStore'
import $ from 'jquery'

export default class Unarchive extends Component {
  static PropTypes = {
    board: React.PropTypes.object.isRequired
  }
  render(){
    const { board } = this.props
    const cards = board.cards
      .filter(card => card.archived)
      .sort((a, b) => a.order - b.order)
  }
}