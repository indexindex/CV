const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');
const spriter = new SVGSpriter({
    dest: `${__dirname}/../assets/`,
    mode: { symbol: true }, // ? create a <symbol> sprite
    svg: {
        namespaceIDs: true, // ? add namespace token to all IDs in SVG shapes
        namespaceIDPrefix: '', // ? add a prefix to the automatically generated namespace IDs
        namespaceClassnames: true, // ? add namespace token to all CSS class names in SVG shapes
        dimensionAttributes: true // ? width and height attributes on the sprite
    }
});

const addToSpriter = (path) => {
    spriter.add(path, null, fs.readFileSync(path, 'utf-8'));
}

addToSpriter(`${__dirname}/../assets/svg/adobe-illustrator.svg`);
addToSpriter(`${__dirname}/../assets/svg/adobe-premiere-pro.svg`);
addToSpriter(`${__dirname}/../assets/svg/angle-up-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/arrow-rotate-left-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/arrow-up-right-from-square-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/book-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/bootstrap.svg`);
addToSpriter(`${__dirname}/../assets/svg/browserify.svg`);
addToSpriter(`${__dirname}/../assets/svg/bug-slash-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/camera-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/code-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/cookie-bite-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/css3.svg`);
addToSpriter(`${__dirname}/../assets/svg/dumbbell-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/earth-europe-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/envelope-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/express.svg`);
addToSpriter(`${__dirname}/../assets/svg/facebook-f.svg`);
addToSpriter(`${__dirname}/../assets/svg/firebase.svg`);
addToSpriter(`${__dirname}/../assets/svg/gear-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/graduation-cap-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/hand-pointer-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/html5.svg`);
addToSpriter(`${__dirname}/../assets/svg/jquery.svg`);
addToSpriter(`${__dirname}/../assets/svg/js.svg`);
addToSpriter(`${__dirname}/../assets/svg/language-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/layer-group-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/linkedin-in.svg`);
addToSpriter(`${__dirname}/../assets/svg/list-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/map-pin-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/mobile-screen-button-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/mongodb.svg`);
addToSpriter(`${__dirname}/../assets/svg/mouse.svg`);
addToSpriter(`${__dirname}/../assets/svg/node.svg`);
addToSpriter(`${__dirname}/../assets/svg/npm.svg`);
addToSpriter(`${__dirname}/../assets/svg/palette-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/plane-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/react.svg`);
addToSpriter(`${__dirname}/../assets/svg/roadmap.svg`);
addToSpriter(`${__dirname}/../assets/svg/sass.svg`);
addToSpriter(`${__dirname}/../assets/svg/typescript.svg`);
addToSpriter(`${__dirname}/../assets/svg/webpack.svg`);
addToSpriter(`${__dirname}/../assets/svg/wordpress.svg`);
addToSpriter(`${__dirname}/../assets/svg/yarn.svg`);
addToSpriter(`${__dirname}/../assets/svg/zurb.svg`);

spriter.compile((error, result) => {
    for (const mode of Object.values(result)) {
        for (const resource of Object.values(mode)) {
            fs.mkdirSync(path.dirname(resource.path), { recursive: true });
            fs.writeFileSync(resource.path, resource.contents);
        }
    }
});