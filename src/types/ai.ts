export type AIProvider = 'openai' | 'deepseek' | 'qwen' | 'siliconflow' | 'ollama' | 'custom'

export interface AIServiceConfig {
  id: string
  name: string
  provider: AIProvider
  apiKey: string
  baseURL: string
  model: string
  enabled: boolean
}

export const DEFAULT_SERVICES: Omit<AIServiceConfig, 'id' | 'apiKey'>[] = [
  { name: 'DeepSeek', provider: 'deepseek', baseURL: 'https://api.deepseek.com/v1', model: 'deepseek-chat', enabled: false },
  { name: '硅基流动', provider: 'siliconflow', baseURL: 'https://api.siliconflow.cn/v1', model: 'deepseek-ai/DeepSeek-V3', enabled: false },
  { name: '通义千问', provider: 'qwen', baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-plus', enabled: false },
  { name: 'OpenAI', provider: 'openai', baseURL: 'https://api.openai.com/v1', model: 'gpt-4o', enabled: false },
  { name: 'Ollama (本地)', provider: 'ollama', baseURL: 'http://localhost:11434/v1', model: 'llama3', enabled: false },
]
