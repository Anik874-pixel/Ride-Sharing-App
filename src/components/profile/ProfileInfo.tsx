'use client'

import { useState } from 'react'
import { UserProfile } from '@/types/profile'

const mockProfile: UserProfile = {
  id: '1',
  name: 'Aniket Kumar',
  email: 'aniket@example.com',
  phone: '+91 9876543210',
  profileImage: 'https://via.placeholder.com/150'
}

export default function ProfileInfo() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // In a real app, this would make an API call
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-black dark:text-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-600"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:bg-black dark:text-gray-50">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h3 className="font-medium">{profile.name}</h3>
              <p className="text-gray-500">{profile.email}</p>
              <p className="text-gray-500">{profile.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}