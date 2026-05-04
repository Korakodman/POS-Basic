import SectionCard from "./SectionCard";

export default function ProfileSection({ user }) {
  return (
    <SectionCard title="Profile">
      <p>Username: <b>{user?.username}</b></p>
      <p>Role: <b>{user?.role}</b></p>

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
        Change Password
      </button>
    </SectionCard>
  );
}