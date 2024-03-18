import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import UseCreatePost from '../hooks/UseCreatePost';
import axios from 'axios';

export default function CreatePost() {
    const cloud_name = "dfpz1qg52";
    const preset_key = "fwn00lbn";
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        
        imageUrl: '' // Added imageUrl state to store the uploaded image URL
    });

    function handleFile(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', preset_key);
    
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then(res => {
                // Upon successful upload, update the imageUrl state with the URL of the uploaded image
                console.log(res.data.secure_url)
                setFormData(prevFormData => ({
                    ...prevFormData,
                    imageUrl: res.data.secure_url
                }));
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call UseCreatePost hook with title, description, and imageUrl
        const response = UseCreatePost({
            title: formData.title,
            description: formData.description,
            image: formData.imageUrl
        });
        console.log(response);

        // Reset form data
        setFormData({
            title: '',
            description: '',
            imageUrl: ''
        });
    };

    return (
        <div>
            <Navbar />
            <div className='flex justify-center bg-black h-screen'>
                <div className='w-[40vw] m-12'>
                    <div className='text-white text-2xl font-semibold mb-4'>Create Post</div>
                    <div className='bg-gray-800 rounded-xl p-8'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label className='text-white block mb-2'>Title:</label>
                                <input type='text' name='title' value={formData.title} onChange={handleChange} className='bg-gray-900 text-white rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='Enter title...' />
                            </div>
                            <div className='mb-4'>
                                <label className='text-white block mb-2'>Description:</label>
                                <textarea name='description' value={formData.description} onChange={handleChange} className='bg-gray-900 text-white rounded-md px-3 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-600' placeholder='Enter description...'></textarea>
                            </div>
                            <div className='flex items-center mb-4'>
                                <label className='text-white block mr-4'>Image:</label>
                                <input type='file' name='image' accept='image/*' onChange={handleFile} className='text-white' />
                                {formData.imageUrl && <img src={formData.imageUrl} alt='Uploaded' className='w-12 h-12 ml-4' />}
                                {formData.imageUrl && <button type='button' onClick={() => setFormData({ ...formData, imageUrl: '' })} className='text-white ml-2'>Remove Image</button>}
                            </div>
                            <div className='flex justify-end'>
                                <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg'>Create Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}