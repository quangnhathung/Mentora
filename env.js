/* eslint-env node */
const z = require('zod');
const packageJSON = require('./package.json');
const path = require('path');

const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

/**
 * STATIC VALUES (giữ lại giá trị cơ bản)
 */
const BUNDLE_ID = 'com.mahtutor';
const PACKAGE = 'com.mahtutor';
const NAME = 'Mahtutor';
const SCHEME = 'mahtutor';

/**
 * Helper thêm suffix cho bundle id khi không phải production
 */
/**
 * @param {string} name
 * @returns {string}
 */
const withEnvSuffix = (name) => {
  return APP_ENV === 'production' ? name : `${name}.${APP_ENV}`;
};

/**
 * 1️⃣ CLIENT ENV — dùng trong app (src)
 */
const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  SCHEME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  // Env bạn còn dùng
  API_URL: z.string(),
  VAR_NUMBER: z.number(),
  VAR_BOOL: z.boolean(),
  REACTOTRON_IP: z.string(),
});

/**
 * 2️⃣ BUILD-TIME ENV — chỉ dùng khi build app
 * ⚠️ Giữ trống vì bạn không dùng EAS / Google
 */
const buildTime = z.object({});

/**
 * CLIENT VALUES
 */
const _clientEnv = {
  APP_ENV,
  NAME,
  SCHEME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,

  API_URL: process.env.API_URL || `http://${process.env.MYIP}:9090`,
  VAR_NUMBER: Number(process.env.VAR_NUMBER),
  VAR_BOOL: process.env.VAR_BOOL === 'true',
  REACTOTRON_IP: process.env.REACTOTRON_IP || process.env.MYIP || `127.0.0.1`,
};

/**
 * BUILD-TIME VALUES
 */
const _buildTimeEnv = {};

/**
 * MERGE + VALIDATE
 */
const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,
    `\n❌ Missing variables in .env.${APP_ENV}`
  );
  throw new Error('Invalid environment variables');
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
  Env,
  ClientEnv,
  withEnvSuffix,
};
