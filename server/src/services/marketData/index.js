import { env } from '../../config/env.js';
import { DemoMarketProvider } from './provider.js';
import { TwelveDataProvider } from './twelveDataProvider.js';

export const marketProvider = env.twelveDataApiKey ? new TwelveDataProvider(env.twelveDataApiKey) : new DemoMarketProvider();
export const providerMeta = { provider: marketProvider.name, isDemo: marketProvider.isDemo, timestamp: new Date().toISOString() };
