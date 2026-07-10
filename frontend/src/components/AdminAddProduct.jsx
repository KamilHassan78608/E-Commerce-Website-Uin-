import React, { useState } from 'react';
import { createProduct } from '../services/api';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    themes: '',
    sizes: '',
    bestseller: false,
    image: null
  });

  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file
      }));

      setPreview(URL.createObjectURL(file));
      setError(''); // Clear any previous errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');
    
    // Validate image is selected
    if (!formData.image) {
      setError('Please select a product image');
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();

      // Append all fields
      form.append('name', formData.name.trim());
      form.append('description', formData.description.trim());
      form.append('price', formData.price.toString());
      form.append('category', formData.category);
      form.append('subCategory', formData.subCategory.trim());

      // Handle themes - convert comma-separated string to array
      const themesArray = formData.themes
        .split(',')
        .map(item => item.trim())
        .filter(Boolean);
      
      if (themesArray.length > 0) {
        form.append('themes', JSON.stringify(themesArray));
      } else {
        form.append('themes', JSON.stringify([]));
      }

      // Handle sizes - convert comma-separated string to array
      const sizesArray = formData.sizes
        .split(',')
        .map(item => item.trim().toUpperCase())
        .filter(Boolean);
      
      if (sizesArray.length > 0) {
        form.append('sizes', JSON.stringify(sizesArray));
      } else {
        form.append('sizes', JSON.stringify([]));
      }

      // Append boolean as string
      form.append('bestseller', String(formData.bestseller));

      // Append image
      form.append('image', formData.image);

      // Log FormData contents for debugging
      console.log('Sending FormData:');
      for (let pair of form.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await createProduct(form);

      console.log('Product created:', response.data);

      setSuccess('Product added successfully!');

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        subCategory: '',
        themes: '',
        sizes: '',
        bestseller: false,
        image: null
      });

      setPreview('');
      
      // Optional: Redirect after successful creation
      // navigate('/admin/products');

    } catch (err) {
      console.error('Error creating product:', err);
      
      // Handle different error scenarios
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
        
        setError(
          err.response.data?.message || 
          'Server error. Please try again.'
        );
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Request error:', err.request);
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', err.message);
        setError(err.message || 'Failed to add product');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Add New Product
        </h1>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-3 rounded-lg border border-red-200">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-100 text-green-700 px-4 py-3 rounded-lg border border-green-200">
            <strong>Success:</strong> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Sub Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              required
              placeholder="e.g., Shirts, Jackets, Dresses"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your product..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Themes
              </label>
              <input
                type="text"
                name="themes"
                value={formData.themes}
                onChange={handleChange}
                placeholder="Casual, Summer, Formal (comma separated)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate themes with commas
              </p>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Sizes
              </label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL (comma separated)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate sizes with commas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="bestseller"
              id="bestseller"
              checked={formData.bestseller}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="bestseller" className="font-medium text-gray-700">
              Mark as Bestseller
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!formData.image}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Max file size: 5MB. Supported formats: JPG, PNG, GIF
            </p>
            
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Product preview"
                  className="h-40 w-40 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview('');
                    setFormData(prev => ({ ...prev, image: null }));
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding Product...
              </span>
            ) : (
              'Add Product'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;