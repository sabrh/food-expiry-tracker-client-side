import React from 'react';
import Banner from '../components/Banner';
import NearExpire from '../components/NearExpire';
import Expired from '../components/Expired';

const Home = () => {
    return (
        <>
          <Banner />
          <NearExpire />
          <Expired />  
        </>
    );
};

export default Home;