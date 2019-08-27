import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Slide from '../components/slide'
import GoogleMap from '../components/googlemap'
import slides from './slides.json'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.moveSlide = this.moveSlide.bind(this)
    this.handleSlideClickLeft = this.handleSlideClickLeft.bind(this)
    this.handleSlideClickRight = this.handleSlideClickRight.bind(this)
    this.state = {
      currentSlide: 0,
    }
    this.googleMapElement = React.createRef()
  }

  handleKeyPress(event) {
    let caught = false
    if(event.keyCode === 37) {
      caught = true
      this.moveSlide('left')
    }
    if(event.keyCode === 39) {
      caught = true
      this.moveSlide('right')
    }
    if (caught) event.preventDefault()
  }

  handleSlideClickLeft() {
    this.moveSlide('left')
  }

  handleSlideClickRight() {
    this.moveSlide('right')
  }

  moveSlide(direction) {
    let slideIndex
    if(direction == 'left') {
      slideIndex = this.state.currentSlide - 1
      if (slideIndex < 0) slideIndex = 0
    }
    if(direction == 'right') {
      slideIndex = this.state.currentSlide + 1
      if (slideIndex >= slides.length) slideIndex = slides.length - 1
    }
    this.setState({
      currentSlide: slideIndex,
      containerMargin: this.calcMargin(slideIndex)
    })
    this.googleMapElement.current.changeTheMap(slides[slideIndex].location)
  }

  calcMargin(index) {
    let margin
    margin = (-window.innerWidth*index)+"px"
    return margin
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    return <div>
      <Head>
        <title>Home</title>
      </Head>

      <div className="mapWindow">
        <GoogleMap ref={this.googleMapElement}></GoogleMap>
      </div>

      <div className="slideWindow">
        <div className="slideContainer" style={{marginLeft: this.state.containerMargin}}>
          {slides.map( (slide,index) => {
            let isCurrent = (index == this.state.currentSlide)
            return <Slide slide={slide} isCurrent={isCurrent} key={index} moveleft={this.handleSlideClickLeft} moveright={this.handleSlideClickRight}></Slide>
          })}
          <div className="dummySlide"></div>
        </div>
      </div>

      <style jsx>{`
        .slideWindow {
          position: absolute;
          top: 66%;
          left: 0px;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .slideContainer {
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
          transition-property: margin-left, background-color, opacity;
          transition-duration: 0.5s;
        }
        .dummySlide {
          min-width: 30em;
        }
        @media only screen 
        and (max-width : 812px) {
          .slideWindow {
            top: calc(100% - 15em);            
          }
        }
        
      `}</style>
    </div>
  }
}

export default Home
