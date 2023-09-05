import React from 'react';
import styles from './PopupInfo.module.css';

function PopupInfo({ text, onClose }) {
  return (
    <div className={styles['popup-overlay']}>
      <div className={styles['popup-content']}>
        {/* Display the information text */}
        <p className={styles['popup-text']}>{text}</p>
        {/* Button to close the popup */}
        <button className={styles['popup-close']} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PopupInfo;
