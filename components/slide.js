import React from 'react'

class Slide extends React.Component {

    render() {
        return <div className="slide">
            <div className={"slideContent " + (this.props.isCurrent && "current")}>
                <h1>{ this.props.slide.title }</h1>
                <p>{ this.props.slide.text }</p>
                { this.props.isCurrent && 
                    <div>I'm the current slide</div>
                }
            </div>
            <style jsx>{`
                .slide {
                    box-sizing: border-box;
                    min-width: 100%;
                    padding-left: 20%;
                    padding-right: 20%;
                }
                .slideContent {
                    box-sizing: border-box;
                    padding-left: 2em;
                    padding-right: 2em;
                    padding-top: 1px;
                    padding-bottom: 10px;
                    background-color: #eee;
                    opacity: 0.5;
                }
                .current {
                    background-color: #fff;
                    opacity: 1.0
                }
                @media only screen 
                and (max-width : 812px) {
                    .slide {
                        padding-left: 1em;
                        padding-right: 1em;
                    }
                    .slideContent {

                    }
                }        
            `}</style>
        </div>
    }    

}

export default Slide