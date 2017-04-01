const env = process.env.NODE_ENV || 'development';
exports.isPro = () => env === 'production';
exports.isDev = () => env === 'development';