# Football Logos API

A simple REST API to serve football team logos from top European leagues. Contains PNG logos (139×181px) for teams in 25 European countries for the current season (2025/2026).

## Quick Start

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

The API will start on `http://localhost:3000` (or `$PORT` environment variable).

## API Endpoints

### Health Check

**GET** `/`

Returns API status and available endpoints.

```bash
curl http://localhost:3000/
```

### Get Team Logo

**GET** `/api/:country/:team`

Returns the PNG logo for a specific team.

**Parameters:**
- `country` - Country slug (lowercase). Example: `england`, `italy`, `spain`, `czech-republic`
- `team` - Team name slug (dashes instead of spaces, lowercase). Example: `arsenal`, `arsenal-fc`, `juventus-fc`, `manchester-united`

**Response:**
- Content-Type: `image/png`
- HTTP 200 on success
- HTTP 404 if country or team not found

**Examples:**

```bash
# Arsenal logo
curl http://localhost:3000/api/england/arsenal > arsenal.png

# Arsenal FC (exact match)
curl http://localhost:3000/api/england/arsenal-fc > arsenal.png

# Juventus logo
curl http://localhost:3000/api/italy/juventus-fc > juventus.png

# Real Madrid logo
curl http://localhost:3000/api/spain/real-madrid > real-madrid.png

# FC Zürich logo
curl http://localhost:3000/api/switzerland/fc-zurich > fc-zurich.png
```

**Usage in HTML:**

```html
<img src="http://localhost:3000/api/england/arsenal" alt="Arsenal" />
<img src="http://localhost:3000/api/italy/juventus-fc" alt="Juventus" />
```

### List All Countries

**GET** `/api/countries`

Returns all available countries with their slugs.

```bash
curl http://localhost:3000/api/countries
```

**Response:**

```json
{
  "count": 25,
  "countries": [
    {
      "slug": "austria",
      "name": "Austria"
    },
    {
      "slug": "england",
      "name": "England"
    },
    ...
  ]
}
```

### List Teams in a Country

**GET** `/api/:country/teams`

Returns all teams in a specific country.

```bash
curl http://localhost:3000/api/england/teams
```

**Response:**

```json
{
  "country": "england",
  "count": 20,
  "teams": [
    "afc-bournemouth",
    "arsenal-fc",
    "aston-villa",
    "brentford-fc",
    ...
  ]
}
```

## Supported Countries

The API provides logos for teams from 25 European countries:

- Austria
- Belgium
- Bulgaria
- Croatia
- Czech Republic
- Denmark
- England
- France
- Germany
- Greece
- Israel
- Italy
- Netherlands
- Norway
- Poland
- Portugal
- Romania
- Russia
- Scotland
- Serbia
- Spain
- Sweden
- Switzerland
- Turkiye
- Ukraine

## Directory Structure

- `logos/` - Current season logos (2025/2026) organized by country
- `src/` - Node.js/Express server code
  - `app.js` - Express application setup
  - `routes/logos.js` - API route handlers
  - `utils/normalize.js` - Team name normalization for fuzzy matching
  - `utils/fileSystem.js` - File system utilities
  - `data/leagues.json` - Country slug mappings
- `index.js` - Server entry point
- `package.json` - Node.js dependencies and scripts

## URL Slug Format

All folder and file names use URL-friendly slug format:

- Lowercase letters and numbers
- Dashes instead of spaces
- Special characters removed or simplified
- Examples:
  - `manchester-united` for Manchester United
  - `ac-milan` for AC Milan
  - `fc-zurich` for FC Zürich (ü → u)
  - `fc-koln` for Köln (ö → o)

## Fuzzy Matching

The API uses smart fuzzy matching for team names:

- Case-insensitive matching
- Partial name matching (e.g., `arsenal` finds `arsenal-fc.png`)
- Special character handling (e.g., accents are simplified)

For best results, use the exact slug shown in the teams list endpoint, but partial matches will also work.

## Environment Variables

Create a `.env` file to customize settings:

```env
PORT=3000
LOGOS_DIR=logos
NODE_ENV=production
```

## Error Responses

All errors return JSON with helpful details:

```json
{
  "error": "Country not found",
  "message": "Country \"unknown\" not found. See /api/countries for available countries.",
  "slug": "unknown"
}
```

## Development

### Running in Development Mode

```bash
npm run dev
```

This runs the server with better error logging.

## License

See LICENSE file for details.

## Contributing

See CONTRIBUTING.md for guidelines on adding new logos or making changes.
