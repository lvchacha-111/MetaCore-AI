import { useState } from 'react'
import { useAIConfigStore } from '@/store/aiConfigStore'
import { useThemeStore } from '@/store/themeStore'
import type { AIServiceConfig, AIProvider } from '@/types/ai'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  initial?: AIServiceConfig
  onClose: () => void
}

const PROVIDERS: { value: AIProvider; label: string }[] = [
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'siliconflow', label: '硅基流动' },
  { value: 'qwen', label: '通义千问' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'ollama', label: 'Ollama (本地)' },
  { value: 'custom', label: '自定义' },
]

const DEFAULTS: Record<AIProvider, { baseURL: string; model: string }> = {
  deepseek: { baseURL: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
  siliconflow: { baseURL: 'https://api.siliconflow.cn/v1', model: 'deepseek-ai/DeepSeek-V3' },
  qwen: { baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-plus' },
  openai: { baseURL: 'https://api.openai.com/v1', model: 'gpt-4o' },
  ollama: { baseURL: 'http://localhost:11434/v1', model: 'llama3' },
  custom: { baseURL: '', model: '' },
}

export default function AIServiceForm({ initial, onClose }: Props) {
  const { addService, updateService } = useAIConfigStore()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const [form, setForm] = useState({
    name: initial?.name ?? '',
    provider: initial?.provider ?? 'deepseek' as AIProvider,
    apiKey: initial?.apiKey ?? '',
    baseURL: initial?.baseURL ?? DEFAULTS.deepseek.baseURL,
    model: initial?.model ?? DEFAULTS.deepseek.model,
    enabled: initial?.enabled ?? false,
  })

  function handleProviderChange(p: AIProvider) {
    setForm(f => ({ ...f, provider: p, ...DEFAULTS[p], name: f.name || PROVIDERS.find(x => x.value === p)!.label }))
  }

  function handleSave() {
    if (!form.name || !form.baseURL || !form.model) return
    if (initial) {
      updateService(initial.id, form)
    } else {
      addService(form)
    }
    onClose()
  }

  const inputClass = cn(
    'w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200',
    isDark
      ? 'bg-slate-700/80 border border-slate-600/50 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
      : 'bg-white/80 border border-indigo-200/60 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10'
  )

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 fade-in">
      <div className={cn(
        'w-full max-w-md rounded-2xl p-6 shadow-2xl fade-in-up',
        isDark
          ? 'bg-slate-800/95 border border-slate-700/50'
          : 'bg-white/95 border border-indigo-200/50 shadow-indigo-500/5'
      )}>
        <div className="flex items-center justify-between mb-5">
          <h2 className={cn('text-base font-bold', isDark ? 'text-white' : 'text-slate-800')}>
            {initial ? '编辑服务' : '添加 AI 服务'}
          </h2>
          <button
            onClick={onClose}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              isDark ? 'text-slate-500 hover:text-white hover:bg-slate-700' : 'text-slate-400 hover:text-slate-600 hover:bg-indigo-50'
            )}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className={cn('text-xs font-medium', isDark ? 'text-slate-400' : 'text-slate-500')}>服务商</span>
            <select
              value={form.provider}
              onChange={e => handleProviderChange(e.target.value as AIProvider)}
              className={inputClass}
            >
              {PROVIDERS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={cn('text-xs font-medium', isDark ? 'text-slate-400' : 'text-slate-500')}>名称</span>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="自定义名称" className={inputClass} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={cn('text-xs font-medium', isDark ? 'text-slate-400' : 'text-slate-500')}>API Key</span>
            <input type="password" value={form.apiKey} onChange={e => setForm(f => ({ ...f, apiKey: e.target.value }))} placeholder="sk-..." className={inputClass} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={cn('text-xs font-medium', isDark ? 'text-slate-400' : 'text-slate-500')}>Base URL</span>
            <input value={form.baseURL} onChange={e => setForm(f => ({ ...f, baseURL: e.target.value }))} className={inputClass} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={cn('text-xs font-medium', isDark ? 'text-slate-400' : 'text-slate-500')}>模型</span>
            <input value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} className={inputClass} />
          </label>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className={cn(
              'flex-1 py-2 text-sm rounded-xl transition-colors',
              isDark
                ? 'text-slate-300 bg-slate-700/80 hover:bg-slate-600'
                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
            )}
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className={cn(
              'flex-1 py-2 text-sm text-white rounded-xl transition-all shadow-lg',
              'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 hover:-translate-y-0.5 active:translate-y-0'
            )}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}
