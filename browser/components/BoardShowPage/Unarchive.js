import React, { Component } from 'react'
import boardStore from '../../stores/boardStore'
import $ from 'jquery'
import Card from './Card'
import Link from '../Link'
import ConfirmationLink from '../ConfirmationLink'


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
      <div key={card.id}>
        <Card
          key={card.id}
          card={card}
          index={index}
        />
        <ArchivedCardActions card={card} />
      </div>
    )

    return (<div className="cardsList">
      {cardNodes}
    </div>
  )
  }
}

class ArchivedCardActions extends Component {
  static propTypes = {
    card: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.unArchiveCard = this.unArchiveCard.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
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
    return <div className= "archivedCardActions">
    <Link onClick={this.unArchiveCard}>"Send to Board"</Link>

    <ConfirmationLink
      onConfirm={this.deleteCard}
      buttonName="Delete"
      title='Delete Card?'
      message='All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.'
    >Delete</ConfirmationLink>
    </div>
  }
}
