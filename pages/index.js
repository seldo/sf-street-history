import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Slide from '../components/slide'
import GoogleMap from '../components/googlemap'

const slides = [
  {
    title: "San Francisco",
    text: "I am the first slide.",
    location: {
      center: { // trinidad
        lat: 10.69,
        lng: -61.7735,  
      },
      zoom: 10
    }    
  },
  {
    title: "Clementina Street",
    text: "Something about this place",
    location: {
      center: { // celementina street
        lat: 37.77904,
        lng: -122.4051073
      },
      zoom: 18
    }    
  },
  {
    title: "Gough Street",
    text: "I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. ",
    location: {
      center: {
        lat: 37.786941,
        lng: -122.425046
      },
      zoom: 18
    }
  },
  {
    title: "I am slide 4",
    text: "123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 "
  },
  {
    title: "I am slide 5",
    text: "I contain text."
  },
  {
    title: "I am slide 6",
    text: "I contain text."
  },
]

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      currentSlide: 0,
    }
    this.googleMapElement = React.createRef()
  }

  handleKeyPress(event) {
    let slideIndex
    let update = false
    if(event.keyCode === 37) {
      update = true
      slideIndex = this.state.currentSlide - 1
      if (slideIndex < 0) slideIndex = 0
    }
    if(event.keyCode === 39) {
      update = true
      slideIndex = this.state.currentSlide + 1
      if (slideIndex >= slides.length) slideIndex = slides.length - 1
    }
    if(update) {
      this.setState({
        currentSlide: slideIndex,
        containerMargin: this.calcMargin(slideIndex)
      })
      this.googleMapElement.current.changeTheMap(slides[slideIndex].location)
      event.preventDefault()        
    }
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
            return <Slide slide={slide} isCurrent={isCurrent} key={index}></Slide>
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
        }
        
      `}</style>
    </div>
  }
}

export default Home
