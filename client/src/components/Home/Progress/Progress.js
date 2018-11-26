import React, { Component } from 'react';
import './Progress.scss'

class Progress extends Component {
  state = { percentage: 0 }

  timeoutId = null

  handlePost = () => {
    const { onPost } = this.props
    onPost()
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timeoutId)

    this.setState({ percentage: 0 })

    if (nextProps.value === '') {
      return
    }

    setTimeout(() => {
      this.setState({ percentage: 100 })
    }, 0)

    this.timeoutId = setTimeout(this.handlePost, 1000)
  }
   
  render() {
    const { percentage } = this.state
    return (
      <div 
        style={{width: `${percentage}%`, transition: `${percentage !== 0 && 'all 1s ease-in-out'}`}} 
        className='progress' 
        percentage={percentage}
      />
    );
  }
}

export default Progress;