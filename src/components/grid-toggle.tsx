"use client"

import type React from "react"
import { Grid3x3 } from "lucide-react"

interface GridToggleProps {
  isGrid: boolean
  setIsGrid: (isGrid: boolean) => void
}

const GridToggle: React.FC<GridToggleProps> = ({ isGrid, setIsGrid }) => {
  return (
    <button onClick={() => setIsGrid(!isGrid)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
      <Grid3x3 className="h-5 w-5" aria-label={isGrid ? "Disable Grid" : "Enable Grid"} />
    </button>
  )
}

export default GridToggle
