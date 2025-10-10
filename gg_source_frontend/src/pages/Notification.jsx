import React, { useState } from 'react';

const Notification = () => {
    const [formData, setFormData] = useState({
        tips: '',
        message: '',
        role: '',
        selectedFile: null,
        previewUrl: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prevState => ({
                    ...prevState,
                    selectedFile: file,
                    previewUrl: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setFormData(prevState => ({
            ...prevState,
            selectedFile: null,
            previewUrl: ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.tips || !formData.message || !formData.role) {
            alert('Please fill all required fields');
            return;
        }

        if (!formData.selectedFile) {
            alert('Please select an image to upload');
            return;
        }

        // Handle form submission
        console.log('Notification data:', formData);
        
        // Simulate API call
        alert('Notification sent successfully!');
        
        // Reset form
        setFormData({
            tips: '',
            message: '',
            role: '',
            selectedFile: null,
            previewUrl: ''
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">

            {/* Main Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Enter Tips Section */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Enter Tittle
                        </label>
                        <input
                            type="text"
                            name="tittle"
                            value={formData.tips}
                            onChange={handleInputChange}
                            placeholder="Enter Tittle"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Message Section */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Enter Your Message
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Enter Your Message"
                            rows="4"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            required
                        />
                    </div>

                    {/* Select Role */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Select Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="distributor">Distributor</option>
                            <option value="dealer">Dealer</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    {/* Upload Images Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Images</h3>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            {formData.previewUrl ? (
                                <div className="space-y-4">
                                    <div className="mx-auto max-w-md">
                                        <img 
                                            src={formData.previewUrl} 
                                            alt="Preview" 
                                            className="w-full h-48 object-contain rounded-lg"
                                        />
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p>Selected image: {formData.selectedFile?.name}</p>
                                        <p>Size: {(formData.selectedFile?.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <h4 className="text-lg font-medium text-gray-700 mb-2">
                                            Top Item: To Upload Image
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Recommended Image size 1920x1080
                                        </p>
                                    </div>
                                    
                                    <div className="flex justify-center">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 inline-block">
                                                UPLOAD IMAGE
                                            </span>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button 
                            type="submit"
                            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium text-lg"
                        >
                            SEND NOTIFICATION
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Notification;