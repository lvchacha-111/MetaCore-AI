/** SVG 芯片引脚可视化组件 — 按芯片型号渲染引脚图，支持悬停查看连接详情 */
import { useState } from 'react'
import type { PinAssignment, ChipTarget } from '@/types/hardware'
import { useThemeStore } from '@/store/themeStore'

interface Props {
  pins: PinAssignment[]
  chipType: ChipTarget
}

// 芯片引脚定义（标准布局）
const CHIP_DEFS: Record<ChipTarget, { name: string; totalPins: number; leftPins: string[]; rightPins: string[] }> = {
  'ESP32': {
    name: 'ESP32-WROOM-32',
    totalPins: 38,
    leftPins: ['GND', '3V3', 'EN', 'IO36', 'IO39', 'IO34', 'IO35', 'IO32', 'IO33', 'IO25', 'IO26', 'IO27', 'IO14', 'IO12', 'IO13', 'IO9', 'IO10', 'IO11', '3V3'],
    rightPins: ['GND', 'IO0', 'IO4', 'IO16', 'IO17', 'IO5', 'IO18', 'IO19', 'IO21', 'RXD0', 'TXD0', 'IO22', 'IO23', 'GND', 'IO2', 'IO15', 'GND', 'GND', 'GND'],
  },
  'ESP32-S3': {
    name: 'ESP32-S3-WROOM-1',
    totalPins: 38,
    leftPins: ['GND', '3V3', 'EN', 'IO0', 'IO1', 'IO2', 'IO3', 'IO4', 'IO5', 'IO6', 'IO7', 'IO8', 'IO9', 'IO10', 'IO11', 'IO12', 'IO13', 'IO14', '3V3'],
    rightPins: ['GND', 'IO46', 'IO45', 'IO44', 'IO43', 'IO42', 'IO41', 'IO40', 'IO39', 'IO38', 'IO37', 'IO36', 'IO35', 'IO34', 'IO33', 'IO32', 'IO21', 'IO20', 'GND'],
  },
  'STM32F103': {
    name: 'STM32F103C8T6',
    totalPins: 48,
    leftPins: ['VBAT', 'PC13', 'PC14', 'PC15', 'PD0', 'PD1', 'NRST', 'VSSA', 'VDDA', 'PA0', 'PA1', 'PA2', 'PA3', 'PA4', 'PA5', 'PA6', 'PA7', 'PB0', 'PB1', 'PB2', 'PB10', 'PB11', 'VSS', 'VDD'],
    rightPins: ['PB12', 'PB13', 'PB14', 'PB15', 'PA8', 'PA9', 'PA10', 'PA11', 'PA12', 'PA13', 'PA14', 'PA15', 'PB3', 'PB4', 'PB5', 'PB6', 'PB7', 'PB8', 'PB9', 'VSS', 'VDD', 'PC0', 'PC1', 'BOOT0'],
  },
  'STM32F4': {
    name: 'STM32F407VGT6',
    totalPins: 100,
    leftPins: ['VBAT', 'PC13', 'PC14', 'PC15', 'PI8', 'PI9', 'PI10', 'PI11', 'VCAP', 'VSSA', 'VDDA', 'PA0', 'PA1', 'PA2', 'PA3', 'PA4', 'PA5', 'PA6', 'PA7', 'PB0', 'PB1', 'PB2', 'PF0', 'PF1', 'PF2', 'PF3', 'PF4', 'PF5', 'PF6', 'PF7', 'PF8', 'PF9', 'PF10', 'PF11', 'PF12', 'PF13', 'PF14', 'PF15', 'PG0', 'PG1', 'VSS', 'VDD', 'PA8', 'PA9', 'PA10', 'PA11', 'PA12', 'PA13'],
    rightPins: ['PC0', 'PC1', 'PC2', 'PC3', 'PC4', 'PC5', 'PC6', 'PC7', 'PC8', 'PC9', 'PC10', 'PC11', 'PC12', 'PD0', 'PD1', 'PD2', 'PD3', 'PD4', 'PD5', 'PD6', 'PD7', 'PD8', 'PD9', 'PD10', 'PD11', 'PD12', 'PD13', 'PD14', 'PD15', 'PG2', 'PG3', 'PG4', 'PG5', 'PG6', 'PG7', 'PG8', 'VSS', 'VDD', 'PG9', 'PG10', 'PG11', 'PG12', 'PG13', 'PG14', 'PG15', 'PB3', 'PB4', 'PB5', 'PB6', 'PB7'],
  },
}

// 电源/地线/特殊引脚颜色
const POWER_COLORS: Record<string, string> = {
  '3V3': '#22c55e',
  '3.3V': '#22c55e',
  '5V': '#f59e0b',
  'GND': '#ef4444',
  'VCC': '#22c55e',
  'VBAT': '#f59e0b',
  'VDD': '#22c55e',
  'VSSA': '#ef4444',
  'VDDA': '#22c55e',
  'VSS': '#ef4444',
  'VCAP': '#8b5cf6',
  'EN': '#6366f1',
  'NRST': '#ef4444',
  'BOOT0': '#6366f1',
}

/** 判断是否为电源引脚 */
const isPowerPin = (name: string) =>
  ['3V3', '3.3V', '5V', 'VCC', 'VDD', 'VDDA', 'VBAT', 'VCAP'].some(k => name.includes(k))

/** 判断是否为地线引脚 */
const isGndPin = (name: string) =>
  ['GND', 'VSS', 'VSSA'].some(k => name.includes(k))

/** 判断是否为特殊功能引脚（复位、使能、启动配置等） */
const isSpecialPin = (name: string) =>
  ['EN', 'NRST', 'BOOT0'].some(k => name.includes(k))

/** 根据引脚名称返回对应的显示颜色 */
function getPinColor(pinName: string): string {
  for (const key of Object.keys(POWER_COLORS)) {
    if (pinName.includes(key)) return POWER_COLORS[key]
  }
  return '#6366f1'
}

/**
 * 芯片引脚图组件
 * @description 按照芯片封装渲染 SVG 引脚图，支持鼠标悬停查看连接详情，
 *              电源/GND/特殊引脚始终着色，支持亮色/暗色主题
 */
export default function PinDiagram({ pins, chipType }: Props) {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; pin: PinAssignment } | null>(null)
  const isDark = useThemeStore(s => s.theme) === 'dark'

  const chipDef = CHIP_DEFS[chipType] ?? CHIP_DEFS['ESP32']

  // 按 pinNumber 和 pinName 建立双向映射，兼容 GPIO/IO 格式
  const pinMap = new Map<string, PinAssignment>()
  for (const pin of pins) {
    pinMap.set(pin.pinName, pin)
    pinMap.set(pin.pinNumber, pin)
    if (pin.pinNumber.startsWith('GPIO')) pinMap.set('IO' + pin.pinNumber.slice(4), pin)
    if (pin.pinNumber.startsWith('IO')) pinMap.set('GPIO' + pin.pinNumber.slice(2), pin)
  }

  const SVG_WIDTH = 480
  const CHIP_HEIGHT = Math.max(chipDef.leftPins.length, chipDef.rightPins.length) * 28 + 40
  const CHIP_WIDTH = 220
  const PIN_LENGTH = 36
  const ROW_START_Y = (CHIP_HEIGHT - (Math.max(chipDef.leftPins.length, chipDef.rightPins.length) * 28)) / 2 + 14

  /** 处理引脚悬停事件，定位 tooltip 并显示连接信息 */
  function handlePinHover(pinName: string, side: 'left' | 'right', idx: number, e: React.MouseEvent) {
    setHoveredPin(`${side}-${idx}`)
    const assignment = pinMap.get(pinName)
    if (assignment) {
      const rect = (e.target as SVGElement).getBoundingClientRect()
      setTooltip({ x: rect.left + rect.width / 2, y: rect.top, pin: assignment })
    }
  }

  /** 清除引脚悬停状态并隐藏 tooltip */
  function handlePinLeave() {
    setHoveredPin(null)
    setTooltip(null)
  }

  /**
   * 计算单个引脚的渲染样式（fill、stroke、textFill）
   * @param pinName - 引脚名称（如 PA0、VDD、GND）
   * @param isHovered - 当前是否处于悬停状态
   * @param hasConnection - 是否有连接分配
   */
  function getPinStyles(pinName: string, isHovered: boolean, hasConnection: boolean) {
    const pinColor = getPinColor(pinName)
    const alwaysColored = isPowerPin(pinName) || isGndPin(pinName) || isSpecialPin(pinName)
    const colored = alwaysColored || hasConnection

    const fill = colored
      ? (isHovered ? pinColor : `${pinColor}99`)
      : (isDark ? '#1e293b' : '#cbd5e1')

    const stroke = colored ? pinColor : (isDark ? '#334155' : '#94a3b8')

    let textFill: string
    if (alwaysColored) {
      textFill = pinColor
    } else if (hasConnection) {
      textFill = '#e2e8f0'
    } else {
      textFill = isDark ? '#475569' : '#64748b'
    }

    return { pinColor, fill, stroke, textFill }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs text-indigo-400 font-medium">{chipDef.name} · {chipDef.totalPins} Pin</span>
        </div>
      </div>

      {/* 芯片 SVG */}
      <div className="flex justify-center">
        <svg
          width={SVG_WIDTH}
          height={CHIP_HEIGHT}
          viewBox={`0 0 ${SVG_WIDTH} ${CHIP_HEIGHT}`}
          className="overflow-visible"
        >
          {/* 芯片主体 */}
          <rect
            x={(SVG_WIDTH - CHIP_WIDTH) / 2}
            y={0}
            width={CHIP_WIDTH}
            height={CHIP_HEIGHT}
            rx={12}
            ry={12}
            fill="url(#chipGradient)"
            stroke="url(#chipBorder)"
            strokeWidth={2}
            className="filter drop-shadow-xl"
            style={{ filter: 'drop-shadow(0 8px 32px rgba(99,102,241,0.15))' }}
          />

          {/* 芯片顶部标签 */}
          <rect
            x={(SVG_WIDTH - CHIP_WIDTH) / 2 + 10}
            y={10}
            width={CHIP_WIDTH - 20}
            height={36}
            rx={6}
            fill="rgba(99,102,241,0.15)"
          />
          <text
            x={SVG_WIDTH / 2}
            y={30}
            textAnchor="middle"
            fill="#a5b4fc"
            fontSize={11}
            fontWeight={600}
            fontFamily="JetBrains Mono, monospace"
          >
            {chipDef.name}
          </text>

          {/* 引脚 — 左侧 */}
          {chipDef.leftPins.map((pinName, idx) => {
            const y = ROW_START_Y + idx * 28
            const isHovered = hoveredPin === `left-${idx}`
            const assignment = pinMap.get(pinName)
            const hasConnection = !!assignment
            const { pinColor, fill, stroke, textFill } = getPinStyles(pinName, isHovered, hasConnection)

            return (
              <g key={`left-${idx}`}>
                {/* 引脚线 */}
                <rect
                  x={(SVG_WIDTH - CHIP_WIDTH) / 2 - PIN_LENGTH}
                  y={y - 7}
                  width={PIN_LENGTH}
                  height={14}
                  rx={3}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHovered ? 1.5 : 0.5}
                  className="cursor-pointer transition-all duration-200"
                  style={{ transform: isHovered ? 'translateZ(8px)' : undefined }}
                  onMouseEnter={(e) => handlePinHover(pinName, 'left', idx, e)}
                  onMouseLeave={handlePinLeave}
                />
                {/* 引脚名称 */}
                <text
                  x={(SVG_WIDTH - CHIP_WIDTH) / 2 - PIN_LENGTH - 4}
                  y={y + 1}
                  textAnchor="end"
                  fill={textFill}
                  fontSize={8}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {pinName.length > 6 ? pinName.slice(0, 5) + '\u2026' : pinName}
                </text>
                {/* 连接点 */}
                {hasConnection && (
                  <circle
                    cx={(SVG_WIDTH - CHIP_WIDTH) / 2 - PIN_LENGTH - 2}
                    cy={y}
                    r={3}
                    fill={pinColor}
                    className="animate-pulse"
                    style={{ animationDuration: '2s' }}
                  />
                )}
              </g>
            )
          })}

          {/* 引脚 — 右侧 */}
          {chipDef.rightPins.map((pinName, idx) => {
            const y = ROW_START_Y + idx * 28
            const isHovered = hoveredPin === `right-${idx}`
            const assignment = pinMap.get(pinName)
            const hasConnection = !!assignment
            const { pinColor, fill, stroke, textFill } = getPinStyles(pinName, isHovered, hasConnection)

            return (
              <g key={`right-${idx}`}>
                {/* 引脚线 */}
                <rect
                  x={(SVG_WIDTH + CHIP_WIDTH) / 2}
                  y={y - 7}
                  width={PIN_LENGTH}
                  height={14}
                  rx={3}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHovered ? 1.5 : 0.5}
                  className="cursor-pointer transition-all duration-200"
                  style={{ transform: isHovered ? 'translateZ(8px)' : undefined }}
                  onMouseEnter={(e) => handlePinHover(pinName, 'right', idx, e)}
                  onMouseLeave={handlePinLeave}
                />
                {/* 引脚名称 */}
                <text
                  x={(SVG_WIDTH + CHIP_WIDTH) / 2 + PIN_LENGTH + 4}
                  y={y + 1}
                  textAnchor="start"
                  fill={textFill}
                  fontSize={8}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {pinName.length > 6 ? pinName.slice(0, 5) + '\u2026' : pinName}
                </text>
                {/* 连接点 */}
                {hasConnection && (
                  <circle
                    cx={(SVG_WIDTH + CHIP_WIDTH) / 2 + PIN_LENGTH + 2}
                    cy={y}
                    r={3}
                    fill={pinColor}
                    className="animate-pulse"
                    style={{ animationDuration: '2s' }}
                  />
                )}
              </g>
            )
          })}

          {/* 渐变定义 */}
          <defs>
            <linearGradient id="chipGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f0a2e" />
            </linearGradient>
            <linearGradient id="chipBorder" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 图例 */}
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {[
          { label: '电源 (3V3/5V)', color: '#22c55e' },
          { label: '地线 (GND)', color: '#ef4444' },
          { label: 'GPIO', color: '#6366f1' },
          { label: '特殊功能', color: '#8b5cf6' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-slate-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-3 py-2 rounded-xl shadow-2xl border border-indigo-500/30 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: 'translate(-50%, -100%)',
            background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98))',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="text-[10px] font-mono text-slate-400 mb-1">#{tooltip.pin.pinNumber} {tooltip.pin.pinName}</div>
          <div className="text-xs text-indigo-300 font-medium">{tooltip.pin.function}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{'\u2192'} {tooltip.pin.connectedTo}</div>
          {tooltip.pin.voltage && (
            <div className="text-[10px] mt-0.5" style={{ color: getPinColor(tooltip.pin.voltage) }}>{tooltip.pin.voltage}</div>
          )}
          <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-1.5 overflow-hidden">
            <div className="w-3 h-3 rotate-45 -mt-1 mx-auto" style={{ background: 'rgba(30,41,59,0.98)', borderRight: '1px solid rgba(99,102,241,0.3)', borderBottom: '1px solid rgba(99,102,241,0.3)' }} />
          </div>
        </div>
      )}
    </div>
  )
}
