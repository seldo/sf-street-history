'use client';

import { useCallback, useEffect, useState } from 'react';
import SfMap from './SfMap';
import Slide from './Slide';
import styles from './Slideshow.module.css';

export default function Slideshow({ slides, initialSlide }) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [viewportWidth, setViewportWidth] = useState(null);

  const moveSlide = useCallback(
    (direction) => {
      setCurrentSlide((prev) =>
        direction === 'left'
          ? Math.max(0, prev - 1)
          : Math.min(slides.length - 1, prev + 1),
      );
    },
    [slides.length],
  );

  useEffect(() => {
    const targetPath = `/street/${currentSlide}/`;
    if (window.location.pathname !== targetPath) {
      window.history.replaceState(null, '', targetPath);
    }
  }, [currentSlide]);

  const moveLeft = useCallback(() => moveSlide('left'), [moveSlide]);
  const moveRight = useCallback(() => moveSlide('right'), [moveSlide]);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveLeft();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveRight();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [moveLeft, moveRight]);

  const containerStyle =
    viewportWidth !== null
      ? { marginLeft: `${-viewportWidth * currentSlide}px` }
      : { visibility: 'hidden' };

  return (
    <div className={styles.root}>
      <div className={styles.mapWindow}>
        <SfMap location={slides[currentSlide].location} />
      </div>

      <div className={styles.slideWindow}>
        <div className={styles.slideContainer} style={containerStyle}>
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              isCurrent={index === currentSlide}
              moveLeft={moveLeft}
              moveRight={moveRight}
            />
          ))}
          <div className={styles.dummySlide} />
        </div>
      </div>
    </div>
  );
}
