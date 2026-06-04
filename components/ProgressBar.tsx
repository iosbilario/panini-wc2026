interface Props {
  owned: number
  total: number
  missing: number
  pct: number
}

export default function ProgressBar({ owned, total, missing, pct }: Props) {
  return (
    <div className="mt-2">
      {/* Counters */}
      <div className="flex justify-between text-xs mb-1.5">
        <span style={{ color: '#4ade80' }}>
          <strong>{owned}</strong>{' '}
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>coladas</span>
        </span>
        <span style={{ fontFamily: 'var(--font-anton)', color: 'var(--color-gold-base)', fontSize: '14px' }}>
          {pct}%
        </span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>
          faltam <strong className="text-white">{missing}</strong>
        </span>
      </div>

      {/* Track */}
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-felt-dark)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(to right, #15803d, #4ade80)',
          }}
        />
      </div>

      {/* Total label */}
      <p className="text-right text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {total} figurinhas no total
      </p>
    </div>
  )
}
