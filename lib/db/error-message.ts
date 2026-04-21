export function getDatabaseErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('mongodb_uri')) {
    return 'MongoDB is not configured. Add MONGODB_URI in the Render environment variables and redeploy.';
  }

  if (
    lowerMessage.includes('querysrv') ||
    lowerMessage.includes('enotfound') ||
    lowerMessage.includes('econnrefused') ||
    lowerMessage.includes('server selection') ||
    lowerMessage.includes('timed out') ||
    lowerMessage.includes('ip address')
  ) {
    return 'MongoDB connection failed. Check the Render MONGODB_URI value and your MongoDB Atlas Network Access allowlist.';
  }

  if (lowerMessage.includes('authentication failed') || lowerMessage.includes('bad auth')) {
    return 'MongoDB authentication failed. Check the username and password in MONGODB_URI.';
  }

  if (lowerMessage.includes('validation failed')) {
    return `MongoDB rejected the tour data: ${message}`;
  }

  return 'Tour could not be saved because the database rejected the request. Check the Render logs for the full server error.';
}
