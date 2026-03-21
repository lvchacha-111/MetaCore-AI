import type { BOMItem } from '@/types/hardware'

export default function BOMTable({ bom }: { bom: BOMItem[] }) {
  const total = bom.reduce((s, b) => s + b.unitPrice * b.quantity, 0)
  return (
    <div className="glass-card p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-sm font-semibold text-white">采购清单</span>
          <span className="text-xs text-slate-600">BOM</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{bom.length} 种器件</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/30 border border-amber-900/30 rounded-full">
            <span className="text-xs text-slate-400">预估</span>
            <span className="text-sm font-bold text-amber-300">¥{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-700/60">
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">名称</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">型号</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">数量</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">单价</th>
              <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider">小计</th>
            </tr>
          </thead>
          <tbody>
            {bom.map((b, i) => (
              <tr key={i} className="border-b border-slate-800/40 hover:bg-cyan-500/5 transition-colors duration-150">
                <td className="px-5 py-3 text-white font-medium text-[13px]">{b.name}</td>
                <td className="px-5 py-3 font-mono text-[12px] text-slate-400">{b.model}</td>
                <td className="px-5 py-3 text-slate-300 text-[13px]">{b.quantity}</td>
                <td className="px-5 py-3 text-slate-400 text-[13px]">¥{b.unitPrice.toFixed(2)}</td>
                <td className="px-5 py-3 text-amber-300 font-semibold text-[13px]">¥{(b.unitPrice * b.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
