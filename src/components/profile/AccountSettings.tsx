'use client'

export default function AccountSettings() {
  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-black dark:text-gray-50">
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Notification Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="ml-2">Email notifications</span>
            </label>
            <label className="flex items-center"> 
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="ml-2">SMS notifications</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Language</h3>
          <select className="block w-full rounded-md border border-gray-300 p-2">
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>
        </div>

        <div>
          <button className="text-red-500 hover:text-red-600">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}