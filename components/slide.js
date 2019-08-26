import React from 'react'

class Slide extends React.Component {

    render() {
        return <div className={"slide " + (this.props.isCurrent && "current")}>
            <h1>{ this.props.slide.title }</h1>
            <p>{ this.props.slide.text }</p>
            { this.props.isCurrent && 
                <div>I'm the current slide</div>
            } 
            <style jsx>{`
                .slide {
                    min-width: 30em;
                    margin: 2em;
                    padding: 2em;
                }
                .current {
                    background: #eee
                }
            `}</style>
        </div>
    }    

}

export default Slide