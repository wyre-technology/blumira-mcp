import { BlumiraClient } from '@wyre-technology/node-blumira';
import { logger } from './logger.js';

let _client: BlumiraClient | null = null;
let _credKey: string | null = null;

interface Credentials {
  jwtToken: string;
}

export function getCredentials(): Credentials | null {
  const jwtToken = process.env.BLUMIRA_JWT_TOKEN;
  if (!jwtToken) {
    logger.warn('Missing credentials', { hasJwtToken: false });
    return null;
  }
  return { jwtToken };
}

export async function getClient(): Promise<BlumiraClient> {
  const creds = getCredentials();
  if (!creds) throw new Error('No Blumira credentials configured. Set BLUMIRA_JWT_TOKEN environment variable.');

  if (_client && _credKey === creds.jwtToken) return _client;

  _client = new BlumiraClient(creds);
  _credKey = creds.jwtToken;
  logger.info('Created Blumira API client');
  return _client;
}
