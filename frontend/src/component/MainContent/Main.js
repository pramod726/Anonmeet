import {React, useState, useEffect} from 'react';
import axios from 'axios';
import Card from "./Card.js";

export default function Main({selectedItem}) {

  const [posts, setPosts] = useState([]);

  // console.log(selectedItem);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/api/post/${selectedItem}`);

        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchData();
  }, [selectedItem]);


  return (
    <div className='ml-20 mt-3'>

      {posts && posts.map(post => (
        <div className='mt-3' key={post._id}>
          <Card post={post} />
        </div>
      ))}

    </div>
  )
}
