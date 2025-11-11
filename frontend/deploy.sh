npm run build
cp -r build/* /Users/vanessachiheb/Projects/@SITES/poetry-in-motion/docs/thought-leaders

echo "deployed to poetry-in-motion"


cd /Users/vanessachiheb/Projects/@SITES/poetry-in-motion/docs/thought-leaders
git add .
git commit -m "deploy to thought-leaders"
git push origin main

cd /Users/vanessachiheb/Projects/@SANDBOXES/@FULL-STACK-FRAMEWORKS/MERN/thought-leaders 
