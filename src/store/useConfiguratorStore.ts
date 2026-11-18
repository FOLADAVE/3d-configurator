import { create } from 'zustand'

export type CameraView = 'default' | 'bezel' | 'band'

export interface ColorOption {
  name: string
  hex: string
  priceDelta: number
}

export const BAND_COLORS: readonly ColorOption[] = [
  { name: 'Obsidian', hex: '#18181b', priceDelta: 0 },
  { name: 'Burnt Orange', hex: '#ea580c', priceDelta: 45 },
  { name: 'Arctic White', hex: '#f4f4f5', priceDelta: 45 },
  { name: 'Espresso', hex: '#451a03', priceDelta: 60 },
]

export const BEZEL_COLORS: readonly ColorOption[] = [
  { name: 'Blaze Orange', hex: '#ea580c', priceDelta: 0 },
  { name: 'Champagne Gold', hex: '#d4af37', priceDelta: 150 },
  { name: 'Stealth Black', hex: '#27272a', priceDelta: 80 },
  { name: 'Titanium Silver', hex: '#e4e4e7', priceDelta: 120 },
]

export const BASE_PRICE = 1250

interface ConfiguratorState {
  bandColor: string
  bezelColor: string
  activeView: CameraView
  setBandColor: (color: string) => void
  setBezelColor: (color: string) => void
  setActiveView: (view: CameraView) => void
  reset: () => void
}

const INITIAL_STATE = {
  bandColor: BAND_COLORS[0].hex,
  bezelColor: BEZEL_COLORS[0].hex,
  activeView: 'default' as CameraView,
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  ...INITIAL_STATE,
  setBandColor: (color) => set({ bandColor: color, activeView: 'band' }),
  setBezelColor: (color) => set({ bezelColor: color, activeView: 'bezel' }),
  setActiveView: (view) => set({ activeView: view }),
  reset: () => set(INITIAL_STATE),
}))