export default function StatCard({ title, value, subtext, icon: Icon, colorClass }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        <p className={`text-xs mt-2 font-medium ${colorClass}`}>{subtext}</p>
      </div>

      <div className={`p-3 rounded-lg ${colorClass.replace('text', 'bg').replace('600', '50')} ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}
