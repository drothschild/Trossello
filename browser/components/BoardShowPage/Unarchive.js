import React, { Component } from 'react'
import boardStore from '../../stores/boardStore'
import $ from 'jquery'
import Form from '../Form'
import Card from './Card'
import Link from '../Link'
import ConfirmationLink from '../ConfirmationLink'
import Icon from '../Icon'
import Button from '../Button'


export default class Unarchive extends Component {

  static PropTypes = {
    board: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.state = {
      searchTerm: '',
      display: 'Cards'
    }
    this.setSearchTerm = this.setSearchTerm.bind(this)
    this.toggleDisplay = this.toggleDisplay.bind(this)
  }

  setSearchTerm(event){
    const searchTerm = event.target.value
    this.setState({searchTerm: searchTerm})
  }

  toggleDisplay(){
    const display = this.state.display === 'Cards' ? 'Lists' : 'Cards'
    this.setState( {
      display: display
    })
  }

  render(){
    const { board } = this.props
    const toggleButtonText = this.state.display === 'Cards' ? 'Show Lists':"Show Cards"
    const toggleDisplayStatus = this.state.display === 'Cards' ?
      <ArchivedCards board={board} searchTerm={this.state.searchTerm} /> :
      <ArchivedLists board={board} searchTerm={this.state.searchTerm} />
    return (<div className="Unarchive">
      <Form className="ArchiveSearchForm">
        <input
          type="text"
          className="ArchiveSearchForm-Input"
          value={this.state.searchTerm}
          onChange={this.setSearchTerm}
        />
      </Form>
      <Link onClick={this.toggleDisplay}>{toggleButtonText}</Link> 
      {toggleDisplayStatus}
    </div>
  )
  }
}

class ArchivedCards extends Component {

  static PropTypes = {
    searchTerm: React.PropTypes.string.isRequired,
    board: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.unArchiveCard = this.unArchiveCard.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
  }

  unArchiveCard(id){
    $.ajax({
      method: "POST",
      url: `/api/cards/${id}/unarchive`
    }).then(() => {
      boardStore.reload()
    })
  }

  deleteCard(id){
    $.ajax({
      method: "POST",
      url: `/api/cards/${id}/delete`
    }).then(() => {
      boardStore.reload()
    })
  }

  render(){
    const cards = this.props.board.cards
      .filter(card => card.archived)
      .filter(card => `${card.description} ${card.content}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0)
      .sort((a, b) => a.order - b.order)

    const cardNodes = cards.map((card, index) =>
      <div key={card.id}>
        <Card
          key={card.id}
          card={card}
          index={index}
        />
        <Link onClick={()=> this.unArchiveCard(card.id)}>"Send to Board"</Link> 
        <ConfirmationLink
          onConfirm={()=> this.deleteCard(card.id)}
          buttonName="Delete"
          title='Delete Card?'
          message='All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.'
        >Delete</ConfirmationLink>
      </div>
    )

    return(<div className="archivedCards">
      {cardNodes}
    </div>
    )
  }
}

class ArchivedLists extends Component {
  static propTypes = {
    searchTerm: React.PropTypes.string,
    board: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.unArchiveList = this.unArchiveList.bind(this)
  }

  unArchiveList(id){
    $.ajax({
      method: "POST",
      url: `/api/lists/${id}/unarchive`
    }).then(() => {
      boardStore.reload()
    })
  }

  render(){
    const lists = this.props.board.lists
        .filter(list => list.archived)
        .filter(list => list.name.toUpperCase().indexOf(this.props.searchTerm.ToUpperCase))
        .sort((a, b) => a.name - b.name)
    const listNodes = lists.map((list, index) =>
        <div key={list.id}> "{list.name}"
        <Link onClick={()=> this.unArchiveList(list.id)}>"Send to Board"</Link>
        </div>
      )

    return(
      <div className="archivedLists">
        {listNodes}
      </div>
      )
   }
}
