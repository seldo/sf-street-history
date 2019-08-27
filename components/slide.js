import React from 'react'
import { useSwipeable, Swipeable } from 'react-swipeable'

class Slide extends React.Component {

    constructor(props) {
        super(props)
        this.handleSwipe = this.handleSwipe.bind(this);
    }    

    handleSwipe() {
        this.props.moveright()
    }

    render() {
        return <div className="slide">
            <Swipeable onSwipedRight={ this.props.moveleft } onSwipedLeft={ this.props.moveright }>
                <div className={"slideContent " + (this.props.isCurrent && "current")}>
                    <div className="arrow" onClick={ this.props.moveleft }>◀</div>
                    <div className="slideText" onClick={ this.props.moveright }>
                        <h1>{ this.props.slide.title }</h1>
                        <p dangerouslySetInnerHTML={ {__html: this.props.slide.text} }></p>
                    </div>
                    <div className="arrow" onClick={ this.props.moveright }>▶</div>
                </div>
            </Swipeable>            
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
                    padding-top: 1px;
                    padding-bottom: 10px;
                    background-color: #eee;
                    opacity: 0.5;
                    height: 15em;
                    display: flex;
                    align-items: center;
                }
                .slideContent h1 {
                    font-size: 120%;
                }
                .slideText {
                    width: calc(100% - 20px);
                    height: 100%;
                    padding-left: 8px;
                    padding-right: 8px;
                }
                .arrow {
                    width: 25px;
                    height: 100%;
                    line-height: 5em;
                    padding-left: 0.5em;
                    padding-right: 0.5em;
                    font-size: 40px;
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
                    .slideText {
                        padding-left: 0.5em;
                        padding-right: 0.5em;    
                    }
                    .arrow {
                        width: 15px;
                        height: 100%;
                        line-height: 20em;
                        padding-left: 3px;
                        padding-right: 3px;
                        font-size: 12px;
                    }
                }        
            `}</style>
        </div>
    }    

}

export default Slide