mkdir dist
cp -r src/* dist/
rm dist/ImageGallery.elm
node_modules/.bin/elm-make src/ImageGallery.elm --output dist/ImageGallery.js