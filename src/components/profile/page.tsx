import ProfileInfo from '@/components/profile/ProfileInfo'
import RideStatistics from '@/components/profile/RideStatistics'
import AccountSettings from '@/components/profile/AccountSettings'

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>
      <div className="grid gap-6">
        <ProfileInfo />
        <RideStatistics />
        <AccountSettings />
      </div>
    </div>
  )
}