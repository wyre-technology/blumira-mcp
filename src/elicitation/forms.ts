import type { Server } from '@modelcontextprotocol/sdk/server/index.js';

export async function elicitCredentials(server: Server): Promise<{ jwtToken: string } | null> {
  try {
    const result = await (server as any).elicitInput({
      mode: 'form',
      message: 'Blumira API credentials are required. You need a JWT token from your Blumira account.',
      requestedSchema: {
        type: 'object',
        properties: {
          jwt_token: {
            type: 'string',
            title: 'JWT Token',
            description: 'Your Blumira API JWT token (Bearer token)',
          },
        },
        required: ['jwt_token'],
      },
    });

    if (result?.action === 'accept' && result.content) {
      return {
        jwtToken: result.content.jwt_token as string,
      };
    }
  } catch {
    // Elicitation not supported by client
  }

  return null;
}
