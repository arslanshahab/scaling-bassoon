# frontend deployement scripts
cd /home/winmed-fe/staging
rm -rf out
npm ci
npm run build

echo 'Deployment to staging finished'
