import React, { Component } from 'react'
import boardStore from '../../stores/boardStore'
import $ from 'jquery'

export default class ChangeBackground extends Component {
  static PropTypes = {
    board: React.PropTypes.object.isRequired
  }
}