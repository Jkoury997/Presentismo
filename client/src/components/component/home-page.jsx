import Link from "next/link"

export function HomePage() {
  return (
    (<div className="flex flex-col min-h-dvh">
      <header className="bg-gray-900 text-white py-4 md:py-6 px-4 md:px-6">
        <div
          className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <ClockIcon className="h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold">Attendance Tracker</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              className="inline-flex items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              href="/auth/login">
              Sign In
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-md border border-gray-200 border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-800"
              href="/auth/register">
              Sign Up
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-md border border-gray-200 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-800"
              href="/zone/configure">
              Settings
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gray-100 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Manage your team's attendance with ease
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Our attendance tracking app makes it simple to keep track of your team's work hours, time off, and
                  more.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  href="/auth/login">
                  Sign In
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-800"
                  href="/auth/register">
                  Sign Up
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-800"
                  href="/zone/configure">
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Key Features</h2>
                <p className="mt-4 text-lg text-gray-500">
                  Our attendance tracking app offers a range of features to help you manage your team's attendance
                  effectively.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-6">
                  <ClockIcon className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Time Tracking</h3>
                  <p className="text-gray-500">Easily track your team's work hours and attendance.</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <CalendarIcon className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Leave Management</h3>
                  <p className="text-gray-500">Manage your team's time off and vacation requests.</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <CheckIcon className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Reporting</h3>
                  <p className="text-gray-500">Generate detailed reports on your team's attendance.</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <MailsIcon className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Notifications</h3>
                  <p className="text-gray-500">Receive alerts for important attendance-related events.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-6 px-4 md:px-6">
        <div
          className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm mb-4 md:mb-0">© 2024 Attendance Tracker. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link className="text-sm hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm hover:underline" href="#">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>)
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>)
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


function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>)
  );
}


function MailsIcon(props) {
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
      <rect width="16" height="13" x="6" y="4" rx="2" />
      <path d="m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7" />
      <path d="M2 8v11c0 1.1.9 2 2 2h14" />
    </svg>)
  );
}
