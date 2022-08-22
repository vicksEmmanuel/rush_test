import React, { useCallback, useEffect, useState } from 'react';
import { useScrollDirection } from '../modules/hooks/useScrollDirection';
import styles from '../styles/Liveblocks.module.scss';

const LiveBlocks = ({ numberOfBlocks }: { numberOfBlocks: number }) => {
  const [indexes, setIndexex] = useState([0, 0, 0]);
  const scrollDirection = useScrollDirection();

  const getSupportingStyle = (idx: number) => {
    if (scrollDirection == 'up') {
      switch (idx) {
        case indexes[0]:
          return `${styles['liveblockcloseby_right']} ${styles['liveblockcloseby_bottom']} ${styles['liveblockcloseby']}`;
        case indexes[1]:
          return `${styles['liveblockcloseby_right']} ${styles['liveblockcloseby']}`;
        case indexes[2]:
          return `${styles['liveblockcloseby_right']} ${styles['liveblockcloseby_top']} ${styles['liveblockcloseby']}`;
      }
    } else {
      switch (idx) {
        case indexes[0]:
          return `${styles['liveblockcloseby_left']} ${styles['liveblockcloseby_bottom']} ${styles['liveblockcloseby']}`;
        case indexes[1]:
          return `${styles['liveblockcloseby_bottom']} ${styles['liveblockcloseby']}`;
        case indexes[2]:
          return `${styles['liveblockcloseby_top']} ${styles['liveblockcloseby_right']} ${styles['liveblockcloseby_top']} ${styles['liveblockcloseby']}`;
      }
    }
  };

  return (
    <div className={styles['liveblock_wrapper']}>
      {new Array(numberOfBlocks).fill(0).map((_, idx) => {
        return (
          <div
            key={idx}
            data-testid={`${idx}-block`}
            onMouseOver={() => {
              if (scrollDirection === 'up') {
                const index = idx - 20;
                setIndexex([index, index - 1, idx - 1]);
              } else {
                const index = 20 + idx;
                setIndexex([index, index + 1, idx + 1]);
              }
            }}
            className={`
                ${styles.liveblock} 
                ${getSupportingStyle(idx)}
                w-[5%] h-[10%] bg-primary-900 md:w-['5%'] md:h-[7%] xs:w-[5%] h-[2%]
            `}
          ></div>
        );
      })}
    </div>
  );
};

export default LiveBlocks;
