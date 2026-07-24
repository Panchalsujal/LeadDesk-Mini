// LeadsPage — full leads table with search and filter
import { useState, useMemo } from 'react';
import { useLeads } from '../../hooks/useLeads';
import { Search, RefreshCw, Users, Mail, DollarSign, MessageSquare } from 'lucide-react';

const STATUS_FILTERS = ['ALL', 'NEW', 'CONTACTED', 'CLOSED'];

export default function LeadsPage() {
  const { leads, loading, stats, refetch } = useLeads();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.budget.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#e0e3e5' }}>All Leads</h1>
          <p className="text-sm mt-1" style={{ color: '#958ea0' }}>
            Manage and track all incoming leads
          </p>
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

      {/* Search and filters */}
      <div className="glass-card-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#958ea0' }} />
          <input
            type="text"
            placeholder="Search by name, email or budget..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-10 py-2 text-sm"
          />
        </div>

        {/* Status filter */}
        <div className="flex gap-2">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className="text-xs font-semibold px-3 py-2 rounded-lg transition-all"
              style={{
                background: statusFilter === status
                  ? 'rgba(139, 92, 246, 0.2)'
                  : 'rgba(255,255,255,0.04)',
                border: statusFilter === status
                  ? '1px solid rgba(139, 92, 246, 0.4)'
                  : '1px solid rgba(255,255,255,0.08)',
                color: statusFilter === status ? '#a78bfa' : '#958ea0',
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs mb-4" style={{ color: '#958ea0' }}>
        Showing <strong style={{ color: '#cbc3d7' }}>{filtered.length}</strong> of{' '}
        <strong style={{ color: '#cbc3d7' }}>{stats.total}</strong> leads
      </p>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#958ea0' }}>
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>{search ? 'No leads match your search.' : 'No leads yet.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <div className="flex items-center gap-1.5">
                      <Users size={13} /> Name
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-1.5">
                      <Mail size={13} /> Email
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={13} /> Budget
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare size={13} /> Message
                    </div>
                  </th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <>
                    <tr
                      key={lead._id}
                      onClick={() => setExpandedId(expandedId === lead._id ? null : lead._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="font-medium" style={{ color: '#e0e3e5' }}>{lead.name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.budget}</td>
                      <td>
                        <span className="truncate block max-w-xs" style={{ color: '#cbc3d7' }}>
                          {lead.message.length > 60
                            ? lead.message.slice(0, 60) + '…'
                            : lead.message}
                        </span>
                      </td>
                      <td>
                        <span className={`badge-${lead.status.toLowerCase()}`}>{lead.status}</span>
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>{formatDate(lead.createdAt)}</td>
                    </tr>
                    {/* Expanded message row */}
                    {expandedId === lead._id && (
                      <tr key={`${lead._id}-expanded`}>
                        <td colSpan={6} style={{ padding: '0 1.25rem 1rem' }}>
                          <div className="p-4 rounded-xl text-sm" style={{
                            background: 'rgba(139, 92, 246, 0.07)',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            color: '#cbc3d7',
                          }}>
                            <strong style={{ color: '#a78bfa' }}>Full Message:</strong>
                            <p className="mt-1 leading-relaxed">{lead.message}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
