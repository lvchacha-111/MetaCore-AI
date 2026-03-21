import { useState } from 'react'
import { useAIConfigStore } from '@/store/aiConfigStore'
import { useThemeStore } from '@/store/themeStore'
import { testConnection } from '@/services/ai/client'
import type { AIServiceConfig } from '@/types/ai'
import { Pencil, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  service: AIServiceConfig
  onEdit: () => void
}

export default function ServiceCard({ service, onEdit }: Props) {
  const { removeService, setActive, activeServiceId, updateService } = useAIConfigStore()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<boolean | null>(null)
  const isActive = activeServiceId === service.id

  async function handleTest() {
    setTesting(true)
    setTestResult(null)
    const ok = await testConnection(service)
    setTestResult(ok)
    if (ok) updateService(service.id, { enabled: true })
    setTesting(false)
  }

  return (
    <div className={cn(
      'glass-card p-4 transition-all duration-200',
      isActive && (isDark
        ? 'ring-1 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
        : 'ring-1 ring-indigo-400/30 shadow-lg shadow-indigo-500/5')
    )}>
      <div className="flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-slate-800')}>
              {service.name}
            </span>
            {service.enabled && (
              <span className={cn(
                'text-[10px] px-1.5 py-0.5 rounded-full font-medium border',
                isDark
                  ? 'bg-green-950/50 text-green-300 border-green-900/30'
                  : 'bg-green-50 text-green-600 border-green-200'
              )}>
                已启用
              </span>
            )}
            {isActive && (
              <span className={cn(
                'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                isDark ? 'bg-indigo-950/50 text-indigo-300' : 'bg-indigo-100 text-indigo-600'
              )}>
                使用中
              </span>
            )}
          </div>
          <div className={cn('text-[11px] truncate', isDark ? 'text-slate-500' : 'text-slate-400')}>
            {service.baseURL} · {service.model}
          </div>
          <div className={cn('text-[11px] mt-0.5', isDark ? 'text-slate-600' : 'text-slate-400')}>
            {service.apiKey ? '已配置 API Key' : '未配置 API Key'}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {testResult === true && <CheckCircle size={18} className="text-green-400" />}
          {testResult === false && <XCircle size={18} className="text-red-400" />}

          <button
            onClick={handleTest}
            disabled={testing || !service.apiKey}
            className={cn(
              'text-xs px-2.5 py-1 rounded-lg transition-all flex items-center gap-1',
              isDark
                ? 'bg-slate-700/80 hover:bg-slate-600 disabled:opacity-40 text-slate-200'
                : 'bg-indigo-50 hover:bg-indigo-100 disabled:opacity-40 text-indigo-600'
            )}
          >
            {testing && <Loader2 size={11} className="animate-spin" />}
            测试
          </button>

          <button
            onClick={() => setActive(service.id)}
            className={cn(
              'text-xs px-2.5 py-1 rounded-lg transition-all',
              isActive
                ? isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'
                : isDark ? 'bg-slate-700/80 hover:bg-slate-600 text-slate-200' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
            )}
          >
            {isActive ? '使用中' : '使用'}
          </button>

          <button onClick={onEdit} className={cn(
            'p-1.5 rounded-lg transition-colors',
            isDark ? 'text-slate-500 hover:text-white hover:bg-slate-700' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
          )}>
            <Pencil size={13} />
          </button>
          <button onClick={() => removeService(service.id)} className={cn(
            'p-1.5 rounded-lg transition-colors',
            isDark ? 'text-slate-500 hover:text-red-400 hover:bg-red-950/30' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
          )}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
