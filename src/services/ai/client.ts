/** AI API 客户端 — 统一调用 OpenAI 兼容协议的 AI 服务 */

import type { AIServiceConfig } from '@/types/ai'

/** 聊天消息 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/** AI 调用选项 */
export interface CallAIOptions {
  /** 温度参数，越低越确定性（默认 0.3） */
  temperature?: number
  /** 流式输出回调 */
  onChunk?: (text: string) => void
}

/**
 * 调用 AI 服务（支持流式 & 非流式）
 *
 * @param service  - AI 服务配置
 * @param messages - 聊天消息列表
 * @param options  - 调用选项，也可直接传入 onChunk 回调函数（向后兼容）
 */
export async function callAI(
  service: AIServiceConfig,
  messages: ChatMessage[],
  options?: CallAIOptions | ((text: string) => void)
): Promise<string> {
  // 兼容旧调用：如果 options 是函数，视为 onChunk
  const opts: CallAIOptions = typeof options === 'function'
    ? { onChunk: options }
    : (options ?? {})
  const temperature = opts.temperature ?? 0.3
  const onChunk = opts.onChunk

  const res = await fetch(`${service.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${service.apiKey}`
    },
    body: JSON.stringify({
      model: service.model,
      messages,
      stream: !!onChunk,
      temperature
    })
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`AI请求失败 (${res.status}): ${err}`)
  }

  if (!onChunk) {
    const data = await res.json()
    return data.choices[0].message.content as string
  }

  // 流式输出
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let full = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    for (const line of chunk.split('\n')) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6).trim()
      if (data === '[DONE]') break
      try {
        const json = JSON.parse(data)
        const text = json.choices?.[0]?.delta?.content ?? ''
        if (text) { full += text; onChunk(text) }
      } catch { /* skip */ }
    }
  }
  return full
}

/**
 * 测试 AI 服务连通性
 *
 * 向服务发送一条简单消息，若返回正常则视为连通。
 *
 * @param service - AI 服务配置
 * @returns 连通返回 true，否则 false
 */
export async function testConnection(service: AIServiceConfig): Promise<boolean> {
  try {
    await callAI(service, [{ role: 'user', content: 'hi' }])
    return true
  } catch {
    return false
  }
}
