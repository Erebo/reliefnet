import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, User, LogOut, ChevronRight, Map, LayoutDashboard, Truck, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { SearchResult } from '../../types';

const SEARCHABLE_ENTITIES: SearchResult[] = [
  // Districts
  { id: 101, title: 'Feni District', bangla_title: 'ফেনী জেলা', type: 'DISTRICT', lat: 22.98, lon: 91.39, subtitle: 'Chittagong Division • Active Flood Basin' },
  { id: 102, title: 'Noakhali District', bangla_title: 'নোয়াখালী জেলা', type: 'DISTRICT', lat: 22.76, lon: 91.22, subtitle: 'Chittagong Division • Coastal Surge' },
  { id: 103, title: 'Sylhet District', bangla_title: 'সিলেট জেলা', type: 'DISTRICT', lat: 25.07, lon: 91.93, subtitle: 'Sylhet Division • Haor Flash Flood' },

  // Upazilas
  { id: 201, title: 'Sonagazi Upazila', bangla_title: 'সোনাগাজী', type: 'UPAZILA', lat: 22.85, lon: 91.39, subtitle: 'Feni District • Coastal Embankment' },
  { id: 202, title: 'Parshuram Upazila', bangla_title: 'পরশুরাম', type: 'UPAZILA', lat: 23.21, lon: 91.44, subtitle: 'Feni District • Muhuri River Breach' },
  { id: 203, title: 'Fulgazi Upazila', bangla_title: 'ফুলগাজী', type: 'UPAZILA', lat: 23.14, lon: 91.43, subtitle: 'Feni District • Spillway Inundation' },
  { id: 204, title: 'Feni Sadar', bangla_title: 'ফেনী সদর', type: 'UPAZILA', lat: 23.01, lon: 91.39, subtitle: 'Feni District • Town Center' },
  { id: 205, title: 'Chhagalnaiya Upazila', bangla_title: 'ছাগলনাইয়া', type: 'UPAZILA', lat: 23.03, lon: 91.51, subtitle: 'Feni District • Border Zone' },
  { id: 206, title: 'Daganbhuiyan Upazila', bangla_title: 'দাগনভূঞা', type: 'UPAZILA', lat: 22.93, lon: 91.30, subtitle: 'Feni District • Choto Feni Basin' },
  { id: 207, title: 'Companiganj Upazila (Noakhali)', bangla_title: 'কোম্পানীগঞ্জ', type: 'UPAZILA', lat: 22.76, lon: 91.25, subtitle: 'Noakhali District • Musapur Basin' },
  { id: 208, title: 'Senbagh Upazila', bangla_title: 'সেনবাগ', type: 'UPAZILA', lat: 22.84, lon: 91.21, subtitle: 'Noakhali District • Backwater Depression' },
  { id: 209, title: 'Begumganj Upazila', bangla_title: 'বেগমগঞ্জ', type: 'UPAZILA', lat: 22.95, lon: 91.10, subtitle: 'Noakhali District • Chowmuhani Hub' },
  { id: 210, title: 'Subarnachar Upazila', bangla_title: 'সুবর্ণচর', type: 'UPAZILA', lat: 22.71, lon: 91.16, subtitle: 'Noakhali District • Tidal Polders' },
  { id: 211, title: 'Gowainghat Upazila', bangla_title: 'গোয়াইনঘাট', type: 'UPAZILA', lat: 25.05, lon: 91.91, subtitle: 'Sylhet District • Haor Basin' },
  { id: 212, title: 'Jaintapur Upazila', bangla_title: 'জৈন্তাপুর', type: 'UPAZILA', lat: 25.08, lon: 92.02, subtitle: 'Sylhet District • Sari River Border' },
  { id: 213, title: 'Companiganj Upazila (Sylhet)', bangla_title: 'কোম্পানীগঞ্জ (সিলেট)', type: 'UPAZILA', lat: 25.08, lon: 91.77, subtitle: 'Sylhet District • Bholaganj Basin' },

  // BANBEIS Institutions & Shelters
  { id: 1, title: 'Sonagazi Govt College', bangla_title: 'সোনাগাজী সরকারি কলেজ', type: 'COLLEGE', lat: 22.8485, lon: 91.3912, subtitle: 'Sonagazi, Feni • Verified Shelter (Capacity: 1,500)' },
  { id: 2, title: 'Mangalkandi High School & Cyclone Shelter', bangla_title: 'মঙ্গলকান্দি উচ্চ বিদ্যালয়', type: 'CYCLONE_SHELTER', lat: 22.8610, lon: 91.3780, subtitle: 'Sonagazi, Feni • Verified Shelter (Capacity: 800)' },
  { id: 3, title: 'Char Chandia High School', bangla_title: 'চর চান্দিয়া উচ্চ বিদ্যালয়', type: 'SCHOOL', lat: 22.8350, lon: 91.4020, subtitle: 'Sonagazi, Feni • Coastal Shelter (Capacity: 600)' },
  { id: 4, title: 'Ahmadpur High School & Cyclone Shelter', bangla_title: 'আহমদপুর উচ্চ বিদ্যালয়', type: 'CYCLONE_SHELTER', lat: 22.8250, lon: 91.3700, subtitle: 'Sonagazi, Feni • Ground Shelter (Capacity: 750)' },
  { id: 5, title: 'BRAC Relief Hub – Sonagazi', bangla_title: 'ব্র্যাক রিলিফ হাব সোনাগাজী', type: 'NGO', lat: 22.8430, lon: 91.3850, subtitle: 'Sonagazi, Feni • Emergency Aid Station' },
  { id: 6, title: 'Parshuram Govt College', bangla_title: 'পরশুরাম সরকারি কলেজ', type: 'COLLEGE', lat: 23.1950, lon: 91.4400, subtitle: 'Parshuram, Feni • Verified Shelter (Capacity: 1,200)' },
  { id: 7, title: 'Fulgazi Govt Pilot High School', bangla_title: 'ফুলগাজী সরকারি পাইলট হাই স্কুল', type: 'SCHOOL', lat: 23.1450, lon: 91.4280, subtitle: 'Fulgazi, Feni • Verified Shelter (Capacity: 850)' },
  { id: 8, title: 'BDRCS Flood Response Camp – Parshuram', bangla_title: 'রেড ক্রিসেন্ট ক্যাম্প পরশুরাম', type: 'NGO', lat: 23.2100, lon: 91.4420, subtitle: 'Parshuram, Feni • Red Crescent Squad' },
  { id: 9, title: 'Parshuram Model High School & Shelter', bangla_title: 'পরশুরাম মডেল উচ্চ বিদ্যালয়', type: 'SCHOOL', lat: 23.2180, lon: 91.4450, subtitle: 'Parshuram, Feni • Verified Shelter (Capacity: 950)' },
  { id: 10, title: 'Companiganj Govt High School', bangla_title: 'কোম্পানীগঞ্জ সরকারি উচ্চ বিদ্যালয়', type: 'SCHOOL', lat: 22.7680, lon: 91.2580, subtitle: 'Companiganj, Noakhali • Verified Shelter (Capacity: 1,100)' },
  { id: 11, title: 'Senbagh Degree College', bangla_title: 'সেনবাগ ডিগ্রি কলেজ', type: 'COLLEGE', lat: 22.8450, lon: 91.2150, subtitle: 'Senbagh, Noakhali • Verified Shelter (Capacity: 1,350)' },
  { id: 12, title: 'BDRCS Noakhali District Unit', bangla_title: 'রেড ক্রিসেন্ট নোয়াখালী', type: 'NGO', lat: 22.8100, lon: 91.2200, subtitle: 'Senbagh, Noakhali • NGO Headquarters' },
  { id: 15, title: 'Munshirhat Ali Azam High School & College', bangla_title: 'মুন্সীরহাট আলী আজম উচ্চ বিদ্যালয়', type: 'COLLEGE', lat: 23.0450, lon: 91.4320, subtitle: 'Fulgazi, Feni • Verified Shelter (Capacity: 1,100)' },
  { id: 20, title: 'Gowainghat Govt High School', bangla_title: 'গোয়াইনঘাট সরকারি উচ্চ বিদ্যালয়', type: 'SCHOOL', lat: 25.0550, lon: 91.9100, subtitle: 'Gowainghat, Sylhet • Haor Shelter (Capacity: 1,000)' },
  { id: 21, title: 'Jaintapur Degree College', bangla_title: 'জৈন্তাপুর ডিগ্রি কলেজ', type: 'COLLEGE', lat: 25.0800, lon: 92.0250, subtitle: 'Jaintapur, Sylhet • Border Shelter (Capacity: 750)' },
  { id: 22, title: 'BDRCS Sylhet Haor Response Unit', bangla_title: 'রেড ক্রিসেন্ট সিলেট হাওর', type: 'NGO', lat: 25.0350, lon: 91.8900, subtitle: 'Gowainghat, Sylhet • Haor Boat Base' },
  { id: 23, title: 'Companiganj Thana Sadar High School', bangla_title: 'কোম্পানীগঞ্জ থানা সদর উচ্চ বিদ্যালয়', type: 'SCHOOL', lat: 25.0850, lon: 91.7750, subtitle: 'Companiganj, Sylhet • Verified Shelter (Capacity: 1,300)' },
  { id: 24, title: 'BRAC Sylhet Haor Flood Response Hub', bangla_title: 'ব্র্যাক সিলেট হাওর কেন্দ্র', type: 'NGO', lat: 25.0200, lon: 91.9300, subtitle: 'Gowainghat, Sylhet • Relief Depot' },
  { id: 35, title: 'Feni Government College & Shelter', bangla_title: 'ফেনী সরকারি কলেজ', type: 'COLLEGE', lat: 23.0080, lon: 91.4050, subtitle: 'Feni Sadar • Verified Shelter (Capacity: 2,500)' },
  { id: 36, title: 'Feni Central High School Relief Camp', bangla_title: 'ফেনী সেন্ট্রাল হাই স্কুল', type: 'SCHOOL', lat: 22.9850, lon: 91.4250, subtitle: 'Feni Sadar • Town Camp (Capacity: 1,200)' },
];

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const filterLocal = (q: string): SearchResult[] => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return SEARCHABLE_ENTITIES.filter(e =>
      e.title.toLowerCase().includes(term) ||
      (e.bangla_title && e.bangla_title.includes(term)) ||
      (e.subtitle && e.subtitle.toLowerCase().includes(term)) ||
      e.type.toLowerCase().includes(term)
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const localMatches = filterLocal(query);
    setResults(localMatches);
    setIsOpen(localMatches.length > 0);

    try {
      const res = await apiClient.get<SearchResult[]>(`/geo/search?q=${encodeURIComponent(query)}`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setResults(res.data);
        setIsOpen(true);
      }
    } catch {}
  };

  const handleSelectResult = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/map?lat=${result.lat}&lon=${result.lon}&zoom=14&title=${encodeURIComponent(result.title)}&type=${result.type}`);
  };

  const navItems = [
    { label: 'Overview', path: '/overview', icon: LayoutDashboard },
    { label: 'Response Map', path: '/map', icon: Map },
    { label: 'Relief Operations', path: '/operations', icon: Truck },
    { label: 'About', path: '/about', icon: BookOpen },
  ];

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between z-30 sticky top-0 shadow-sm">
      {/* Brand & Subtitle */}
      <div className="flex items-center gap-6">
        <div 
          onClick={() => navigate('/overview')}
          className="cursor-pointer select-none"
        >
          <div className="text-base font-bold tracking-tight text-slate-900 leading-tight">
            RELIEFNET
          </div>
          <div className="text-[11px] text-slate-500 font-medium leading-none">
            Flood Relief Coordination Platform
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-200">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/');
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Global Location & Institution Search */}
      <div className="relative flex-1 max-w-sm mx-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search district, upazila, school, college, NGO..."
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                if (val.trim().length > 0) {
                  const local = filterLocal(val);
                  setResults(local);
                  setIsOpen(local.length > 0);

                  apiClient.get<SearchResult[]>(`/geo/search?q=${encodeURIComponent(val)}`)
                    .then((res) => {
                      if (Array.isArray(res.data) && res.data.length > 0) {
                        setResults(res.data);
                        setIsOpen(true);
                      }
                    })
                    .catch(() => {});
                } else {
                  setResults([]);
                  setIsOpen(false);
                }
              }}
              onFocus={() => {
                if (query.trim().length > 0) {
                  const local = filterLocal(query);
                  setResults(local);
                  setIsOpen(local.length > 0);
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all font-sans"
            />
          </div>
        </form>

        {/* Live Search Results Dropdown */}
        {isOpen && Array.isArray(results) && results.length > 0 && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden z-50 max-h-72 overflow-y-auto">
              {results.map((r) => (
                <div
                  key={`${r.type}-${r.id}`}
                  onClick={() => handleSelectResult(r)}
                  className="p-2 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <div className="font-medium text-slate-900 flex items-center gap-1.5">
                      <span>{r.title}</span>
                      <span className="text-[10px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase font-mono">
                        {r.type}
                      </span>
                    </div>
                    {r.subtitle && (
                      <div className="text-[11px] text-slate-500">{r.subtitle}</div>
                    )}
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* User Controls */}
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-800">{user.full_name}</span>
              <span className="text-[10px] text-slate-500 font-mono capitalize">{user.role.toLowerCase()}</span>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Sign Out"
              className="p-1.5 rounded-md border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
          >
            <User className="w-3 h-3" />
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
