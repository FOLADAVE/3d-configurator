import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, ContactShadows } from '@react-three/drei'
import { Product } from './Product'
import { CameraRig, SnapshotTrigger } from './components/CameraRig'
import {
  useConfiguratorStore,
  BAND_COLORS,
  BEZEL_COLORS,
  BASE_PRICE,
  type CameraView,
} from './store/useConfiguratorStore'

const VIEW_TABS: readonly { id: CameraView; label: string }[] = [
  { id: 'default', label: 'Overview' },
  { id: 'bezel', label: 'Dial & Bezel' },
  { id: 'band', label: 'Strap' },
]

function TopHUD({ onExport }: { onExport: () => void }) {
  const { bandColor, bezelColor, activeView, setActiveView, reset } = useConfiguratorStore()

  const bandDelta = BAND_COLORS.find((c) => c.hex === bandColor)?.priceDelta ?? 0
  const bezelDelta = BEZEL_COLORS.find((c) => c.hex === bezelColor)?.priceDelta ?? 0
  const totalPrice = BASE_PRICE + bandDelta + bezelDelta

  return (
    <header className="absolute top-0 inset-x-0 z-10 flex flex-wrap items-center justify-between gap-4 p-6 sm:px-10 pointer-events-none">
      {/* Brand & Dynamic Price */}
      <div className="pointer-events-auto">
        <p className="text-[11px] uppercase tracking-[0.25em] text-orange-500 font-semibold">
          Bespoke Horology
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Chronograph <span className="text-zinc-400 font-light">Series 01</span>
        </h1>
        <p className="text-sm text-zinc-300 font-mono mt-0.5">
          ${totalPrice.toLocaleString()} <span className="text-xs text-zinc-500">USD</span>
        </p>
      </div>

      {/* Camera View Switcher */}
      <div className="pointer-events-auto flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800 backdrop-blur-md">
        {VIEW_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              activeView === tab.id
                ? 'bg-orange-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="pointer-events-auto flex items-center gap-2.5">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-full text-xs font-medium text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 backdrop-blur-md transition-colors cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={onExport}
          className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20 cursor-pointer"
        >
          Export PNG
        </button>
      </div>
    </header>
  )
}

function BottomDock() {
  const { bandColor, bezelColor, setBandColor, setBezelColor } = useConfiguratorStore()

  const activeBandName = BAND_COLORS.find((c) => c.hex === bandColor)?.name ?? ''
  const activeBezelName = BEZEL_COLORS.find((c) => c.hex === bezelColor)?.name ?? ''

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col sm:flex-row items-center gap-6 bg-zinc-900/85 px-6 py-4 rounded-3xl border border-zinc-800 backdrop-blur-md shadow-2xl">
      {/* Band Controls */}
      <div className="flex items-center gap-3.5">
        <div className="min-w-[84px]">
          <span className="block text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">
            Strap
          </span>
          <span className="block text-zinc-200 text-xs font-medium truncate">
            {activeBandName}
          </span>
        </div>
        <div className="flex gap-2.5">
          {BAND_COLORS.map((swatch) => (
            <button
              key={swatch.hex}
              title={`${swatch.name} (+$${swatch.priceDelta})`}
              onClick={() => setBandColor(swatch.hex)}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 cursor-pointer ${
                bandColor === swatch.hex
                  ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-900'
                  : 'ring-1 ring-zinc-700'
              }`}
              style={{ backgroundColor: swatch.hex }}
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:block w-px h-9 bg-zinc-800" />

      {/* Bezel Controls */}
      <div className="flex items-center gap-3.5">
        <div className="min-w-[96px]">
          <span className="block text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">
            Bezel
          </span>
          <span className="block text-zinc-200 text-xs font-medium truncate">
            {activeBezelName}
          </span>
        </div>
        <div className="flex gap-2.5">
          {BEZEL_COLORS.map((swatch) => (
            <button
              key={swatch.hex}
              title={`${swatch.name} (+$${swatch.priceDelta})`}
              onClick={() => setBezelColor(swatch.hex)}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 cursor-pointer ${
                bezelColor === swatch.hex
                  ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-900'
                  : 'ring-1 ring-zinc-700'
              }`}
              style={{ backgroundColor: swatch.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const exportFnRef = useRef<(() => void) | null>(null)

  return (
    <div className="relative w-full h-screen bg-zinc-950 font-sans overflow-hidden select-none">
      <TopHUD onExport={() => exportFnRef.current?.()} />

     <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 16], fov: 40 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <Stage environment="city" intensity={0.65} adjustCamera={false} castShadow={false}>
          <Product />
        </Stage>
        <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={20} blur={2.4} far={8} />
        <CameraRig />
        <SnapshotTrigger
          registerExport={(fn) => {
            exportFnRef.current = fn
          }}
        />
      </Canvas>

      <BottomDock />
    </div>
  )
}