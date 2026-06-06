import React, { useState } from 'react';
import api from '../services/api';

const ProfilePictureUpload = ({ currentImage, onImageUpload }) => {
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ✅ Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File too large! Max 2MB');
            return;
        }

        // ✅ Check file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // ✅ Must be 'image' not 'file'

        setUploading(true);
        try {
            const response = await api.post('/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log('Upload success:', response.data);
            
            if (response.data.success && response.data.url) {
                onImageUpload(response.data.url);
                alert('Profile picture updated!');
            }
        } catch (error) {
            console.error('Upload error:', error.response?.data || error.message);
            alert('Upload failed: ' + (error.response?.data?.message || 'Server error'));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-3">
            <div className="relative">
                <img 
                    src={currentImage || 'https://via.placeholder.com/100'} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                />
                <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input 
                        type="file" 
                        accept="image/jpeg,image/png,image/jpg,image/webp" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                    />
                </label>
            </div>
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        </div>
    );
};

export default ProfilePictureUpload;