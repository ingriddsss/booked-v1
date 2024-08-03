"use client"
import React from 'react';
import Home from '../components/Home';
import RootLayout from './layout';
import Link from 'next/link';
import { Welcome } from '@/components/Welcome';

const HomePage: React.FC = () => {
    return (
        <div className='bg-lightcream'>
          <Welcome />
        </div>
    );
};

export default HomePage;
