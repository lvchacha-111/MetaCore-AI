import type { WiringEntry } from '@/types/hardware'

const WIRE_COLORS: Record<string, string> = {
  红: 'bg-red-500/20 text-red-300 border border-red-500/30',
  橙: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  黄: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  绿: 'bg-green-500/20 text-green-300 border border-green-500/30',
  蓝: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  紫: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  黑: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
  白: 'bg-slate-100/20 text-slate-100 border border-slate-300/30',
}

export default function WiringTable({ wiring }: { wiring: WiringEntry[] }) {
  return (
    <div className="glass-card p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-400" />
          <span className="text-sm font-semibold text-white">接线对照表</span>
          <span className="text-xs text-slate-600">Wiring Guide</span>
        </div>
        <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-800/60 rounded-full">{wiring.length} 条连接</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-700/60">
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">起点</th>
              <th className="text-left px-3 py-3 w-8 text-center">
                <svg width="16" height="16" viewBox="0 0 16 16" className="inline text-slate-600">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">终点</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">线色</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">备注</th>
            </tr>
          </thead>
          <tbody>
            {wiring.map((w, i) => (
              <tr key={i} className="border-b border-slate-800/40 hover:bg-violet-500/5 transition-colors duration-150">
                <td className="px-5 py-3 font-mono text-[12px] text-indigo-300">{w.from}</td>
                <td className="px-3 py-3 text-center text-slate-600 text-sm">→</td>
                <td className="px-5 py-3 font-mono text-[12px] text-green-300">{w.to}</td>
                <td className="px-5 py-3">
                  {w.wireColor ? (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${WIRE_COLORS[w.wireColor] ?? 'bg-slate-800 text-slate-300 border border-slate-700'}`}>{w.wireColor}</span>
                  ) : (
                    <span className="text-slate-600 text-xs">-</span>
                  )}
                </td>
                <td className="px-5 py-3 text-slate-400 text-[12px]">{w.note || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
