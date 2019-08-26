import React from 'react'

class Slide extends React.Component {

    render() {
        return <div className="slide" key={this.props.index}>
            <h1>{ this.props.slide.title }</h1>
            <p>{ this.props.slide.text }</p>
        </div>
    }    

}

export default Slide