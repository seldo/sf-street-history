import React from 'react'

class Slide extends React.Component {

    render() {
        return <div className="slide" key={this.props.index}>
            <h1>{ this.props.slide.title }</h1>
            <p>{ this.props.slide.text }</p>

            <style jsx>{`
                .slide {
                    border: 1px solid black;
                    min-width: 30em;
                    margin: 10px;
                    padding: 10px;
                }
            `}</style>
        </div>
    }    

}

export default Slide