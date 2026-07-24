// DashboardPage — admin overview with lead stats
import { useLeads } from '../../hooks/useLeads';
import { Users, TrendingUp, CheckCircle2, Phone, RefreshCw } from 'lucide-react';
import StatusDropdown from '../../components/StatusDropdown';

function StatCard({ icon: Icon, label, value, color, bgColor, borderColor }) {
  return (
    <div className="glass-card p-6 relative overflow-hidden" style={{
      borderColor,
    }}>
      {/* Glow effect */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full" style={{
        background: bgColor,
        filter: 'blur(30px)',
      }} />
      <div className="relative z-10">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{
          background: bgColor,
          border: `1px solid ${borderColor}`,
        }}>
          <Icon size={20} color={color} />
        </div>
        <p className="text-3xl font-extrabold mb-1" style={{ color: '#e0e3e5' }}>{value}</p>
        <p className="text-sm" style={{ color: '#958ea0' }}>{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { leads, loading, stats, refetch, updateStatus } = useLeads();

  const statCards = [
    {
      icon: Users,
      label: 'Total Leads',
      value: stats.total,
      color: '#a78bfa',
      bgColor: 'rgba(139, 92, 246, 0.15)',
      borderColor: 'rgba(139, 92, 246, 0.25)',
    },
    {
      icon: TrendingUp,
      label: 'New Leads',
      value: stats.newLeads,
      color: '#d946ef',
      bgColor: 'rgba(217, 70, 239, 0.15)',
      borderColor: 'rgba(217, 70, 239, 0.25)',
    },
    {
      icon: Phone,
      label: 'Contacted',
      value: stats.contacted,
      color: '#60a5fa',
      bgColor: 'rgba(59, 130, 246, 0.15)',
      borderColor: 'rgba(59, 130, 246, 0.25)',
    },
    {
      icon: CheckCircle2,
      label: 'Closed',
      value: stats.closed,
      color: '#4ade80',
      bgColor: 'rgba(34, 197, 94, 0.15)',
      borderColor: 'rgba(34, 197, 94, 0.25)',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#e0e3e5' }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: '#958ea0' }}>Overview of all your leads and activity</p>
        </div>
        <button
          onClick={refetch}
          disabled={loading}
          className="btn-secondary flex items-center gap-2 py-2 px-4 text-sm"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Recent leads table */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 flex items-center justify-between" style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <h2 className="font-semibold" style={{ color: '#e0e3e5' }}>Recent Leads</h2>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{
            background: 'rgba(139, 92, 246, 0.15)',
            color: '#a78bfa',
            border: '1px solid rgba(139, 92, 246, 0.25)',
          }}>
            {stats.total} total
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-16" style={{ color: '#958ea0' }}>
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>No leads yet. Share your lead capture page!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 10).map((lead) => (
                  <tr key={lead._id}>
                    <td className="font-medium" style={{ color: '#e0e3e5' }}>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.budget}</td>
                    <td>
                      <StatusDropdown
                        leadId={lead._id}
                        currentStatus={lead.status}
                        onUpdateStatus={updateStatus}
                      />
                    </td>
                    <td>{new Date(lead.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
