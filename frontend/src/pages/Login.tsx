function Login({ onLogin }: { onLogin: () => void }) {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <p>Please log in to access your account.</p>
            <form
                className="mt-6"
                onSubmit={(e) => {
                    e.preventDefault()
                    onLogin()
                }}
            >
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input type="email" id="email" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                    <input type="password" id="password" className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
            </form>
        </div>
    )
}

export default Login
