import axios from 'axios';

// Ensure your .env file has NEXT_PUBLIC_IMGBB_API_KEY=your_key
const handleImageUpload = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    // Validate input
    if (!file) return null;

    try {
        const formData = new FormData();
        formData.append('image', file);

        // Note: 'key' is a query param for ImgBB, not body data usually, 
        // but axios handles params cleanly like this:
        const res = await axios.post('https://api.imgbb.com/1/upload', formData, {
            params: {
                key: apiKey
            }
        });

        return res.data.data.url;
    } catch (err) {
        console.error('Upload error details:', err);
        throw err;
    }
};

export default handleImageUpload;