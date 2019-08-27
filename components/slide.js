import React from 'react'

class Slide extends React.Component {

    render() {
        return <div className="slide">
            <div className={"slideContent " + (this.props.isCurrent && "current")}>
                <h1>{ this.props.slide.title }</h1>
                <p>{ this.props.slide.text }</p>
            </div>
            <style jsx>{`
                .slide {
                    box-sizing: border-box;
                    min-width: 100%;
                    padding-left: 20%;
                    padding-right: 20%;
                    font-family: Verdana;
                }
                .slideContent {
                    box-sizing: border-box;
                    padding-left: 2em;
                    padding-right: 2em;
                    padding-top: 1px;
                    padding-bottom: 10px;
                    background-color: #eee;
                    opacity: 0.5;
                    height: 15em;
                }
                .current {
                    background-color: #fff;
                    opacity: 1.0
                }
                @media only screen 
                and (max-width : 812px) {
                    .slide {
                        padding-left: 0px;
                        padding-right: 0px;
                    }
                    .slideContent {
                        height: 15em;
                    }
                }        
            `}</style>
        </div>
    }    

}

export default Slide