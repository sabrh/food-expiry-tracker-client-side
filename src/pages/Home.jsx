import React from 'react';
import Banner from '../components/Banner';
import NearExpire from '../components/NearExpire';
import Expired from '../components/Expired';
import StorageTips from '../components/StorageTips';
import ExpiryTimer from '../components/ExpiryTimer';
import Quote from '../components/Quote';

const Home = () => {
    return (
        <>
          <Banner />
          <StorageTips />
          <NearExpire />
          <Quote />
          <ExpiryTimer />
          <Expired />  
        </>
    );
};

export default Home;