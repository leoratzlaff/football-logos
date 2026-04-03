import { promises as fs } from 'fs';
import path from 'path';

const LOGOS_DIR = process.env.LOGOS_DIR || 'logos';

/**
 * Get the absolute path to the logos directory
 */
export function getLogosDir() {
  return path.resolve(LOGOS_DIR);
}

/**
 * Get full path to a league directory
 * @param {string} leagueFolderName - The actual league folder name (e.g., "England - Premier League")
 * @returns {string} - Full path to league directory
 */
export function getLeagueDir(leagueFolderName) {
  return path.join(getLogosDir(), leagueFolderName);
}

/**
 * Get full path to a team logo file
 * @param {string} leagueFolderName - The actual league folder name
 * @param {string} teamFileName - The team PNG filename
 * @returns {string} - Full path to team logo
 */
export function getTeamLogoPath(leagueFolderName, teamFileName) {
  return path.join(getLeagueDir(leagueFolderName), teamFileName);
}

/**
 * List all PNG files in a league directory
 * @param {string} leagueFolderName - The actual league folder name
 * @returns {Promise<string[]>} - Array of PNG filenames
 */
export async function listTeamsInLeague(leagueFolderName) {
  try {
    const leagueDir = getLeagueDir(leagueFolderName);
    const files = await fs.readdir(leagueDir);
    return files.filter(f => f.endsWith('.png'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Check if a team logo file exists
 * @param {string} leagueFolderName - The actual league folder name
 * @param {string} teamFileName - The team PNG filename
 * @returns {Promise<boolean>} - True if file exists
 */
export async function teamLogoExists(leagueFolderName, teamFileName) {
  try {
    const filePath = getTeamLogoPath(leagueFolderName, teamFileName);
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read a team logo file
 * @param {string} leagueFolderName - The actual league folder name
 * @param {string} teamFileName - The team PNG filename
 * @returns {Promise<Buffer>} - File buffer
 */
export async function readTeamLogo(leagueFolderName, teamFileName) {
  const filePath = getTeamLogoPath(leagueFolderName, teamFileName);
  return fs.readFile(filePath);
}
