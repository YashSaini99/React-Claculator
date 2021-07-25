import React, { Component } from 'react';
import Key from './components/key'
import Display from './components/display'
import History from './components/history'
import logo from './logo.svg';
import './App.css'
const math = require('mathjs')

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "Ready",
            done: true,
            history: [],
        }
    }

    // when app component loads into dom, add keybinding event listener
    componentDidMount() {
        document.addEventListener('keydown', this.handleKey);
    }

    // logic for binding keypresses with buttons
    handleKey = (e) => {
        if(["*", "/", ".", "+", "-", "^", 
            "(", ")", "0", "1", "2", "3", 
            "4", "5", "6", "7", "8", "9", "="].includes(e.key)){
            let key = document.querySelector(`button[data-key="${e.key}"]`)
            key.click()
            key.focus()
        } else {
            switch(e.key) {
                case "Backspace":
                    e.preventDefault()
                    if(["Error", "Infinity", "Ready"].includes(this.state.input)) {
                        this.setState({input: ""})
                    } else {
                        console.log(this.state.input)
                        console.log(this.state.input.length)

                        if(this.state.input.length !== 0) {
                            this.setState({input: this.state.input.slice(0, -1)})
                        }
                    }
                    break;
                case "Enter":     
                    let enter = document.querySelector(`button[data-key="="]`)
                    enter.click()
                    enter.focus()     
                    break;
                case "c":     
                    let clear = document.querySelector(`button[data-key="Clear"]`)
                    clear.click()
                    clear.focus()     
                    break;
                default:
                    break;
            }
        }
    }

    // callback for history component; updates the display when user clicks on history list.
    updateDisplayHistory = (history_exp) => {
        this.setState({
            input: history_exp
        })
    }

    // callback for display component; updates the display with new input
    updateDisplay = (new_input) => {
        let prev = this.state.input;

        if(["*", "/", ".", "+", "-", "^"].includes(new_input)) {
            if(prev[prev.length -1] === new_input) {
                return;
            }
        }

        if(this.state.done === true) {
            if(isNaN(this.state.input)) {
                this.setState({
                    input: new_input,
                    done: false
                })
            } else {
                if(["*", "/", ".", "+", "-", "^"].includes(new_input)) {
                    this.setState({
                        input: this.state.input + new_input,
                        done: false
                    }) 
                } else {
                    this.setState({
                        input: new_input,
                        done: false
                    }) 
                }
            }
        } else {
            this.setState({
                input: this.state.input + new_input,
                done: false
            })
        }
    }

    //  adds expression and result to history state
    addToHistory = (new_exp, result) => {
        this.setState({
            history: [...this.state.history, {exp: new_exp, result: result}]
        })
    }

    // clears the display by setting it to empty
    clearDisplay = () => {
        this.setState({
            input: ""
        })
    }

    // calculates the expression and sends it to history
    calculate = () => {
        if(this.state.input !== "") {
            try {
                let result = math.eval(this.state.input)

                if (this.state.input === result) {
                    return;
                }

                this.addToHistory(this.state.input, result.toString())
                this.setState({
                    input: result.toString(),
                    done: true
                })
            } catch (e) {
                this.setState({
                    input: "Error",
                    done: true
                })
            }
        }
    }

    // renders jsx into dom
    render() {
        return (
            <div className="App container">
                <div className="header">
                    <img src={logo} className="App-logo" width="50" height="50" alt="logo" />
                    <span className="App-name">react-calculator</span>
                </div>
                
                <Display input={this.state.input} handleChange={this.handleChange}/><br/>

                <div className="row">
                    <Key value="Clear" handleClick={this.clearDisplay}/>
                    <Key value="(" handleClick={this.updateDisplay}/>
                    <Key value=")" handleClick={this.updateDisplay}/>
                    <Key value="^" handleClick={this.updateDisplay}/>
                </div>

                <div className="row">
                    <Key value="7" handleClick={this.updateDisplay}/>
                    <Key value="8" handleClick={this.updateDisplay}/>
                    <Key value="9" handleClick={this.updateDisplay}/>
                    <Key value="+" handleClick={this.updateDisplay}/>
                </div>

                <div className="row">
                    <Key value="4" handleClick={this.updateDisplay}/>
                    <Key value="5" handleClick={this.updateDisplay}/>
                    <Key value="6" handleClick={this.updateDisplay}/>
                    <Key value="-" handleClick={this.updateDisplay}/>
                </div>

                <div className="row">
                    <Key value="1" handleClick={this.updateDisplay}/>
                    <Key value="2" handleClick={this.updateDisplay}/>
                    <Key value="3" handleClick={this.updateDisplay}/>
                    <Key value="*" handleClick={this.updateDisplay}/>
                </div>

                <div className="row">
                    <Key value="0" handleClick={this.updateDisplay}/>
                    <Key value="." handleClick={this.updateDisplay}/>
                    <Key value="=" handleClick={this.calculate}/>
                    <Key value="/" handleClick={this.updateDisplay}/>
                </div><br/>

                <History history={this.state.history} updateDisplayHistory={this.updateDisplayHistory}/><br/>

                <div className="footer">
                    <a href="https://github.com/YashSaini99/React-Claculator">Get the codes on GitHub</a>
                </div>
            </div>
        );
    }
}

export default App;
