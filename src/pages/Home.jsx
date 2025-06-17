import React from 'react';
import Banner from '../components/Banner';
import NearExpire from '../components/NearExpire';
import Expired from '../components/Expired';
import StorageTips from '../components/StorageTips';
import ReduceWaste from '../components/ReduceWaste';

const Home = () => {
    return (
        <>
          <Banner />
          <StorageTips />
          <NearExpire />
          <Expired />  
          <ReduceWaste />
        </>
    );
};

export default Home;