import { motion } from 'framer-motion';

function MultiplicationGrid({ highlight = null, maxSize = 12 }) {
  const size = Math.min(maxSize, 12);
  const [highlightX, highlightY] = highlight || [null, null];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-6">
      <h3 className="font-semibold text-surface-800 mb-4">Multiplication Grid</h3>
      
      <div className="overflow-x-auto">
        <div className="grid gap-1 p-2" style={{ gridTemplateColumns: `repeat(${size + 1}, minmax(0, 1fr))` }}>
          {/* Top header row */}
          <div className="w-8 h-8 flex items-center justify-center text-xs font-medium text-surface-500">
            ×
          </div>
          {Array.from({ length: size }, (_, i) => i + 1).map(num => (
            <div
              key={`header-${num}`}
              className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded transition-all ${
                num === highlightY
                  ? 'bg-accent text-white'
                  : 'bg-surface-100 text-surface-600'
              }`}
            >
              {num}
            </div>
          ))}

          {/* Grid rows */}
          {Array.from({ length: size }, (_, i) => i + 1).map(row => (
            <>
              {/* Left header column */}
              <div
                key={`row-header-${row}`}
                className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded transition-all ${
                  row === highlightX
                    ? 'bg-accent text-white'
                    : 'bg-surface-100 text-surface-600'
                }`}
              >
                {row}
              </div>
              
              {/* Grid cells */}
              {Array.from({ length: size }, (_, j) => j + 1).map(col => {
                const isHighlighted = row === highlightX && col === highlightY;
                const product = row * col;
                
                return (
                  <motion.div
                    key={`cell-${row}-${col}`}
                    initial={false}
                    animate={{
                      scale: isHighlighted ? 1.1 : 1,
                      backgroundColor: isHighlighted ? '#4ECDC4' : '#F8F9FA'
                    }}
                    transition={{ duration: 0.2 }}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded cursor-pointer transition-all ${
                      isHighlighted
                        ? 'text-white shadow-lg z-10'
                        : 'text-surface-700 hover:bg-surface-200'
                    }`}
                  >
                    {product}
                  </motion.div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultiplicationGrid;