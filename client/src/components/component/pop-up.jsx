/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/7RwD5Aix2Dx
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { AlertDialogTrigger, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogCancel, AlertDialogFooter, AlertDialogContent, AlertDialog } from "@/components/ui/alert"

export function PopUp() {
  return (
    (<AlertDialog defaultOpen>
      <AlertDialogTrigger asChild>
        <Button className="hidden" variant="outline">
          Show Dialog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-[400px] p-6">
        <AlertDialogHeader>
          <div className="flex items-center space-x-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <CheckIcon className="h-6 w-6 text-white" />
            </div>
            <AlertDialogTitle className="text-lg font-medium">Operación completada</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          La operación se ha completado correctamente.
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-6 flex justify-end">
          <AlertDialogCancel
            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800">
            Cerrar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>)
  );
}

function CheckIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>)
  );
}
