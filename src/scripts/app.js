import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

var date = new Date(),
	year = date.getFullYear(),
	interval = 1000

var TimeMachine = React.createClass({
	getInitialState : function() {
		return {
			year : year,
			headingTo : ''
		}
	},
	_forward : function () {
		if (this.state.headingTo === 'forward') {
			this.state.year += 1
			this.setState({
					year : this.state.year,
					headingTo : this.state.headingTo
				})
			interval *= .8
			this.forwardButton = setTimeout(this._forward, interval)
		}
	},
	_backward : function () {
		if (this.state.headingTo === 'backward') {
			this.state.year -= 1
			this.setState({
					year : this.state.year,
					headingTo : this.state.headingTo
				})
			interval *= .8
			this.backwardButton = setTimeout(this._backward, interval)
		}
	},
	stop : function () {
		this.state.headingTo = 'stop'
		this.setState({
			headingTo : this.state.headingTo
			})
		interval = 1000
	},
	future : function () {
		this.state.headingTo = 'forward'
		this.setState({
			headingTo : this.state.headingTo
			})
		this._forward()
	},
	past : function () {
		this.state.headingTo = 'backward'
		this.setState({
			headingTo : this.state.headingTo
			})
		this._backward()
	},
	
	render : function() {
		var forwardButton = ''
		var backwardButton = ''
		var stopButton = ''
		if(this.state.headingTo === 'forward'){
			forwardButton = 'forward'
		}
		else if(this.state.headingTo === 'backward'){
			backwardButton = 'backward'
		}
		else if (this.state.headingTo === 'stop'){
			stopButton = 'stop'
		}


		return (
				<div className="machine">
					<h1>GOTTA BLAST..</h1>
					<h2 className="year">{this.state.year}</h2>
					<div className="nav"> 
						<button className={backwardButton} onClick={this.past}>Past</button>
						<button className={stopButton} onClick={this.stop}>Stop</button>
						<button className={forwardButton} onClick={this.future}>Future</button>
					</div>
				</div>
			)
	}
})

var app = function() {
  ReactDOM.render(<TimeMachine />,document.querySelector('.container'))
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..