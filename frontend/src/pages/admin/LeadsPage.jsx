// LeadsPage — full featured leads management. Flowbite table-headers style.
import { useState, useMemo } from 'react';
import { useLeads } from '../../hooks/useLeads';
import {
  Search, RefreshCw, Users, ChevronUp, ChevronDown, SlidersHorizontal,
} from 'lucide-react';
import StatusDropdown from '../../components/StatusDropdown';
import PageHeader     from '../../components/ui/PageHeader';
import Avatar         from '../../components/ui/Avatar';
import Badge          from '../../components/ui/Badge';
import Spinner        from '../../components/ui/Spinner';
import Pagination     from '../../components/ui/Pagination';

const STATUS_FILTERS = ['All', 'NEW', 'CONTACTED', 'CLOSED'];
const SORT_OPTIONS   = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name_az', label: 'Name A→Z' },
  { value: 'name_za', label: 'Name Z→A' },
];

const PAGE_SIZE = 10;

export default function LeadsPage() {
  const { leads, loading, stats, refetch, updateStatus } = useLeads();

  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sort, setSort]                 = useState('newest');
  const [page, setPage]                 = useState(1);
  const [expandedId, setExpandedId]     = useState(null);
  const [showFilters, setShowFilters]   = useState(false);

  const filtered = useMemo(() => {
    let list = [...leads];

    // Filter
    if (statusFilter !== 'All') list = list.filter((l) => l.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.budget.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sort) {
      case 'oldest':   list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
      case 'name_az':  list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name_za':  list.sort((a, b) => b.name.localeCompare(a.name)); break;
      default:         list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [leads, search, statusFilter, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
  const handleStatus = (s) => { setStatusFilter(s); setPage(1); };
  const handleSort   = (e) => { setSort(e.target.value); setPage(1); };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <PageHeader
        title="All Leads"
        subtitle={`${stats.total} total leads · ${stats.newLeads} new · ${stats.closed} closed`}
      >
        <button
          onClick={refetch}
          disabled={loading}
          className="btn-outline h-9 gap-1.5"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </PageHeader>

      {/* Search + Filters toolbar */}
      <div className="card p-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              id="leads-search"
              type="text"
              placeholder="Search by name, email or budget..."
              value={search}
              onChange={handleSearch}
              className="form-input pl-9 h-9"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={handleSort}
            className="form-input h-9 w-full sm:w-44"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters((p) => !p)}
            className={`btn-outline h-9 gap-1.5 ${showFilters ? 'border-indigo-300 text-indigo-600 bg-indigo-50' : ''}`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {statusFilter !== 'All' && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">1</span>
            )}
          </button>
        </div>

        {/* Status filter pills */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => handleStatus(s)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  statusFilter === s
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {s === 'All' ? `All (${stats.total})` : s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 mb-3">
        Showing <span className="font-medium text-gray-600">{filtered.length}</span> of{' '}
        <span className="font-medium text-gray-600">{stats.total}</span> leads
        {search && <> matching "<span className="text-indigo-600">{search}</span>"</>}
      </p>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="xl" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20">
            <Users size={40} className="mx-auto mb-3 text-gray-200" />
            <p className="text-sm text-gray-400">
              {search ? 'No leads match your search.' : 'No leads found.'}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="pl-5">Lead</th>
                    <th>Email</th>
                    <th>Budget</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((lead) => (
                    <>
                      <tr
                        key={lead._id}
                        onClick={() => setExpandedId(expandedId === lead._id ? null : lead._id)}
                        className="cursor-pointer"
                      >
                        <td className="pl-5">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={lead.name} size="sm" />
                            <span className="font-medium text-gray-800 text-sm">{lead.name}</span>
                          </div>
                        </td>
                        <td className="text-gray-500">{lead.email}</td>
                        <td>
                          <span className="badge badge-indigo">{lead.budget}</span>
                        </td>
                        <td>
                          <span className="text-gray-400 text-xs max-w-[180px] truncate block">
                            {lead.message?.slice(0, 55)}{lead.message?.length > 55 ? '…' : ''}
                          </span>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <StatusDropdown
                            leadId={lead._id}
                            currentStatus={lead.status}
                            onUpdateStatus={updateStatus}
                          />
                        </td>
                        <td className="text-gray-400 text-xs whitespace-nowrap">
                          {formatDate(lead.createdAt)}
                        </td>
                      </tr>

                      {/* Expanded message row */}
                      {expandedId === lead._id && (
                        <tr key={`${lead._id}-expanded`}>
                          <td colSpan={6} className="px-5 pb-3 pt-0">
                            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3.5 text-sm text-gray-700 leading-relaxed">
                              <span className="font-semibold text-indigo-700">Full Message: </span>
                              {lead.message}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(p) => { setPage(p); setExpandedId(null); }}
            />
          </>
        )}
      </div>
    </div>
  );
}
