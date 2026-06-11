module.exports = {
  apps: [{
    name: 'viai-frontend',
    script: '.next/standalone/server.js',
    cwd: '/home/viai-phammemaiagent/fe-vsoftware',
    env: { PORT: 4000, HOSTNAME: '0.0.0.0', NODE_ENV: 'production' }
  }]
}
