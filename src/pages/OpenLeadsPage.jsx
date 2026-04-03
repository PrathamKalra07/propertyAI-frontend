import React, { useEffect, useState } from 'react'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext';

const ratingConfig = {
  HOT:  { bg: 'bg-red-50',    text: 'text-red-500',    border: 'border-red-200',    dot: 'bg-red-500',   barColor: 'bg-red-500'   },
  WARM: { bg: 'bg-amber-50',  text: 'text-amber-500',  border: 'border-amber-200',  dot: 'bg-amber-400', barColor: 'bg-amber-400' },
  COLD: { bg: 'bg-slate-100', text: 'text-slate-400',  border: 'border-slate-200',  dot: 'bg-slate-400', barColor: 'bg-slate-400' },
};

const ScoreBar = ({ score, rating }) => {
  const color = ratingConfig[rating]?.barColor || 'bg-slate-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-[3px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`h-[5px] w-[5px] rounded-full ${i < score ? color : 'bg-slate-200'}`} />
        ))}
      </div>
      <span className="text-xs text-slate-400 font-medium tabular-nums">{score}/10</span>
    </div>
  );
};

const LeadCard = ({ lead }) => {
  const rating = ratingConfig[lead.rating] || ratingConfig.COLD;
  const initials = lead.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

  const budgetLabel = lead.budget_max
    ? (lead.budget_min && lead.budget_min > 0
        ? `$${lead.budget_min.toLocaleString()}–$${lead.budget_max.toLocaleString()}/mo`
        : `Up to $${lead.budget_max.toLocaleString()}/mo`)
    : null;

  const metaRows = [
    lead.bedrooms_needed && lead.household_size
      ? `${lead.bedrooms_needed} bed · ${lead.household_size} people`
      : lead.bedrooms_needed ? `${lead.bedrooms_needed} bed`
      : lead.household_size ? `${lead.household_size} people` : null,
    budgetLabel,
    lead.preferred_area,
    lead.target_move_in,
    lead.has_pets ? (lead.pet_type ? `Pets: ${lead.pet_type}` : 'Has pets') : null,
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-4 hover:shadow-lg hover:border-slate-300 transition-all duration-200">

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate leading-tight">{lead.name}</p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{lead.phone}</p>
          </div>
        </div>
        <span className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${rating.bg} ${rating.text} ${rating.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${rating.dot}`} />
          {lead.rating}
        </span>
      </div>

      {/* Score */}
      <ScoreBar score={lead.score} rating={lead.rating} />

      {/* Meta info — clean list, no pills */}
      <div className="flex flex-col gap-1.5">
        {metaRows.map((row, i) => (
          <p key={i} className="text-[12px] text-slate-500 leading-tight">{row}</p>
        ))}
      </div>

      {/* Recommended property */}
      {lead.recommended_property ? (
        <div className="mt-auto pt-3 border-t border-slate-100">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Recommended</p>
          <p className="text-xs font-semibold text-slate-700 truncate">{lead.recommended_property}</p>
          {lead.recommended_unit && (
            <p className="text-[11px] text-slate-400 truncate">{lead.recommended_unit}</p>
          )}
        </div>
      ) : (
        <div className="mt-auto" />
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
        {lead.tour_scheduled ? (
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
            Tour {lead.tour_date || 'scheduled'}
          </span>
        ) : (
          <span className="text-[11px] text-slate-400">No tour yet</span>
        )}
        <span className="text-[11px] text-slate-400 truncate max-w-[120px] text-right">
          {lead.assigned_agent || 'Unassigned'}
        </span>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-200 flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 w-28 bg-slate-200 rounded" />
        <div className="h-2.5 w-20 bg-slate-100 rounded" />
      </div>
    </div>
    <div className="flex gap-1">{Array.from({length:10}).map((_,i)=><div key={i} className="h-[5px] w-[5px] rounded-full bg-slate-200"/>)}</div>
    <div className="flex flex-col gap-2">{Array.from({length:3}).map((_,i)=><div key={i} className="h-3 bg-slate-100 rounded w-3/4"/>)}</div>
    <div className="mt-auto pt-3 border-t border-slate-100 h-8 bg-slate-50 rounded-lg" />
  </div>
);

const FILTERS = ['All', 'HOT', 'WARM', 'COLD'];
const filterLabel = { HOT: 'Hot', WARM: 'Warm', COLD: 'Cold' };

const OpenLeadsPage = () => {
  const { leads,isLoading } = useChat();
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');


  const filtered = leads.filter(l => {
    const matchRating = filter === 'All' || l.rating === filter;
    const matchSearch = !search ||
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search);
    return matchRating && matchSearch;
  });

  const counts = {
    HOT:  leads.filter(l => l.rating === 'HOT').length,
    WARM: leads.filter(l => l.rating === 'WARM').length,
    COLD: leads.filter(l => l.rating === 'COLD').length,
  };

  return (
    <div className="overflow-y-scroll w-full px-6 py-8">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Leads</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {leads.length} total · {counts.HOT} hot · {counts.WARM} warm · {counts.COLD} cold
          </p>
        </div>

        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 w-52"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map(f => {
          const isActive = filter === f;
          const cfg = ratingConfig[f];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isActive
                  ? f === 'All'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : `${cfg.bg} ${cfg.text} ${cfg.border}`
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-600'
              }`}
            >
              {f === 'All' ? `All (${leads.length})` : `${filterLabel[f]} (${counts[f]})`}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <svg className="w-10 h-10 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm font-medium">No leads found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(lead => <LeadCard key={lead.id} lead={lead} />)}
        </div>
      )}
    </div>
  );
};

export default OpenLeadsPage;