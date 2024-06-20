"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon } from "lucide-react"
import DateFilter from "./filter-date"

export default function AttendanceList({ data }) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [editingRow, setEditingRow] = useState(null)
  const [editedData, setEditedData] = useState({})
  const [localData, setLocalData] = useState([])

  useEffect(() => {
    console.log('Received data:', data)
    setLocalData(data)
  }, [data])

  const filteredData = useMemo(() => {
    if (!startDate && !endDate) return localData

    const start = startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : null
    const end = endDate ? new Date(endDate.setHours(23, 59, 59, 999)) : null

    return localData.filter(row => {
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
  }, [localData, startDate, endDate])

  const handleEditRow = (index) => {
    setEditingRow(index)
    setEditedData({
      ...localData[index],
      entries: localData[index].entries.map(entry => ({ ...entry })),
      exits: localData[index].exits.map(exit => ({ ...exit }))
    })
  }

  const handleEditChange = (event, type, entryOrExitIndex, timeOrLocation) => {
    const newValue = event.target.value
    const updatedData = { ...editedData }
    if (type === "entry") {
      updatedData.entries[entryOrExitIndex][timeOrLocation] = newValue
    } else {
      updatedData.exits[entryOrExitIndex][timeOrLocation] = newValue
    }
    setEditedData(updatedData)
  }

  const handleSaveEdit = async () => {
    const updatedData = [...localData]
    updatedData[editingRow] = editedData

    console.log('Saving edited data:', updatedData[editingRow])

    try {
      const response = await fetch(`/api/presentismo/attendance/register/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          entryTime: editedData.entries[0]?.time || null,
          exitTime: editedData.exits[0]?.time || null,
          date: updatedData[editingRow].date,
          id: updatedData[editingRow].entries[0].id
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Updated successfully:', result);
        setLocalData(updatedData);
        setEditingRow(null);
        setEditedData({});
      } else {
        console.error('Failed to update:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  }

  const handleCancelEdit = () => {
    setEditingRow(null)
    setEditedData({})
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
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.date}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {editingRow === index ? (
                    <ul className="list-disc list-inside">
                      {row.entries.map((entry, entryIndex) => (
                        <li key={entryIndex}>
                          <input
                            type="text"
                            value={editedData.entries?.[entryIndex]?.time || ''}
                            onChange={(e) => handleEditChange(e, "entry", entryIndex, "time")}
                            className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                          />
                          - <span>{entry.location}</span>
                          {entry.closedAutomatically && (
                            <AlertTriangleIcon className="text-yellow-500 w-4 h-4" title="Cerrado automáticamente" />
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-disc list-inside">
                      {row.entries.map((entry, entryIndex) => (
                        <li key={entryIndex}>
                          {entry.time} - {entry.location}
                          {entry.closedAutomatically && (
                            <AlertTriangleIcon className="text-yellow-500 w-4 h-4" title="Cerrado automáticamente" />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {editingRow === index ? (
                    <ul className="list-disc list-inside">
                      {row.exits.map((exit, exitIndex) => (
                        <li key={exitIndex}>
                          <input
                            type="text"
                            value={editedData.exits?.[exitIndex]?.time || ''}
                            onChange={(e) => handleEditChange(e, "exit", exitIndex, "time")}
                            className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                          />
                          - <span>{exit.location}</span>
                          {exit.closedAutomatically && (
                            <AlertTriangleIcon className="text-yellow-500 w-4 h-4" title="Cerrado automáticamente" />
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-disc list-inside">
                      {row.exits.map((exit, exitIndex) => (
                        <li key={exitIndex}>
                          {exit.time} - {exit.location}
                          {exit.closedAutomatically && (
                            <AlertTriangleIcon className="text-yellow-500 w-4 h-4" title="Cerrado automáticamente" />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.duration} horas</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {editingRow === index ? (
                    <>
                      <Button variant="outline" onClick={handleSaveEdit} className="mr-2">
                        Guardar
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => handleEditRow(index)}>
                      Editar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
