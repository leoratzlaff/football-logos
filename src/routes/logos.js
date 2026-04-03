import { Router } from 'express';
import {
  getCountryFolder,
  findTeamFile,
  getAvailableCountries
} from '../utils/normalize.js';
import {
  listTeamsInLeague,
  readTeamLogo
} from '../utils/fileSystem.js';

const router = Router();

/**
 * GET /api/:country/:team
 * Serve a team logo as PNG
 */
router.get('/:country/:team', async (req, res) => {
  try {
    const { country: countrySlug, team: teamSlug } = req.params;
    
    // Get country folder name
    const countryFolder = getCountryFolder(countrySlug);
    if (!countryFolder) {
      return res.status(404).json({
        error: 'Country not found',
        message: `Country "${countrySlug}" not found. See /api/countries for available countries.`,
        slug: countrySlug
      });
    }
    
    // Get list of teams in the country
    const teamFiles = await listTeamsInLeague(countryFolder);
    if (teamFiles.length === 0) {
      return res.status(404).json({
        error: 'No teams found',
        message: `No team logos found for country "${countrySlug}".`,
        country: countrySlug
      });
    }
    
    // Find matching team file
    const teamFile = findTeamFile(teamSlug, teamFiles);
    if (!teamFile) {
      return res.status(404).json({
        error: 'Team not found',
        message: `Team "${teamSlug}" not found in "${countrySlug}".`,
        country: countrySlug,
        team: teamSlug,
        availableTeams: teamFiles.map(f => f.replace('.png', ''))
      });
    }
    
    // Read and serve the PNG file
    const logoBuffer = await readTeamLogo(countryFolder, teamFile);
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(logoBuffer);
    
  } catch (error) {
    console.error('Error serving logo:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/countries
 * List all available countries
 */
router.get('/countries', (req, res) => {
  try {
    const countries = getAvailableCountries();
    res.json({
      count: countries.length,
      countries: countries.map(c => ({
        slug: c.slug,
        name: c.name
      }))
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/:country/teams
 * List all teams in a specific country
 */
router.get('/:country/teams', async (req, res) => {
  try {
    const { country: countrySlug } = req.params;
    
    const countryFolder = getCountryFolder(countrySlug);
    if (!countryFolder) {
      return res.status(404).json({
        error: 'Country not found',
        message: `Country "${countrySlug}" not found.`,
        slug: countrySlug
      });
    }
    
    const teamFiles = await listTeamsInLeague(countryFolder);
    const teams = teamFiles.map(f => f.replace('.png', ''));
    
    res.json({
      country: countrySlug,
      count: teams.length,
      teams: teams
    });
    
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

export default router;
