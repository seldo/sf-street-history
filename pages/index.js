import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Slide from '../components/slide'

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
      currentSlide: 0
    }
  }

  escFunction(event) {
    if(event.keyCode === 37) {
      console.log("left!")
      this.setState({currentSlide: this.state.currentSlide - 1})
    }
    if(event.keyCode === 39) {
      console.log("right!")
      this.setState({currentSlide: this.state.currentSlide + 1})
    }
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

      <div className="slideWindow">
        <div className="slideContainer">
          {slides.map( (slide,index) => {
            let isCurrent = (index == this.state.currentSlide)
            return <Slide slide={slide} isCurrent={isCurrent} key={index}></Slide>
          })}
        </div>
      </div>

      <style jsx>{`
        .slideWindow {
          margin-top: 10em;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
          border: 1px solid red;
        }
        .slideContainer {
          border: 1px solid blue;
          display: flex;
          flex-wrap: nowrap;
          margin-left: calc((100% - 30em)/2)
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  }
}

export default Home
