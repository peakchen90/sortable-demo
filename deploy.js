const path = require('path');
const { execSync } = require('child_process');

const dist = path.join(__dirname, 'dist');
execSync('npm run build');
execSync('git init', { cwd: dist });
execSync('git add -A', { cwd: dist });
execSync('git commit -m "deploy"', { cwd: dist });
execSync('git push -f git@github.com:peakchen90/sortable-demo.git master:gh-pages', { cwd: dist });

console.log('deploy success');
