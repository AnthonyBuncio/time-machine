import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

var date = new Date(),
	year = date.getFullYear()

var TimeMachine = React.createClass({
	//the state that year and headingTo begins as..
	//will change as the buttons are clicked after first render
	getInitialState : function() {
		return {
			year : year,
			headingTo : '',
			tickRate : 1000,
			acceleration : 1
		}
	},

	componentWillMount : function() {
		this._tick()
	},

	//function to run once 'Future' button is clicked and state is changed to 'forward'
	//setState will re-render the page with the year + 1; interval is also increased 
	_forward : function () {
		this.setState({
			headingTo: 'forward',
			acceleration: 0.85
		})
	},
	//function to run once 'Past' button is clicked and state is changed to 'backward'
	//setState will re-render the page with the year -1; interval also increased
	_backward : function () {
		this.setState({
			headingTo: 'backward',
			acceleration: 0.85
		})
	},
	//changes state and resets the interval to 1000, before the increase
	_stop : function () {
		this.setState({
			headingTo : 'stop',
			tickRate: 1000
		})
	},	

	_tick: function() {
		var change = 0

		if (this.state.headingTo === 'backward') {
			change = -1
		}
		else if (this.state.headingTo === 'forward') {
			change = 1
		}
		else {
			change = 0
		}
		this.setState({
			year: this.state.year + change,
			tickRate: this.state.tickRate * this.state.acceleration
		})
		setTimeout(this._tick, this.state.tickRate)
	},
	
	render : function() {
		var forwardButton = '',
			backwardButton = '',
			stopButton = '',
			year = ''
		if(this.state.headingTo === 'forward'){
			forwardButton = 'forward',
			year = 'forward-year'
		}
		else if(this.state.headingTo === 'backward'){
			backwardButton = 'backward'
			year = 'backward-year'
		}
		else if (this.state.headingTo === 'stop'){
			stopButton = 'stop'
			year = 'stopped-year'
		}

		return (
			<div className="machine">
				<h1>GOTTA BLAST..</h1>
				<h2 className={year}>{this.state.year}</h2>
				<div className="nav"> 
					<button className={backwardButton} onClick={this._backward}>Past</button>
					<button className={stopButton} onClick={this._stop}>Stop</button>
					<button className={forwardButton} onClick={this._forward}>Future</button>
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