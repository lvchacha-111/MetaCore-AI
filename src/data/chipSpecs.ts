/** 芯片技术参数静态数据 — 为 AI prompt 提供引脚/外设/限制信息 */

import type { ChipSpec } from '@/types/hardware'

export const CHIP_SPECS: Record<string, ChipSpec> = {
  'ESP32': {
    name: 'ESP32',
    fullName: 'ESP32-WROOM-32',
    arch: 'Xtensa LX6 双核',
    flash: '4MB',
    sram: '520KB',
    clockSpeed: '240MHz',
    voltage: '3.3V',
    gpios: [
      { pin: 'GPIO0', altFunctions: ['CLK_OUT1', 'TOUCH1'], notes: '启动引脚，上电时需拉高' },
      { pin: 'GPIO1', altFunctions: ['UART0_TX'], notes: '默认 UART0 TX，烧录/调试用' },
      { pin: 'GPIO2', altFunctions: ['ADC2_CH2', 'TOUCH2'], notes: '启动引脚' },
      { pin: 'GPIO3', altFunctions: ['UART0_RX'], notes: '默认 UART0 RX，烧录/调试用' },
      { pin: 'GPIO4', altFunctions: ['ADC2_CH0', 'TOUCH0'] },
      { pin: 'GPIO5', altFunctions: ['VSPI_CS0'], notes: '启动时输出PWM' },
      { pin: 'GPIO12', altFunctions: ['ADC2_CH5', 'HSPI_MISO', 'TOUCH5'], notes: 'MTDI引脚，影响Flash电压' },
      { pin: 'GPIO13', altFunctions: ['ADC2_CH4', 'HSPI_MOSI', 'TOUCH4'] },
      { pin: 'GPIO14', altFunctions: ['ADC2_CH6', 'HSPI_CLK', 'TOUCH6'] },
      { pin: 'GPIO15', altFunctions: ['ADC2_CH3', 'HSPI_CS0', 'TOUCH3'], notes: '启动时输出PWM' },
      { pin: 'GPIO16', altFunctions: ['UART2_RX'] },
      { pin: 'GPIO17', altFunctions: ['UART2_TX'] },
      { pin: 'GPIO18', altFunctions: ['VSPI_CLK'] },
      { pin: 'GPIO19', altFunctions: ['VSPI_MISO'] },
      { pin: 'GPIO21', altFunctions: ['I2C_SDA'] },
      { pin: 'GPIO22', altFunctions: ['I2C_SCL'] },
      { pin: 'GPIO23', altFunctions: ['VSPI_MOSI'] },
      { pin: 'GPIO25', altFunctions: ['DAC1', 'ADC2_CH8'] },
      { pin: 'GPIO26', altFunctions: ['DAC2', 'ADC2_CH9'] },
      { pin: 'GPIO27', altFunctions: ['ADC2_CH7', 'TOUCH7'] },
      { pin: 'GPIO32', altFunctions: ['ADC1_CH4', 'TOUCH9'] },
      { pin: 'GPIO33', altFunctions: ['ADC1_CH5', 'TOUCH8'] },
      { pin: 'GPIO34', altFunctions: ['ADC1_CH6'], inputOnly: true, notes: '仅输入，无内部上拉' },
      { pin: 'GPIO35', altFunctions: ['ADC1_CH7'], inputOnly: true, notes: '仅输入，无内部上拉' },
      { pin: 'GPIO36', altFunctions: ['ADC1_CH0', 'VP'], inputOnly: true, notes: '仅输入，无内部上拉' },
      { pin: 'GPIO39', altFunctions: ['ADC1_CH3', 'VN'], inputOnly: true, notes: '仅输入，无内部上拉' },
    ],
    peripherals: [
      { name: 'I2C0', type: 'I2C', defaultPins: { SDA: 'GPIO21', SCL: 'GPIO22' } },
      { name: 'HSPI', type: 'SPI', defaultPins: { MOSI: 'GPIO13', MISO: 'GPIO12', CLK: 'GPIO14', CS: 'GPIO15' } },
      { name: 'VSPI', type: 'SPI', defaultPins: { MOSI: 'GPIO23', MISO: 'GPIO19', CLK: 'GPIO18', CS: 'GPIO5' } },
      { name: 'UART0', type: 'UART', defaultPins: { TX: 'GPIO1', RX: 'GPIO3' } },
      { name: 'UART1', type: 'UART', defaultPins: { TX: 'GPIO10', RX: 'GPIO9' } },
      { name: 'UART2', type: 'UART', defaultPins: { TX: 'GPIO17', RX: 'GPIO16' } },
      { name: 'DAC1', type: 'DAC', defaultPins: { OUT: 'GPIO25' } },
      { name: 'DAC2', type: 'DAC', defaultPins: { OUT: 'GPIO26' } },
    ],
    bootPins: ['GPIO0', 'GPIO2', 'GPIO5', 'GPIO12', 'GPIO15'],
    restrictions: [
      'GPIO6-11 连接内部 Flash，不可用作普通 GPIO',
      'GPIO34/35/36/39 仅支持输入，无内部上拉/下拉',
      'GPIO12(MTDI) 上电时电平影响 Flash 电压，默认应拉低',
      'WiFi 启用时 ADC2 不可用',
      'I2C/SPI 引脚可重映射到任意 GPIO，但推荐使用默认引脚',
    ],
  },

  'ESP32-S3': {
    name: 'ESP32-S3',
    fullName: 'ESP32-S3-WROOM-1',
    arch: 'Xtensa LX7 双核',
    flash: '8MB',
    sram: '512KB',
    clockSpeed: '240MHz',
    voltage: '3.3V',
    gpios: [
      { pin: 'GPIO0', altFunctions: ['RTC_GPIO0', 'TOUCH1'], notes: '启动引脚' },
      { pin: 'GPIO1', altFunctions: ['ADC1_CH0', 'TOUCH2'] },
      { pin: 'GPIO2', altFunctions: ['ADC1_CH1', 'TOUCH3'] },
      { pin: 'GPIO3', altFunctions: ['ADC1_CH2', 'TOUCH4'], notes: 'Strapping 引脚' },
      { pin: 'GPIO4', altFunctions: ['ADC1_CH3', 'TOUCH5'] },
      { pin: 'GPIO5', altFunctions: ['ADC1_CH4', 'TOUCH6'] },
      { pin: 'GPIO6', altFunctions: ['ADC1_CH5', 'TOUCH7'] },
      { pin: 'GPIO7', altFunctions: ['ADC1_CH6', 'TOUCH8'] },
      { pin: 'GPIO8', altFunctions: ['ADC1_CH7', 'TOUCH9'] },
      { pin: 'GPIO9', altFunctions: ['ADC1_CH8', 'TOUCH10'] },
      { pin: 'GPIO10', altFunctions: ['ADC1_CH9', 'TOUCH11'] },
      { pin: 'GPIO11', altFunctions: ['ADC2_CH0', 'TOUCH12'] },
      { pin: 'GPIO12', altFunctions: ['ADC2_CH1', 'TOUCH13'] },
      { pin: 'GPIO13', altFunctions: ['ADC2_CH2', 'TOUCH14'] },
      { pin: 'GPIO14', altFunctions: ['ADC2_CH3'] },
      { pin: 'GPIO15', altFunctions: ['ADC2_CH4'] },
      { pin: 'GPIO16', altFunctions: ['ADC2_CH5'] },
      { pin: 'GPIO17', altFunctions: ['ADC2_CH6'] },
      { pin: 'GPIO18', altFunctions: ['ADC2_CH7'] },
      { pin: 'GPIO19', altFunctions: ['ADC2_CH8', 'USB_D-'], notes: '默认用于 USB-JTAG' },
      { pin: 'GPIO20', altFunctions: ['ADC2_CH9', 'USB_D+'], notes: '默认用于 USB-JTAG' },
      { pin: 'GPIO21', altFunctions: ['RTC_GPIO21'] },
      { pin: 'GPIO33', altFunctions: ['SPIIO4'] },
      { pin: 'GPIO34', altFunctions: ['SPIIO5'] },
      { pin: 'GPIO35', altFunctions: ['SPIIO6', 'SPI3_MOSI'] },
      { pin: 'GPIO36', altFunctions: ['SPIIO7', 'SPI3_CLK'] },
      { pin: 'GPIO37', altFunctions: ['SPIDQS', 'SPI3_MISO'] },
      { pin: 'GPIO38', altFunctions: ['FSPIWP'] },
      { pin: 'GPIO39', altFunctions: ['FSPICS1'] },
      { pin: 'GPIO40', altFunctions: ['FSPICS0'] },
      { pin: 'GPIO41', altFunctions: ['FSPIQ'] },
      { pin: 'GPIO42', altFunctions: ['FSPID'] },
      { pin: 'GPIO43', altFunctions: ['UART0_TX'] },
      { pin: 'GPIO44', altFunctions: ['UART0_RX'] },
      { pin: 'GPIO45', altFunctions: ['RTC_GPIO45'], notes: 'Strapping 引脚' },
      { pin: 'GPIO46', altFunctions: ['RTC_GPIO46'], inputOnly: true, notes: 'Strapping 引脚，仅输入' },
      { pin: 'GPIO47', altFunctions: ['RTC_GPIO47'] },
      { pin: 'GPIO48', altFunctions: ['RTC_GPIO48'] },
    ],
    peripherals: [
      { name: 'I2C0', type: 'I2C', defaultPins: { SDA: 'GPIO1', SCL: 'GPIO2' } },
      { name: 'SPI2', type: 'SPI', defaultPins: { MOSI: 'GPIO11', MISO: 'GPIO13', CLK: 'GPIO12' } },
      { name: 'SPI3', type: 'SPI', defaultPins: { MOSI: 'GPIO35', MISO: 'GPIO37', CLK: 'GPIO36' } },
      { name: 'UART0', type: 'UART', defaultPins: { TX: 'GPIO43', RX: 'GPIO44' } },
      { name: 'UART1', type: 'UART', defaultPins: { TX: 'GPIO17', RX: 'GPIO18' } },
      { name: 'USB', type: 'USB', defaultPins: { 'D+': 'GPIO19', 'D-': 'GPIO20' } },
    ],
    bootPins: ['GPIO0', 'GPIO3', 'GPIO45', 'GPIO46'],
    restrictions: [
      'GPIO22-32 连接 Flash/PSRAM，不可用',
      'GPIO26-32 用于 PSRAM（如配置了 Octal PSRAM）',
      'GPIO19/GPIO20 默认用于 USB-JTAG',
      'WiFi 启用时 ADC2 不可用',
    ],
  },

  'STM32F103': {
    name: 'STM32F103',
    fullName: 'STM32F103C8T6',
    arch: 'ARM Cortex-M3',
    flash: '64KB',
    sram: '20KB',
    clockSpeed: '72MHz',
    voltage: '3.3V',
    gpios: [
      { pin: 'PA0', altFunctions: ['UART2_CTS', 'ADC12_IN0', 'TIM2_CH1'] },
      { pin: 'PA1', altFunctions: ['UART2_RTS', 'ADC12_IN1', 'TIM2_CH2'] },
      { pin: 'PA2', altFunctions: ['UART2_TX', 'ADC12_IN2', 'TIM2_CH3'] },
      { pin: 'PA3', altFunctions: ['UART2_RX', 'ADC12_IN3', 'TIM2_CH4'] },
      { pin: 'PA4', altFunctions: ['SPI1_NSS', 'ADC12_IN4', 'DAC_OUT1'] },
      { pin: 'PA5', altFunctions: ['SPI1_SCK', 'ADC12_IN5', 'DAC_OUT2'] },
      { pin: 'PA6', altFunctions: ['SPI1_MISO', 'ADC12_IN6', 'TIM3_CH1'] },
      { pin: 'PA7', altFunctions: ['SPI1_MOSI', 'ADC12_IN7', 'TIM3_CH2'] },
      { pin: 'PA8', altFunctions: ['UART1_CK', 'TIM1_CH1', 'MCO'] },
      { pin: 'PA9', altFunctions: ['UART1_TX', 'TIM1_CH2'] },
      { pin: 'PA10', altFunctions: ['UART1_RX', 'TIM1_CH3'] },
      { pin: 'PA11', altFunctions: ['USB_DM', 'CAN_RX', 'TIM1_CH4'], notes: 'USB 与 CAN 共用，不可同时使用' },
      { pin: 'PA12', altFunctions: ['USB_DP', 'CAN_TX', 'TIM1_ETR'], notes: 'USB 与 CAN 共用，不可同时使用' },
      { pin: 'PA13', altFunctions: ['SWDIO', 'JTMS'], notes: '默认为 SWD 调试口（SWDIO）' },
      { pin: 'PA14', altFunctions: ['SWCLK', 'JTCK'], notes: '默认为 SWD 调试口（SWCLK）' },
      { pin: 'PA15', altFunctions: ['JTDI', 'SPI3_NSS', 'TIM2_CH1'], notes: '默认为 JTAG 引脚，需禁用 JTAG 后可用' },
      { pin: 'PB0', altFunctions: ['ADC12_IN8', 'TIM3_CH3'] },
      { pin: 'PB1', altFunctions: ['ADC12_IN9', 'TIM3_CH4'] },
      { pin: 'PB2', altFunctions: ['BOOT1'], notes: 'BOOT1 引脚' },
      { pin: 'PB3', altFunctions: ['JTDO', 'SPI3_SCK', 'TIM2_CH2'], notes: '默认为 JTAG 引脚，需禁用 JTAG 后可用' },
      { pin: 'PB4', altFunctions: ['JNTRST', 'SPI3_MISO', 'TIM3_CH1'], notes: '默认为 JTAG 引脚，需禁用 JTAG 后可用' },
      { pin: 'PB5', altFunctions: ['SPI3_MOSI', 'I2C1_SMBA', 'TIM3_CH2'] },
      { pin: 'PB6', altFunctions: ['I2C1_SCL', 'TIM4_CH1', 'UART1_TX'] },
      { pin: 'PB7', altFunctions: ['I2C1_SDA', 'TIM4_CH2', 'UART1_RX'] },
      { pin: 'PB8', altFunctions: ['I2C1_SCL', 'TIM4_CH3', 'CAN_RX'], notes: 'I2C1 重映射' },
      { pin: 'PB9', altFunctions: ['I2C1_SDA', 'TIM4_CH4', 'CAN_TX'], notes: 'I2C1 重映射' },
      { pin: 'PB10', altFunctions: ['I2C2_SCL', 'UART3_TX', 'TIM2_CH3'] },
      { pin: 'PB11', altFunctions: ['I2C2_SDA', 'UART3_RX', 'TIM2_CH4'] },
      { pin: 'PB12', altFunctions: ['SPI2_NSS', 'I2C2_SMBA', 'TIM1_BKIN'] },
      { pin: 'PB13', altFunctions: ['SPI2_SCK', 'TIM1_CH1N'] },
      { pin: 'PB14', altFunctions: ['SPI2_MISO', 'TIM1_CH2N'] },
      { pin: 'PB15', altFunctions: ['SPI2_MOSI', 'TIM1_CH3N'] },
      { pin: 'PC13', altFunctions: ['RTC_TAMPER', 'RTC_OUT'], notes: '板载 LED（部分开发板）' },
      { pin: 'PC14', altFunctions: ['OSC32_IN'], notes: 'LSE 振荡器引脚，使用外部晶振时不可用作 GPIO' },
      { pin: 'PC15', altFunctions: ['OSC32_OUT'], notes: 'LSE 振荡器引脚，使用外部晶振时不可用作 GPIO' },
      { pin: 'PD0', altFunctions: ['OSC_IN'], notes: 'HSE 振荡器引脚' },
      { pin: 'PD1', altFunctions: ['OSC_OUT'], notes: 'HSE 振荡器引脚' },
    ],
    peripherals: [
      { name: 'I2C1', type: 'I2C', defaultPins: { SDA: 'PB7', SCL: 'PB6' } },
      { name: 'I2C2', type: 'I2C', defaultPins: { SDA: 'PB11', SCL: 'PB10' } },
      { name: 'SPI1', type: 'SPI', defaultPins: { MOSI: 'PA7', MISO: 'PA6', CLK: 'PA5', CS: 'PA4' } },
      { name: 'SPI2', type: 'SPI', defaultPins: { MOSI: 'PB15', MISO: 'PB14', CLK: 'PB13', CS: 'PB12' } },
      { name: 'UART1', type: 'UART', defaultPins: { TX: 'PA9', RX: 'PA10' } },
      { name: 'UART2', type: 'UART', defaultPins: { TX: 'PA2', RX: 'PA3' } },
      { name: 'UART3', type: 'UART', defaultPins: { TX: 'PB10', RX: 'PB11' } },
      { name: 'CAN', type: 'CAN', defaultPins: { TX: 'PA12', RX: 'PA11' } },
      { name: 'USB', type: 'USB', defaultPins: { 'D+': 'PA12', 'D-': 'PA11' } },
    ],
    bootPins: ['BOOT0', 'PB2'],
    restrictions: [
      'PA13/PA14 默认为 SWD 调试口（SWDIO/SWCLK），重映射后可用作 GPIO',
      'PA15/PB3/PB4 默认为 JTAG 引脚，需禁用 JTAG 后才可用作 GPIO',
      'PA11/PA12 与 USB 和 CAN 共用，不可同时使用',
      'PC14/PC15 为 LSE 振荡器引脚，使用外部晶振时不可用作 GPIO',
      'PD0/PD1 为 HSE 振荡器引脚',
    ],
  },

  'STM32F4': {
    name: 'STM32F4',
    fullName: 'STM32F407VGT6',
    arch: 'ARM Cortex-M4 + FPU',
    flash: '1MB',
    sram: '192KB',
    clockSpeed: '168MHz',
    voltage: '3.3V',
    gpios: [
      { pin: 'PA0', altFunctions: ['UART4_TX', 'TIM2_CH1', 'TIM5_CH1', 'ADC123_IN0'] },
      { pin: 'PA1', altFunctions: ['UART4_RX', 'TIM2_CH2', 'TIM5_CH2', 'ADC123_IN1'] },
      { pin: 'PA2', altFunctions: ['UART2_TX', 'TIM2_CH3', 'TIM5_CH3', 'TIM9_CH1', 'ADC123_IN2'] },
      { pin: 'PA3', altFunctions: ['UART2_RX', 'TIM2_CH4', 'TIM5_CH4', 'TIM9_CH2', 'ADC123_IN3'] },
      { pin: 'PA4', altFunctions: ['SPI1_NSS', 'SPI3_NSS', 'DAC_OUT1', 'ADC12_IN4'] },
      { pin: 'PA5', altFunctions: ['SPI1_SCK', 'DAC_OUT2', 'ADC12_IN5'] },
      { pin: 'PA6', altFunctions: ['SPI1_MISO', 'TIM3_CH1', 'TIM13_CH1', 'ADC12_IN6'] },
      { pin: 'PA7', altFunctions: ['SPI1_MOSI', 'TIM3_CH2', 'TIM14_CH1', 'ADC12_IN7'] },
      { pin: 'PA8', altFunctions: ['I2C3_SCL', 'UART1_CK', 'TIM1_CH1', 'MCO1'] },
      { pin: 'PA9', altFunctions: ['UART1_TX', 'TIM1_CH2', 'I2C3_SMBA'] },
      { pin: 'PA10', altFunctions: ['UART1_RX', 'TIM1_CH3'] },
      { pin: 'PA11', altFunctions: ['USB_OTG_DM', 'CAN1_RX', 'TIM1_CH4'] },
      { pin: 'PA12', altFunctions: ['USB_OTG_DP', 'CAN1_TX', 'TIM1_ETR'] },
      { pin: 'PA13', altFunctions: ['SWDIO', 'JTMS'], notes: '默认为 SWD 调试口（SWDIO）' },
      { pin: 'PA14', altFunctions: ['SWCLK', 'JTCK'], notes: '默认为 SWD 调试口（SWCLK）' },
      { pin: 'PA15', altFunctions: ['JTDI', 'SPI1_NSS', 'SPI3_NSS', 'TIM2_CH1'], notes: '默认为 JTAG 引脚' },
      { pin: 'PB0', altFunctions: ['TIM3_CH3', 'TIM8_CH2N', 'ADC12_IN8'] },
      { pin: 'PB1', altFunctions: ['TIM3_CH4', 'TIM8_CH3N', 'ADC12_IN9'] },
      { pin: 'PB2', altFunctions: ['BOOT1'], notes: 'BOOT1 引脚' },
      { pin: 'PB3', altFunctions: ['JTDO', 'SPI1_SCK', 'SPI3_SCK', 'TIM2_CH2'], notes: '默认为 JTAG 引脚' },
      { pin: 'PB4', altFunctions: ['JNTRST', 'SPI1_MISO', 'SPI3_MISO', 'TIM3_CH1'], notes: '默认为 JTAG 引脚' },
      { pin: 'PB5', altFunctions: ['SPI1_MOSI', 'SPI3_MOSI', 'I2C1_SMBA', 'TIM3_CH2'] },
      { pin: 'PB6', altFunctions: ['I2C1_SCL', 'UART1_TX', 'TIM4_CH1'] },
      { pin: 'PB7', altFunctions: ['I2C1_SDA', 'UART1_RX', 'TIM4_CH2'] },
      { pin: 'PB8', altFunctions: ['I2C1_SCL', 'TIM4_CH3', 'TIM10_CH1', 'CAN1_RX'], notes: 'I2C1 重映射' },
      { pin: 'PB9', altFunctions: ['I2C1_SDA', 'TIM4_CH4', 'TIM11_CH1', 'CAN1_TX'], notes: 'I2C1 重映射' },
      { pin: 'PB10', altFunctions: ['I2C2_SCL', 'UART3_TX', 'TIM2_CH3'] },
      { pin: 'PB11', altFunctions: ['I2C2_SDA', 'UART3_RX', 'TIM2_CH4'] },
      { pin: 'PB12', altFunctions: ['SPI2_NSS', 'CAN2_RX', 'TIM1_BKIN', 'I2C2_SMBA'] },
      { pin: 'PB13', altFunctions: ['SPI2_SCK', 'CAN2_TX', 'TIM1_CH1N'] },
      { pin: 'PB14', altFunctions: ['SPI2_MISO', 'TIM1_CH2N', 'TIM12_CH1'] },
      { pin: 'PB15', altFunctions: ['SPI2_MOSI', 'TIM1_CH3N', 'TIM12_CH2'] },
      { pin: 'PC0', altFunctions: ['ADC123_IN10'] },
      { pin: 'PC1', altFunctions: ['ADC123_IN11'] },
      { pin: 'PC2', altFunctions: ['SPI2_MISO', 'ADC123_IN12'] },
      { pin: 'PC3', altFunctions: ['SPI2_MOSI', 'ADC123_IN13'] },
      { pin: 'PC4', altFunctions: ['ADC12_IN14'] },
      { pin: 'PC5', altFunctions: ['ADC12_IN15'] },
      { pin: 'PC6', altFunctions: ['UART6_TX', 'TIM3_CH1', 'TIM8_CH1', 'I2S2_MCK'] },
      { pin: 'PC7', altFunctions: ['UART6_RX', 'TIM3_CH2', 'TIM8_CH2'] },
      { pin: 'PC8', altFunctions: ['TIM3_CH3', 'TIM8_CH3', 'SDIO_D0'] },
      { pin: 'PC9', altFunctions: ['I2C3_SDA', 'TIM3_CH4', 'TIM8_CH4', 'SDIO_D1'] },
      { pin: 'PC10', altFunctions: ['SPI3_SCK', 'UART3_TX', 'UART4_TX', 'SDIO_D2'] },
      { pin: 'PC11', altFunctions: ['SPI3_MISO', 'UART3_RX', 'UART4_RX', 'SDIO_D3'] },
      { pin: 'PC12', altFunctions: ['SPI3_MOSI', 'UART5_TX', 'SDIO_CK'] },
      { pin: 'PC13', altFunctions: ['RTC_AF1'] },
      { pin: 'PC14', altFunctions: ['OSC32_IN'], notes: 'LSE 振荡器引脚' },
      { pin: 'PC15', altFunctions: ['OSC32_OUT'], notes: 'LSE 振荡器引脚' },
      { pin: 'PD0', altFunctions: ['CAN1_RX', 'FSMC_D2'] },
      { pin: 'PD1', altFunctions: ['CAN1_TX', 'FSMC_D3'] },
      { pin: 'PD2', altFunctions: ['UART5_RX', 'TIM3_ETR', 'SDIO_CMD'] },
      { pin: 'PD3', altFunctions: ['FSMC_CLK'] },
      { pin: 'PD4', altFunctions: ['FSMC_NOE'] },
      { pin: 'PD5', altFunctions: ['UART2_TX', 'FSMC_NWE'] },
      { pin: 'PD6', altFunctions: ['UART2_RX', 'FSMC_NWAIT'] },
      { pin: 'PD7', altFunctions: ['UART2_CK', 'FSMC_NE1'] },
      { pin: 'PD8', altFunctions: ['UART3_TX', 'FSMC_D13'] },
      { pin: 'PD9', altFunctions: ['UART3_RX', 'FSMC_D14'] },
      { pin: 'PD10', altFunctions: ['UART3_CK', 'FSMC_D15'] },
      { pin: 'PD11', altFunctions: ['UART3_CTS', 'FSMC_A16'] },
      { pin: 'PD12', altFunctions: ['TIM4_CH1', 'FSMC_A17'] },
      { pin: 'PD13', altFunctions: ['TIM4_CH2', 'FSMC_A18'] },
      { pin: 'PD14', altFunctions: ['TIM4_CH3', 'FSMC_D0'] },
      { pin: 'PD15', altFunctions: ['TIM4_CH4', 'FSMC_D1'] },
      { pin: 'PE0', altFunctions: ['TIM4_ETR', 'FSMC_NBL0'] },
      { pin: 'PE1', altFunctions: ['FSMC_NBL1'] },
      { pin: 'PE2', altFunctions: ['FSMC_A23'] },
      { pin: 'PE3', altFunctions: ['FSMC_A19'] },
      { pin: 'PE4', altFunctions: ['FSMC_A20'] },
      { pin: 'PE5', altFunctions: ['TIM9_CH1', 'FSMC_A21'] },
      { pin: 'PE6', altFunctions: ['TIM9_CH2', 'FSMC_A22'] },
      { pin: 'PE7', altFunctions: ['TIM1_ETR', 'FSMC_D4'] },
      { pin: 'PE8', altFunctions: ['TIM1_CH1N', 'FSMC_D5'] },
      { pin: 'PE9', altFunctions: ['TIM1_CH1', 'FSMC_D6'] },
      { pin: 'PE10', altFunctions: ['TIM1_CH2N', 'FSMC_D7'] },
      { pin: 'PE11', altFunctions: ['TIM1_CH2', 'FSMC_D8'] },
      { pin: 'PE12', altFunctions: ['TIM1_CH3N', 'FSMC_D9'] },
      { pin: 'PE13', altFunctions: ['TIM1_CH3', 'FSMC_D10'] },
      { pin: 'PE14', altFunctions: ['TIM1_CH4', 'FSMC_D11'] },
      { pin: 'PE15', altFunctions: ['TIM1_BKIN', 'FSMC_D12'] },
    ],
    peripherals: [
      { name: 'I2C1', type: 'I2C', defaultPins: { SDA: 'PB7/PB9', SCL: 'PB6/PB8' } },
      { name: 'I2C2', type: 'I2C', defaultPins: { SDA: 'PB11', SCL: 'PB10' } },
      { name: 'I2C3', type: 'I2C', defaultPins: { SDA: 'PC9', SCL: 'PA8' } },
      { name: 'SPI1', type: 'SPI', defaultPins: { MOSI: 'PA7', MISO: 'PA6', CLK: 'PA5' } },
      { name: 'SPI2', type: 'SPI', defaultPins: { MOSI: 'PB15', MISO: 'PB14', CLK: 'PB13' } },
      { name: 'SPI3', type: 'SPI', defaultPins: { MOSI: 'PB5', MISO: 'PB4', CLK: 'PB3' } },
      { name: 'UART1', type: 'UART', defaultPins: { TX: 'PA9', RX: 'PA10' } },
      { name: 'UART2', type: 'UART', defaultPins: { TX: 'PA2', RX: 'PA3' } },
      { name: 'UART3', type: 'UART', defaultPins: { TX: 'PB10', RX: 'PB11' } },
      { name: 'UART4', type: 'UART', defaultPins: { TX: 'PA0', RX: 'PA1' } },
      { name: 'UART5', type: 'UART', defaultPins: { TX: 'PC12', RX: 'PD2' } },
      { name: 'UART6', type: 'UART', defaultPins: { TX: 'PC6', RX: 'PC7' } },
      { name: 'CAN1', type: 'CAN', defaultPins: { TX: 'PD1', RX: 'PD0' } },
      { name: 'CAN2', type: 'CAN', defaultPins: { TX: 'PB13', RX: 'PB12' } },
      { name: 'USB_OTG', type: 'USB', defaultPins: { 'D+': 'PA12', 'D-': 'PA11' } },
    ],
    bootPins: ['BOOT0', 'PB2'],
    restrictions: [
      'PA13/PA14 默认为 SWD 调试口（SWDIO/SWCLK），重映射后可用作 GPIO',
      'PA15/PB3/PB4 默认为 JTAG 引脚，需禁用 JTAG 后才可用作 GPIO',
      'PA11/PA12 与 USB OTG 和 CAN1 共用，不可同时使用',
      'PC14/PC15 为 LSE 振荡器引脚，使用外部晶振时不可用作 GPIO',
      'PB13 与 CAN2_TX 和 SPI2_SCK 共用，注意外设冲突',
    ],
  },
}

/** 将芯片规格格式化为可注入 AI prompt 的文本 */
export function chipSpecToPromptText(spec: ChipSpec): string {
  const lines: string[] = []

  lines.push(`## ${spec.name} (${spec.fullName})`)
  lines.push(`- 架构: ${spec.arch}`)
  lines.push(`- Flash: ${spec.flash} | SRAM: ${spec.sram}`)
  lines.push(`- 主频: ${spec.clockSpeed} | 工作电压: ${spec.voltage}`)
  lines.push('')

  // 可用 GPIO
  lines.push('### 可用 GPIO')
  for (const gpio of spec.gpios) {
    let desc = `- ${gpio.pin}: [${gpio.altFunctions.join(', ')}]`
    if (gpio.inputOnly) desc += ' (仅输入)'
    if (gpio.notes) desc += ` — ${gpio.notes}`
    lines.push(desc)
  }
  lines.push('')

  // 外设总线
  lines.push('### 外设总线（默认引脚映射）')
  for (const bus of spec.peripherals) {
    const pinMapping = Object.entries(bus.defaultPins)
      .map(([signal, pin]) => `${signal}=${pin}`)
      .join(', ')
    lines.push(`- ${bus.name} (${bus.type}): ${pinMapping}`)
  }
  lines.push('')

  // 启动引脚
  lines.push(`### 启动受限引脚: ${spec.bootPins.join(', ')}`)
  lines.push('')

  // 限制条件
  lines.push('### 关键限制')
  for (const r of spec.restrictions) {
    lines.push(`- ${r}`)
  }

  return lines.join('\n')
}

/** 根据芯片名获取规格（支持预置和自定义） */
export function getChipSpec(target: string): ChipSpec | null {
  return CHIP_SPECS[target] ?? null
}
