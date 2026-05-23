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
      <svg viewBox="0 0 22 22" width="22" height="22" aria-hidden="true">
        <circle cx="11" cy="11" r="11" fill="#1185fe" />
        <g transform="translate(4 4) scale(0.5833)" fill="#fff">
          <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
        </g>
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
