app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            // If user not found, return a 401 status
            return res.status(401).json({ message: 'You need to register first' });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            // If password doesn't match, return a 401 status
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful', accessToken: 'fake-access-token', refreshToken: 'fake-refresh-token' });
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

