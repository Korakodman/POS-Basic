export default function SectionCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-[600px]">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}