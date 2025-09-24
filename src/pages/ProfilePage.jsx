import { useAuth } from '../context/AuthContext.jsx'

function ProfilePage() {
  const { user, role } = useAuth()
  const name = 'Test User'
  const phone = '1234567890'
  const accountStatus = true
  const username = user?.id || 'test@gmail.com'

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="h-44 w-44 rounded-full border-4 border-green-400 grid place-items-center bg-gray-600/30">
          <div className="h-36 w-36 rounded-full bg-gray-400" />
        </div>
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="mx-auto min-w-[640px] max-w-xl border">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 w-1/2 text-center">Name</td>
              <td className="px-4 py-2 w-1/2 text-center">{name}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-center">Username</td>
              <td className="px-4 py-2 text-center">{username}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-center">Phone</td>
              <td className="px-4 py-2 text-center">{phone}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-center">Role</td>
              <td className="px-4 py-2 text-center">{role?.toUpperCase() || 'USER'}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-center">Account Status</td>
              <td className="px-4 py-2 text-center">{String(accountStatus)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfilePage





