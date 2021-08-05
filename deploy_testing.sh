# frontend deployement scripts
cd /home/winmed-fe/testing
rm -rf out
npm ci
npm run build

echo 'Deployment to testing finished'
