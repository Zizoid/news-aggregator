# News Aggregator - AI-Powered News Parser

A comprehensive news aggregation system built with Python backend and Next.js frontend, featuring AI-powered categorization and clustering of news articles.

## Features

### Backend (Python)
- **Multi-source news collection**: RSS feeds and website scraping
- **Automatic categorization**: News articles categorized by topic using keyword analysis
- **Content clustering**: Articles grouped by similarity using K-means clustering
- **Keyword extraction**: Automatic keyword extraction from articles using NLTK
- **REST API**: Flask-based API with CORS support
- **Real-time updates**: Automatic news updates every 30 minutes
- **Search functionality**: Full-text search across all articles

### Frontend (Next.js)
- **Modern UI**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Responsive design**: Mobile-first approach with adaptive layouts
- **Interactive filters**: Category, search, and sorting options
- **Visual customization**: Theme settings with live preview
- **Multiple views**: Grid, list, and compact view modes
- **Grouped display**: News organized by categories and similarity clusters
- **Real-time updates**: Live refresh and pagination

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Python API    │    │   News Sources  │
│   Frontend      │◄──►│   Server        │◄──►│   (RSS/Web)     │
│                 │    │                 │    │                 │
│ • UI Components │    │ • News Parser   │    │ • CNN           │
│ • Theme Settings│    │ • Clustering    │    │ • BBC           │
│ • Navigation    │    │ • Categorization│    │ • Reuters       │
│ • Filters       │    │ • Search        │    │ • NYTimes       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- pip package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd news-aggregator
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Setup Python backend**
```bash
cd python-news-parser
pip install -r requirements.txt
```

4. **Download NLTK data**
```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

### Running the Application

1. **Start Python backend server**
```bash
cd python-news-parser
python start_server.py
```
The server will start on `http://localhost:5000`

2. **Start Next.js frontend** (in a new terminal)
```bash
npm run dev
```
The frontend will be available on `http://localhost:3000`

## Usage

### Main Features

1. **News Browsing**
   - View latest news from multiple sources
   - Filter by category (Politics, Technology, Business, etc.)
   - Search across all articles
   - Sort by date, title, or category

2. **Grouped View**
   - Browse news by categories
   - Explore similarity clusters
   - Expand/collapse groups
   - View cluster keywords

3. **Customization**
   - Theme settings (colors, fonts, layout)
   - View modes (grid, list, compact)
   - Image display options
   - Content visibility settings

### API Endpoints

#### Python Backend API (`http://localhost:5000`)
- `GET /health` - Health check
- `GET /news` - Get all news articles
- `GET /news/categories` - Get news by category
- `GET /news/clusters` - Get clustered news
- `GET /news/search` - Search news articles
- `GET /news/summary` - Get news summary
- `GET /news/sources` - Get news sources
- `POST /news/refresh` - Refresh news cache

#### Next.js API Routes (`http://localhost:3000/api`)
- `/api/news` - Proxy to Python news API
- `/api/news/categories` - Proxy to categories endpoint
- `/api/news/clusters` - Proxy to clusters endpoint
- `/api/news/search` - Proxy to search endpoint
- `/api/news/summary` - Proxy to summary endpoint
- `/api/news/sources` - Proxy to sources endpoint

## Configuration

### Python Backend

#### News Sources
Edit `python-news-parser/news_parser.py` to modify news sources:

```python
self.news_sources = {
    'rss': [
        'https://your-rss-feed.com/feed.xml',
        # Add more RSS feeds
    ],
    'websites': [
        'https://your-website.com',
        # Add more websites
    ]
}
```

#### Categories
Modify categories in `python-news-parser/news_parser.py`:

```python
self.categories = {
    'Your Category': ['keyword1', 'keyword2', 'keyword3'],
    # Add more categories
}
```

### Frontend

#### Environment Variables
Create `.env.local` file in the root directory:

```env
PYTHON_API_URL=http://localhost:5000
```

#### Theme Settings
Theme settings are stored in localStorage and can be customized via the Settings page.

## Development

### Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/news/          # API routes
│   │   ├── page.tsx           # Homepage
│   │   ├── groups/page.tsx    # Groups page
│   │   └── settings/page.tsx  # Settings page
│   ├── components/
│   │   ├── news/              # News components
│   │   └── ui/                # UI components
│   └── lib/
│       ├── news-api.ts        # API client
│       └── utils.ts           # Utility functions
├── python-news-parser/
│   ├── app.py                 # Flask app
│   ├── news_parser.py         # News parser logic
│   ├── requirements.txt       # Python dependencies
│   └── start_server.py       # Server startup script
└── prisma/                    # Database schema (if needed)
```

### Adding New Features

1. **Backend Features**
   - Add new endpoints in `app.py`
   - Implement logic in `news_parser.py`
   - Update API client in `src/lib/news-api.ts`

2. **Frontend Features**
   - Create new components in `src/components/news/`
   - Add new pages in `src/app/`
   - Update navigation in `src/components/news/Navigation.tsx`

### Testing

```bash
# Frontend tests
npm test

# Backend tests (if implemented)
cd python-news-parser
python -m pytest
```

## Deployment

### Production Setup

1. **Python Backend**
   - Use Gunicorn or uWSGI for production
   - Set up reverse proxy (Nginx)
   - Configure environment variables

2. **Next.js Frontend**
   - Build the application: `npm run build`
   - Start production server: `npm start`
   - Configure environment variables

### Docker Deployment

```dockerfile
# Python backend Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY python-news-parser/ .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "start_server.py"]
```

```dockerfile
# Next.js frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### GitHub Actions

Create `.github/workflows/deploy.yml` for CI/CD:

```yaml
name: Deploy News Aggregator
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18
      - name: Install dependencies
        run: |
          npm install
          cd python-news-parser
          pip install -r requirements.txt
      - name: Deploy to production
        run: |
          # Add deployment commands here
```

## Troubleshooting

### Common Issues

1. **Python server not starting**
   - Check if all dependencies are installed
   - Verify port 5000 is not in use
   - Check Python version compatibility

2. **Frontend not connecting to backend**
   - Verify Python server is running
   - Check CORS settings
   - Verify API URL configuration

3. **News not loading**
   - Check internet connection
   - Verify news sources are accessible
   - Check server logs for errors

### Logs

- Python server logs: Console output
- Next.js logs: `dev.log` file
- Browser logs: Developer tools console

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the API documentation

---

Built with ❤️ using Python, Next.js, and AI-powered news processing.