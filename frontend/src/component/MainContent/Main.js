import Card from './Card';
import {React, useState, useEffect} from 'react';

export default function Main() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    
    fetch('http://localhost:8000/api/hot',{
      method:'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setPosts(response.data)) 
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);


  return (
    <div className='ml-20 mt-3'>
      {/* <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/> */}
      <div className='mt-3'>
        <Card post={posts}/>
      </div>
      <div className='mt-3'>
        <Card/>
      </div>
      <div className='mt-3'>
        <Card/>
      </div>
      <div className='mt-3'>
        <Card/>
      </div>
    </div>
  )
}
