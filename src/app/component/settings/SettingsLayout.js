export default function SettingsLayout({ children }) {
  return (
    <div className="p-8 min-h-screen w-screen bg-gray-200 ">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}