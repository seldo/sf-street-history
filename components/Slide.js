'use client';

import { useSwipeable } from 'react-swipeable';
import styles from './Slide.module.css';

function buildShareUrl(text) {
  if (typeof window === 'undefined') return '#';
  const url = window.location.href;
  const params = new URLSearchParams({
    text: stripHtml(text),
    url,
  });
  return `https://x.com/intent/post?${params.toString()}`;
}

function stripHtml(html) {
  if (typeof document === 'undefined') return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export default function Slide({ slide, isCurrent, moveLeft, moveRight }) {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: moveRight,
    onSwipedRight: moveLeft,
    trackMouse: false,
  });

  return (
    <div className={styles.slide}>
      <div
        {...swipeHandlers}
        className={`${styles.slideContent} ${isCurrent ? styles.current : ''}`}
      >
        <button
          type="button"
          className={styles.arrow}
          onClick={moveLeft}
          aria-label="Previous slide"
        >
          ◀
        </button>
        <div className={styles.slideText} onClick={moveRight}>
          {slide.title ? <h1 className={styles.title}>{slide.title}</h1> : null}
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: slide.text }}
          />
        </div>
        <a
          href={buildShareUrl(slide.text)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.share}
          aria-label="Share on X"
        >
          Share
        </a>
        <button
          type="button"
          className={styles.arrow}
          onClick={moveRight}
          aria-label="Next slide"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
