function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p>
          © {new Date().getFullYear()} ExamPortal. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
          <a href="#" className="hover:text-blue-600">Support</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer







