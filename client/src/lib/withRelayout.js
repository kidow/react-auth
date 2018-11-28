import React, { Component } from 'react';

let relayout = () => {
  console.error(new Error('relayout is not defined'))
}

export const setRelayoutHandler = handler => {
  relayout = handler
}

export default function withRelayout(WrappedComponent) {
  return class extends Component {
    render() {
      return <WrappedComponent onRelayout={relayout} {...this.props}/>
    }
  }
}