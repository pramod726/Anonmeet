import cloudinary from 'cloudinary';

export async function cloudinaryConnect (){
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.SECRET_KEY,
    });
  } catch (e) {
    console.log(e);
  }
};
