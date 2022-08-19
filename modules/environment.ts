export const Environment = {
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || '',
  isProduction: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
  version: process.env.NEXT_PUBLIC_VERSION || 'local',
};
