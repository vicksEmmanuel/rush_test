import { FaGamepad } from 'react-icons/fa';
import React from 'react';
import styles from '../styles/GameControllerAndText.module.scss';
import Link from 'next/link';

const GameControlImageAndText = () => {
  return (
    <>
      <div className="w-4/6 relative z-50 px-5">
        <h1 className={styles.header}>Game Shop</h1>
        <p className="max-w-[500px] pb-10 pt-3 text-justify font-secondary">
          Game Shop is a new supplier to the industry - delivering force and
          direction to online gaming. Bringing together some of iGamings biggest
          and brightest stars, the Games Global portfolio is home to thousands
          of titles from 50+ studio partners.
        </p>
        <Link href={'/shoppingList'}>
          <button
            className={`${styles['button']} rounded-2xl bg-button text-white p-4 px-10 flex flex-row text-center font-primary`}
          >
            See Available List
            <FaGamepad className="align-center mt-1 ml-4" />
          </button>
        </Link>
      </div>
      <div className="w-3/6">
        <img
          src="/assets/images/89285-OII6Q2-655 1.png"
          className="z-50 relative w-full h-full"
        />
      </div>
    </>
  );
};

export default GameControlImageAndText;
