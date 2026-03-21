import { useState } from 'react'
import { useAIConfigStore } from '@/store/aiConfigStore'
import ServiceCard from '@/components/settings/ServiceCard'
import AIServiceForm from '@/components/settings/AIServiceForm'
import type { AIServiceConfig } from '@/types/ai'
import { Plus } from 'lucide-react'

export default function SettingsPage() {
  const { services } = useAIConfigStore()
  const [editing, setEditing] = useState<AIServiceConfig | null>(null)
  const [adding, setAdding] = useState(false)

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">AI 服务配置</h1>
          <p className="text-sm text-slate-400 mt-1">配置 API Key 后即可使用对应服务</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-colors"
        >
          <Plus size={16} /> 添加服务
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {services.map((svc) => (
          <ServiceCard key={svc.id} service={svc} onEdit={() => setEditing(svc)} />
        ))}
      </div>

      {(editing || adding) && (
        <AIServiceForm
          initial={editing ?? undefined}
          onClose={() => { setEditing(null); setAdding(false) }}
        />
      )}
    </div>
  )
}
