import React, { useState, useEffect } from 'react'
import { useAuth } from '../contents/AuthContext';
import { Edit2, Save, X } from 'lucide-react';

const UserDetail = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user || {});

  // Sync editData when user changes
  useEffect(() => {
    setEditData(user || {});
  }, [user]);

  const handleEdit = (field, value) => {
    setEditData({
      ...editData,
      [field]: value
    });
  };

  const handleAddressEdit = (field, value) => {
    setEditData({
      ...editData,
      address: {
        ...editData.address,
        [field]: value
      }
    });
  };

  const handleSave = async () => {
    // Call API to update profile
    const result = await updateProfile(editData);
    if (result.success) {
      // Update editData with the latest user data from context
      setEditData(editData);
      alert('Profile updated successfully!');
      setIsEditing(false);
    } else {
      alert('Error updating profile: ' + result.error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Account Details</h2>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 cursor-pointer"
          >
            <Edit2 size={18} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              <Save size={18} /> Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              <X size={18} /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Personal Information */}
        <div className="bg-gray-50 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-3">
            {isEditing ? (
              <>
                <input 
                  type="text" 
                  value={editData.name} 
                  onChange={(e) => handleEdit('name', e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
                <input 
                  type="email" 
                  value={editData.email} 
                  onChange={(e) => handleEdit('email', e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
                <input 
                  type="tel" 
                  value={editData.phone || ''} 
                  onChange={(e) => handleEdit('phone', e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{user.phone || "Not Added"}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="bg-gray-50 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Address Information</h3>
          <div className="space-y-3">
            {isEditing ? (
              <>
                <input 
                  type="text" 
                  placeholder="Street"
                  value={editData.address?.street || ''} 
                  onChange={(e) => handleAddressEdit('street', e.target.value)}
                  className="w-full border px-2 py-1 rounded text-sm"
                />
                <input 
                  type="text" 
                  placeholder="City"
                  value={editData.address?.city || ''} 
                  onChange={(e) => handleAddressEdit('city', e.target.value)}
                  className="w-full border px-2 py-1 rounded text-sm"
                />
                <input 
                  type="text" 
                  placeholder="State"
                  value={editData.address?.state || ''} 
                  onChange={(e) => handleAddressEdit('state', e.target.value)}
                  className="w-full border px-2 py-1 rounded text-sm"
                />
                <input 
                  type="text" 
                  placeholder="Zip Code"
                  value={editData.address?.zipCode || ''} 
                  onChange={(e) => handleAddressEdit('zipCode', e.target.value)}
                  className="w-full border px-2 py-1 rounded text-sm"
                />
              </>
            ) : (
              <>
                <div><p className="text-xs text-gray-500">Street</p><p className="font-medium">{user.address?.street || "Not Added"}</p></div>
                <div><p className="text-xs text-gray-500">City</p><p className="font-medium">{user.address?.city || "Not Added"}</p></div>
                <div><p className="text-xs text-gray-500">State</p><p className="font-medium">{user.address?.state || "Not Added"}</p></div>
                <div><p className="text-xs text-gray-500">Zip Code</p><p className="font-medium">{user.address?.zipCode || "Not Added"}</p></div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-6 bg-gray-50 rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-3">Bio</h3>
        {isEditing ? (
          <textarea 
            value={editData.bio || ''} 
            onChange={(e) => handleEdit('bio', e.target.value)}
            className="w-full border px-2 py-1 rounded"
            rows="4"
          />
        ) : (
          <p className="text-gray-600">{user.bio || "No bio added yet."}</p>
        )}
      </div>

      {/* Account Info */}
      <div className="mt-6 bg-gray-50 rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-3">Account Information</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Member Since: <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span></p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;