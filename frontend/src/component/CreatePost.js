import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import UseCreatePost from '../hooks/UseCreatePost';

export default function CreatePost() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("post")
        const response = UseCreatePost(formData);
        console.log(response);
        setFormData({
            title: '',
            description: '',
            image: null
        });
    };

    return (
        <div>
            <Navbar />
            <div className='flex justify-center bg-black h-screen'>
                <form className='w-[40vw] m-12 border-[1px] border-[#9c9c9c40] rounded-xl h-[83vh] ' onSubmit={handleSubmit}>
                    <div className='text-white text-2xl font-semibold mt-8 ml-8'>Create Post</div>
                    <div className="mt-8 mx-8">
                        <label className="text-white block mb-2">Title:</label>
                        <input type="text" name='title' value={formData.title} onChange={handleChange} className="bg-gray-800 text-white rounded-md px-3 py-2 w-full" placeholder="Enter title..." />
                    </div>
                    <div className="mt-8 mx-8">
                        <label className="text-white block mb-2">Description:</label>
                        <textarea className="bg-gray-800 text-white rounded-md px-3 py-2 w-full h-56" name='description' value={formData.description} onChange={handleChange} placeholder="Enter description..."></textarea>
                    </div>
                    <div className="mt-8 mx-8">
                        <label className="text-white block mb-2">Image:</label>
                        <input type="file" name='image' accept="image/*" onChange={handleChange} className="text-white" />
                    </div>
                    <div className="flex justify-end mt-4 mx-8">
                        <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
