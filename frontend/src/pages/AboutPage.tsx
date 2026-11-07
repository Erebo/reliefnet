import React from 'react';
import {
  Shield,
  Server,
  Database,
  BookOpen,
  Map,
  Code2,
  AlertTriangle,
  Radio,
  School,
  Truck,
  CheckCircle2,
  Layers,
  FileCheck2,
  ExternalLink,
  Flame,
  Info
} from 'lucide-react';

interface TechChipProps {
  icon: React.ElementType;
  label: string;
  sub: string;
  iconBg: string;
}

const TechChip: React.FC<TechChipProps> = ({ icon: Icon, label, sub, iconBg }) => (
  <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:border-slate-300 transition-all">
    <div className={`p-2.5 rounded-lg ${iconBg} flex-shrink-0`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div>
      <div className="text-xs font-bold text-slate-900">{label}</div>
      <div className="text-[11px] text-slate-500 font-medium">{sub}</div>
    </div>
  </div>
);

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 md:px-6 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
            <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            Humanitarian GIS Platform
          </span>
          <span className="text-xs text-slate-400 font-mono">v1.0.0 Production Architecture</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
          ReliefNet (ত্রাণনেট) 🇧🇩
        </h1>
        <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
          Bangladesh Flood Relief Coordination & Automated Gap Detection Platform. Designed for acute flood crises (such as the Feni, Noakhali, and Comilla Eastern Basin Floods) to eliminate aid duplication in roadside hubs and redirect scarce relief to stranded, underserved communities.
        </p>
      </div>

      {/* Technology Stack */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-sky-600" />
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            Production Technology Stack
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <TechChip
            icon={Server}
            label="FastAPI & Python 3.11"
            sub="REST API & Async Lifespan"
            iconBg="bg-emerald-600"
          />
          <TechChip
            icon={Map}
            label="React 18 & MapLibre GL"
            sub="WebGL GIS Vector Mapping"
            iconBg="bg-sky-600"
          />
          <TechChip
            icon={Database}
            label="PostgreSQL 16 & PostGIS"
            sub="Spatial Indexing & SQLite local"
            iconBg="bg-indigo-600"
          />
          <TechChip
            icon={Code2}
            label="Docker Compose & Vite"
            sub="Multi-container Orchestration"
            iconBg="bg-slate-700"
          />
        </div>
      </section>

      {/* Core Operational Workflow */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-600" />
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            End-to-End Operational Lifecycle
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          ReliefNet enforces a closed-loop disaster coordination pipeline to prevent uncoordinated distribution:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/60 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs mb-3">1</div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">Inbound Distress</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                SMS parser extracts Bangla numerals (০-৯), affected family counts, and critical need categories.
              </p>
            </div>
            <span className="text-[10px] font-mono text-sky-700 mt-3 font-semibold">/api/v1/sms/webhook</span>
          </div>

          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/60 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs mb-3">2</div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">Local Verification</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Clusters linked to local schools and cyclone shelters; field verifiers log headmaster confirmations.
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-700 mt-3 font-semibold">/api/v1/verification</span>
          </div>

          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/60 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-3">3</div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">Provider Matching</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Matches verified demand with provider inventories (food, water, medicine, rescue boats).
              </p>
            </div>
            <span className="text-[10px] font-mono text-indigo-700 mt-3 font-semibold">/api/v1/assignments</span>
          </div>

          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/60 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-3">4</div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">Ground Delivery</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Tracks transition: ASSIGNED → DISPATCHED → IN_TRANSIT → DELIVERED with households served proof.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 mt-3 font-semibold">/api/v1/deliveries</span>
          </div>

          <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/60 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs mb-3">5</div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">Gap Detection</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Automated spatial engine calculates unserved critical gaps and flags duplicate dispatches.
              </p>
            </div>
            <span className="text-[10px] font-mono text-rose-700 mt-3 font-semibold">/api/v1/gaps</span>
          </div>
        </div>
      </section>

      {/* Real vs Mock Data Lineage */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-emerald-600" />
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            Data Lineage & Operational Ground-Truth
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-bold text-slate-900">Administrative Boundaries (REAL)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              GeoJSON boundaries covering all 8 Divisions, 64 Districts, and Upazilas are sourced from the <strong>Bangladesh Bureau of Statistics (BBS)</strong> and verified via <strong>UN OCHA Humanitarian Data Exchange (HDX)</strong>.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-bold text-slate-900">Anchor Institutions (REAL)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Educational institutions, cyclone shelters, and emergency collection points in Feni and Noakhali are anchored to verified facilities from <strong>BANBEIS</strong> and <strong>OpenStreetMap</strong> with verified coordinates and local contact channels.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="text-xs font-bold text-slate-900">Flood Inundation Layers (SIMULATION)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clearly tagged synthetic polygon overlays (<code className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">source_label="SIMULATION"</code>) modeling flood extent along the Muhuri and Feni rivers, ensuring clear separation from official telemetry.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <h3 className="text-xs font-bold text-slate-900">Relief Provider Ledger (OPERATIONAL)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Models humanitarian organizations (e.g. Bangladesh Red Crescent Society, As-Sunnah Foundation, BRAC) with double-entry inventory tracking (<code className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">available</code>, <code className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">reserved</code>, <code className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">delivered</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Automated Spatial Gap Intelligence */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            Automated Gap & Duplication Intelligence Engine
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The background spatial engine continuously recalculates relief disparities across Upazilas and Unions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40">
            <div className="text-xs font-bold text-rose-900 mb-1">CRITICAL GAP</div>
            <p className="text-[11px] text-slate-600">
              Verified high-urgency distress cluster with 0 relief assignments and 0 deliveries.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
            <div className="text-xs font-bold text-amber-900 mb-1">RESPONSE GAP</div>
            <p className="text-[11px] text-slate-600">
              Relief mission assigned or dispatched but delivery is overdue past the SLA target window.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-violet-200 bg-violet-50/40">
            <div className="text-xs font-bold text-violet-900 mb-1">AID DUPLICATION</div>
            <p className="text-[11px] text-slate-600">
              Multiple organizations allocating overlapping cargo to the same sector while adjacent unions receive none.
            </p>
          </div>
        </div>
      </section>

      {/* Footer info */}
      <div className="text-center pb-6">
        <p className="text-xs text-slate-400">
          ReliefNet · Humanitarian Open Source Coordination Platform · Released under MIT License
        </p>
      </div>
    </div>
  );
};
