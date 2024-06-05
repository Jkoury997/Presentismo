/**
 * v0 by Vercel.
 * @see https://v0.dev/t/up4z7W4ubw2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [zones, setZones] = useState([
    {
      id: 1,
      name: "Zona A",
      description: "Esta es la Zona A",
    },
    {
      id: 2,
      name: "Zona B",
      description: "Esta es la Zona B",
    },
    {
      id: 3,
      name: "Zona C",
      description: "Esta es la Zona C",
    },
  ])
  const handleDelete = (id) => {
    setZones(zones.filter((zone) => zone.id !== id))
  }
  const handleEdit = (id) => {}
  const handleAdd = () => {}
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Zonas</h2>
          <Button onClick={handleAdd}>Agregar Zona</Button>
        </div>
        <div className="grid gap-4">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between dark:bg-gray-800"
            >
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">{zone.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{zone.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(zone.id)} className="md:hidden">
                  <DeleteIcon className="w-4 h-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(zone.id)} className="md:hidden">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(zone.id)}
                  className="hidden md:inline-flex"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(zone.id)}
                  className="hidden md:inline-flex"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DeleteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}