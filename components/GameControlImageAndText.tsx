import { FaGamepad } from 'react-icons/fa';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/GameControllerAndText.module.scss';
import Link from 'next/link';

const GameControlImageAndText = () => {
  return (
    <>
      <div className="w-4/6 relative z-50 px-5">
        <h1 className={styles.header}>Game Shop</h1>
        <p className="max-w-[500px] pb-10 pt-3 text-justify font-secondary">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <Link href={'/addItems'}>
          <button
            className={`${styles['button']} rounded-2xl bg-button text-white p-4 px-10 flex flex-row text-center font-primary`}
          >
            See Available List
            <FaGamepad className="align-center mt-1 ml-4" />
          </button>
        </Link>
      </div>
      <div className="w-3/6">
        <Image
          src="/assets/images/89285-OII6Q2-655 1.png"
          width={500}
          height={500}
          className="z-50 relative w-full h-full"
        />
      </div>
    </>
  );
};

export default GameControlImageAndText;
