function Sidebar() {
    return (
        <div className="fixed top-0 left-0 w-56 h-screen bg-gray-800 text-white p-5 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-2">Project Rest</h2>
            <ul className="space-y-4">
                <li><a href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">🏠 Dashboard</a></li>
                <li><a href="/reviews" className="block px-4 py-2 rounded hover:bg-gray-700">📝 Reviews</a></li>
                <li><a href="/login" className="block px-4 py-2 rounded hover:bg-gray-700">🔒 Login</a></li>
            </ul>
        </div>
    )
}

export default Sidebar