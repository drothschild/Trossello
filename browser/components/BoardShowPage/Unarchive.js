import React, { Component } from 'react'
import boardStore from '../../stores/boardStore'
import $ from 'jquery'
import Card from './Card'
import Link from '../Link'

export default class Unarchive extends Component {
  static PropTypes = {
    board: React.PropTypes.object.isRequired
  }
  render(){
    const { board } = this.props
    const cards = board.cards
      .filter(card => card.archived)
      .sort((a, b) => a.order - b.order)
  
    const lists = board.lists
      .filter(list => list.archived)
      .sort((a, b) => a.board_id - b.board_id)
    const cardNodes = cards.map((card, index) =>
      <Card
        key={card.id}
        card={card}
        index={index}
      />      
    )

    return (
      cardNodes
      ) 
  }
}

class ArchivedCard extends Component {
  static PropTypes = {
    card: React.PropTypes.object.isRequired
  }

}

class ArchivedCardAction extends Component {
  static propTypes = {
    card: React.PropTypes.object.isRequired,
    onArchive: React.PropTypes.func.isRequired,
  }
  constructor(props){
    super(props)
    this.archiveCard = this.archiveCard.bind(this)
  }
  unArchiveCard(){
    $.ajax({
      method: "POST",
      url: `/api/cards/${this.props.card.id}/unarchive`
    }).then(() => {
      boardStore.reload()
    })
  }
  deleteCard(){
    $.ajax({
      method: "POST",
      url: `/api/cards/${this.props.card.id}/delete`
    }).then(() => {
      boardStore.reload()
    })
  }
  render(){
    return <div className= "acti">
    <Link onClick={this.unArchiveCard}>"Send to Board"</Link>
    <Link onClick={this.delete}>"Delete"</Link>
    </div>
  }
}
