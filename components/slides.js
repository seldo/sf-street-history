import React from 'react'

const Slide = () => (
    <div className="slide" key={this.props.index}>
        <h1>{ this.props.title }</h1>
        <p>{ this.props.text }</p>
    </div>
)

export default Slide