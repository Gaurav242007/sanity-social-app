import React from 'react'
import Stories from './Stories';
import Posts from './Posts';
import CreatePost from './CreatePost';
import ScrollToTop from 'react-scroll-to-top';

const Home = () => {
    return (
        <div className='w-full h-[90vh] bg-gred-400 flex'>
            <div className='lg:w-3/12 w-0 h-full'></div>
            <div className='lg:w-6/12 w-full h-full px-2 scrollbar overflow-x-hidden pb-10'>
                {/* Stories */}
                  <Stories />
                  <CreatePost />
                  <Posts />
        <ScrollToTop smooth />

            </div>
            <div className='lg:w-3/12 w-0 h-full'></div>

        </div>
    )
}

export default Home
