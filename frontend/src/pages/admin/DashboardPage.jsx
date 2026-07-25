// DashboardPage — premium admin overview with KPIs, charts, and recent leads table
import { useMemo } from 'react';
import { useLeads } from '../../hooks/useLeads';
import {
  Users, TrendingUp, Phone, CheckCircle2, RefreshCw, ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import KpiCard     from '../../components/ui/KpiCard';
import PageHeader  from '../../components/ui/PageHeader';
import Avatar      from '../../components/ui/Avatar';
import Badge       from '../../components/ui/Badge';
import Spinner     from '../../components/ui/Spinner';
import LeadBarChart   from '../../components/charts/LeadBarChart';
import LeadDonutChart from '../../components/charts/LeadDonutChart';
import StatusDropdown from '../../components/StatusDropdown';

// Build weekly bar chart data from leads array
function buildChartData(leads) {
  const weeks = {};
  leads.forEach((lead) => {
    const d = new Date(lead.createdAt);
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay());
    const key = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!weeks[key]) weeks[key] = { label: key, New: 0, Contacted: 0, Closed: 0 };
    if (lead.status === 'NEW')       weeks[key].New++;
    if (lead.status === 'CONTACTED') weeks[key].Contacted++;
    if (lead.status === 'CLOSED')    weeks[key].Closed++;
  });
  return Object.values(weeks).slice(-6);
}

export default function DashboardPage() {
  const { leads, loading, stats, refetch, updateStatus } = useLeads();

  const chartData = useMemo(() => buildChartData(leads), [leads]);

  const kpiCards = [
    {
      icon: Users,
      label: 'Total Leads',
      value: stats.total,
      color: '#4f46e5',
      bgColor: '#eef2ff',
      trend: 12,
      trendLabel: 'vs last month',
      delay: 0,
    },
    {
      icon: TrendingUp,
      label: 'New Leads',
      value: stats.newLeads,
      color: '#7c3aed',
      bgColor: '#ede9fe',
      trend: 8,
      trendLabel: 'vs last month',
      delay: 50,
    },
    {
      icon: Phone,
      label: 'Contacted',
      value: stats.contacted,
      color: '#d97706',
      bgColor: '#fef3c7',
      trend: -3,
      trendLabel: 'vs last month',
      delay: 100,
    },
    {
      icon: CheckCircle2,
      label: 'Closed',
      value: stats.closed,
      color: '#16a34a',
      bgColor: '#dcfce7',
      trend: 21,
      trendLabel: 'vs last month',
      delay: 150,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your leads."
      >
        <button
          onClick={refetch}
          disabled={loading}
          className="btn-outline gap-1.5 h-9"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((card) => (
          <KpiCard key={card.label} {...card} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Bar Chart */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Leads Over Time</h2>
              <p className="text-xs text-gray-400 mt-0.5">Weekly breakdown by status</p>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Spinner size="lg" />
            </div>
          ) : (
            <LeadBarChart data={chartData} />
          )}
        </div>

        {/* Donut Chart */}
        <div className="card p-5">
          <div className="mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Status Distribution</h2>
            <p className="text-xs text-gray-400 mt-0.5">Breakdown by current status</p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              <LeadDonutChart stats={stats} />
              <div className="mt-2 space-y-2">
                {[
                  { label: 'New',       value: stats.newLeads,  cls: 'bg-indigo-400' },
                  { label: 'Contacted', value: stats.contacted, cls: 'bg-orange-400' },
                  { label: 'Closed',    value: stats.closed,    cls: 'bg-green-400'  },
                ].map(({ label, value, cls }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${cls}`} />
                      <span className="text-gray-500">{label}</span>
                    </div>
                    <span className="font-medium text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Recent Leads</h2>
            <p className="text-xs text-gray-400 mt-0.5">Latest {Math.min(leads.length, 10)} of {stats.total} leads</p>
          </div>
          <Link to="/admin/leads" className="btn-outline text-xs h-8 gap-1">
            View All <ArrowRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-16">
            <Users size={40} className="mx-auto mb-3 text-gray-200" />
            <p className="text-sm text-gray-400">No leads yet. Share your lead capture page!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Email</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 10).map((lead) => (
                  <tr key={lead._id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={lead.name} size="sm" />
                        <span className="font-medium text-gray-800">{lead.name}</span>
                      </div>
                    </td>
                    <td className="text-gray-500">{lead.email}</td>
                    <td>
                      <span className="badge badge-indigo">{lead.budget}</span>
                    </td>
                    <td>
                      <StatusDropdown
                        leadId={lead._id}
                        currentStatus={lead.status}
                        onUpdateStatus={updateStatus}
                      />
                    </td>
                    <td className="text-gray-400 whitespace-nowrap text-xs">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </td>
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
