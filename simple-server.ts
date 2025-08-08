import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const port = 3000;
const hostname = '0.0.0.0';

async function startServer() {
  try {
    const nextApp = next({ dev, hostname, port });
    await nextApp.prepare();
    
    const handle = nextApp.getRequestHandler();
    
    nextApp.getServer().listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
    
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
}

startServer();