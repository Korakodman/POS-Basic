import SectionCard from "./SectionCard";

export default function SecuritySection() {
  return (
    <SectionCard title="Security">
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
        Logout All Devices
      </button>
    </SectionCard>
  );
}