import type { PinAssignment } from '@/types/hardware'

const VOLTAGE_COLORS: Record<string, string> = {
  '3V3': 'bg-green-950/60 text-green-300 border-green-900/40',
  '3.3V': 'bg-green-950/60 text-green-300 border-green-900/40',
  '5V': 'bg-amber-950/60 text-amber-300 border-amber-900/40',
  'GND': 'bg-red-950/60 text-red-300 border-red-900/40',
}

export default function PinTable({ pins }: { pins: PinAssignment[] }) {
  return (
    <div className="glass-card p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-sm font-semibold text-white">引脚分配表</span>
          <span className="text-xs text-slate-600">Pin Assignment</span>
        </div>
        <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-800/60 rounded-full">{pins.length} pins</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-700/60">
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">#</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">引脚名</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">功能</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">连接设备</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">电压</th>
            </tr>
          </thead>
          <tbody>
            {pins.map((p, i) => (
              <tr key={i} className="border-b border-slate-800/40 hover:bg-indigo-500/5 transition-colors duration-150 group">
                <td className="px-5 py-3">
                  <span className="font-mono text-[11px] px-2 py-0.5 bg-indigo-950/60 text-indigo-300 rounded-md border border-indigo-900/50 group-hover:bg-indigo-900/60 transition-colors">{p.pinNumber}</span>
                </td>
                <td className="px-5 py-3 text-white font-medium text-[13px]">{p.pinName}</td>
                <td className="px-5 py-3 text-slate-400 text-[13px]">{p.function}</td>
                <td className="px-5 py-3 text-slate-300 text-[13px]">{p.connectedTo}</td>
                <td className="px-5 py-3">
                  {p.voltage ? (
                    <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${VOLTAGE_COLORS[p.voltage] ?? 'bg-slate-800 text-slate-300 border-slate-700'}`}>{p.voltage}</span>
                  ) : (
                    <span className="text-slate-600 text-xs">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
