'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  XIcon,
} from 'react-share';
import styles from './Slide.module.css';

function getShareUrl() {
  if (typeof window === 'undefined') return 'https://sfstreethistory.com';
  return window.location.href;
}

function getShareText(html) {
  if (typeof document === 'undefined') return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || div.innerText || '').slice(0, 240);
}

function BlueskyButton({ url, text }) {
  const intent = `https://bsky.app/intent/compose?text=${encodeURIComponent(
    `${text} ${url}`,
  )}`;
  return (
    <a
      href={intent}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.shareBtn}
      aria-label="Share on Bluesky"
      title="Bluesky"
    >
      <svg viewBox="0 0 64 57" width="22" height="22" aria-hidden="true">
        <circle cx="32" cy="28.5" r="32" fill="#0a7aff" />
        <path
          fill="#fff"
          transform="translate(11 9)"
          d="M9.9 1.9C15 5.7 20.4 13.5 22.5 17.7c2-4.2 7.5-12 12.5-15.8C38.7-.8 44.5-2.9 44.5 4 44.5 5.4 43.7 16 43.2 17.7c-1.5 5.9-7.4 7.4-12.6 6.5 9.1 1.5 11.4 6.7 6.4 11.8-9.5 9.8-13.7-2.5-14.8-5.7-.2-.6-.3-.8-.3-.6 0 .2-.1.4-.3.6-1 3.2-5.3 15.5-14.8 5.7-5-5.2-2.7-10.3 6.4-11.8C7-3 1.1 8 -.4 2.1-1-.4-.1 0 1.5.4c-1.7-.5-1.4-.4-.4 0L1 .4C2.7.9 9.9 1.9 9.9 1.9z"
        />
      </svg>
    </a>
  );
}

function CopyButton({ url }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.shareBtn}
      aria-label="Copy link"
      title={copied ? 'Copied!' : 'Copy link'}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect width="24" height="24" rx="12" fill="#666" />
        {copied ? (
          <path
            d="M7 12.5l3 3 7-7"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <g stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="8" height="8" rx="1.2" />
            <path d="M7 14V8a1 1 0 0 1 1-1h6" />
          </g>
        )}
      </svg>
    </button>
  );
}

export default function Slide({ slide, isCurrent, moveLeft, moveRight }) {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: moveRight,
    onSwipedRight: moveLeft,
    trackMouse: false,
  });

  const shareUrl = getShareUrl();
  const shareText = getShareText(slide.text);
  const subject = slide.title
    ? `San Francisco Street History: ${slide.title}`
    : 'San Francisco Street History';

  return (
    <article className={styles.slide}>
      <div
        {...swipeHandlers}
        className={`${styles.card} ${isCurrent ? styles.current : ''}`}
      >
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={moveLeft}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.body}>
          {slide.title ? <h1 className={styles.title}>{slide.title}</h1> : null}
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: slide.text }}
          />
          <div className={styles.shareRow}>
            <TwitterShareButton
              url={shareUrl}
              title={shareText}
              className={styles.shareBtn}
              aria-label="Share on X"
            >
              <XIcon size={22} round />
            </TwitterShareButton>
            <BlueskyButton url={shareUrl} text={shareText} />
            <FacebookShareButton
              url={shareUrl}
              className={styles.shareBtn}
              aria-label="Share on Facebook"
            >
              <FacebookIcon size={22} round />
            </FacebookShareButton>
            <LinkedinShareButton
              url={shareUrl}
              title={subject}
              summary={shareText}
              className={styles.shareBtn}
              aria-label="Share on LinkedIn"
            >
              <LinkedinIcon size={22} round />
            </LinkedinShareButton>
            <EmailShareButton
              url={shareUrl}
              subject={subject}
              body={`${shareText}\n\n`}
              className={styles.shareBtn}
              aria-label="Share by email"
            >
              <EmailIcon size={22} round />
            </EmailShareButton>
            <CopyButton url={shareUrl} />
          </div>
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={moveRight}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
