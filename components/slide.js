import React from 'react'

class Slide extends React.Component {

    render() {
        return <div className="slide">
            <h1>{ this.props.slide.title }</h1>
            <p>{ this.props.slide.text }</p>
            { this.props.isCurrent && 
                <div>I'm the current slide</div>
            } 
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