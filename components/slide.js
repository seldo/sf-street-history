import React from 'react'
import { Swipeable } from 'react-swipeable'
import { TwitterShareButton, TwitterIcon } from 'react-share'
import Router from 'next/router'
import { isAbsolute } from 'path';

class Slide extends React.Component {

    constructor(props) {
        super(props)
        this.handleSwipe = this.handleSwipe.bind(this);
    }    

    handleSwipe() {
        this.props.moveright()
    }

    getShareURL() {
        if(typeof window !== 'undefined') {
            return window.location.protocol + "//" + window.location.hostname + Router.asPath        
        } else {
            return "https://sf-street-history.seldo.now.sh/"
        }
    }

    getShareText(text) {
        if(typeof document !== 'undefined') {
            let div = document.createElement("div");
            div.innerHTML = text
            return div.textContent || div.innerText || "";    
        } else {
            return ""
        }
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
                    <TwitterShareButton url={this.getShareURL()} className="twitterButton" style={{position:'absolute',bottom:'1em',right:'1em'}} title={ this.getShareText(this.props.slide.text) }>
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                    <div className="arrow" onClick={ this.props.moveright }>▶</div>
                </div>
            </Swipeable>            
            <style jsx>{`
                .slide {
                    box-sizing: border-box;
                    min-width: 100%;
                    padding-left: 20%;
                    padding-right: 20%;
                    font-family: sans-serif;
                }
                .slideContent {
                    box-sizing: border-box;
                    padding-top: 1px;
                    padding-bottom: 10px;
                    background-color: #eee;
                    opacity: 0.5;
                    display: flex;
                    align-items: center;
                    border: 8px double black;
                    border-radius: 1em;
                    position: relative;
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
                    cursor: pointer;
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
                        border-radius: 0;
                        border: 0px;
                        border-top: 1px solid black;
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