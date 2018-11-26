import React, { Component } from 'react';
import './Progress.scss'

class Progress extends Component {
   state = { percentage: 0 }

   timeoutId = null
   start = null

   componentDidMount() {
     this.setState({ percentage: 100 })
     setTimeout(() => {
       console.log('done')
     }, 1000);
   }
   
  render() {
    const { percentage } = this.state
    return (
      <div style={{width: `${percentage}%`, transition: `${percentage !== 0 && 'all 1s ease-in-out'}`}} className='progress' percentage={percentage}/>
    );
  }
}

export default Progress;