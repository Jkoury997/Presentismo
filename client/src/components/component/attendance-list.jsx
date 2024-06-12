"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ListIcon, AlertTriangleIcon } from "lucide-react"
import DateFilter from "./filter-date"

export default function AttendanceList({ data }) {
  const [sortOrder, setSortOrder] = useState("desc")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const filteredData = useMemo(() => {
    if (!startDate && !endDate) return data

    const start = startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : null
    const end = endDate ? new Date(endDate.setHours(23, 59, 59, 999)) : null

    return data.filter(row => {
      const rowDate = new Date(row.date)
      if (start && end) {
        return rowDate >= start && rowDate <= end
      } else if (start) {
        return rowDate >= start
      } else if (end) {
        return rowDate <= end
      }
      return true
    })
  }, [data, startDate, endDate])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      if (dateA < dateB) return -1
      if (dateA > dateB) return 1

      // If dates are the same, sort by duration
      if (sortOrder === "desc") {
        return b.duration - a.duration
      } else {
        return a.duration - b.duration
      }
    })
  }, [filteredData, sortOrder])

  const handleSortChange = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex justify-between items-center mb-6 p-6 sm:p-8">
        <h1 className="text-2xl font-bold">Entradas y Salidas</h1>
        <div className="flex items-center gap-4">
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <Button variant="outline" onClick={handleSortChange} className="flex items-center gap-2">
            <ListIcon className="w-4 h-4" />
            <span>Ordenar por duración</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto p-6 sm:p-8">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Fecha</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Entradas</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Salidas</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Duración</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.date}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  <ul className="list-disc list-inside">
                    {row.entries.map((entry, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {entry.time} - {entry.location}
                        {entry.closedAutomatically && (
                          <AlertTriangleIcon className="text-yellow-500 w-4 h-4" title="Cerrado automáticamente" />
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  <ul className="list-disc list-inside">
                    {row.exits.map((exit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {exit.time} - {exit.location}
                        {exit.closedAutomatically && (
                          <AlertTriangleIcon className="text-yellow-500 w-4 h-4" title="Cerrado automáticamente" />
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.duration} horas</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
