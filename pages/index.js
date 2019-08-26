import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Slide from '../components/slide'
import GoogleMap from '../components/googlemap'

const slides = [
  {
    title: "I am slide 1",
    text: "I contain text"
  },
  {
    title: "I am slide 2",
    text: "I too contain text"
  },
  {
    title: "I am slide 3",
    text: "I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. I contain lots of text. "
  },
  {
    title: "I am slide 4",
    text: "I contain text."
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
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      currentSlide: 0,
      containerMargin: "calc((100% - 36em)/2)"
    }
  }

  escFunction(event) {
    if(event.keyCode === 37) {
      console.log("left!")
      let slideIndex = this.state.currentSlide - 1
      if (slideIndex < 0) slideIndex = 0
      this.setState({
        currentSlide: slideIndex,
        containerMargin: this.calcMargin(slideIndex)
      })
    }
    if(event.keyCode === 39) {
      console.log("right!")
      let slideIndex = this.state.currentSlide + 1
      if (slideIndex >= slides.length) slideIndex = slides.length - 1
      this.setState({
        currentSlide: slideIndex,
        containerMargin: this.calcMargin(slideIndex)
      })
    }
  }

  calcMargin(index) {
    let margin = "calc( ((100% - 36em)/2) - " + (index*38) + "em)"
    console.log(margin)
    return margin
  }

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    return <div>
      <Head>
        <title>Home</title>
      </Head>

      <div className="mapWindow">
        <GoogleMap></GoogleMap>
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
          display: flex;
          flex-wrap: nowrap;
        }
        .dummySlide {
          min-width: 30em;
        }
      `}</style>
    </div>
  }
}

export default Home
