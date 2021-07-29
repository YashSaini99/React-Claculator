import React, { Component } from 'react';


class Key extends Component {
    handleClick = (e) => {
        e.preventDefault(); 
        this.props.handleClick(this.props.value)
    }
    
    render() {
        return (
            <button data-key={this.props.value} onClick={(e) => this.handleClick(e)}>
            {this.props.value}
          </button>
        );
    }
}

export default Key;
