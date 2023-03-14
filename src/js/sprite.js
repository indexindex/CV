const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');
const spriter = new SVGSpriter({
    dest: `${__dirname}/../assets/`,
    svg: {
        namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
        namespaceIDPrefix: '', // Add a prefix to the automatically generated namespaceIDs
        namespaceClassnames: true, // Add namespace token to all CSS class names in SVG shapes
        dimensionAttributes: true // Width and height attributes on the sprite
    },
    mode: {
        symbol: true, // Create a «symbol» sprite
    }
});

const addToSpriter = (path) => {
    spriter.add(path, null, fs.readFileSync(path, 'utf-8'));
}

addToSpriter(`${__dirname}/../assets/svg/mobile-screen-button-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/earth-europe-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/envelope-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/map-pin-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/facebook-f.svg`);
addToSpriter(`${__dirname}/../assets/svg/linkedin-in.svg`);
addToSpriter(`${__dirname}/../assets/svg/graduation-cap-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/briefcase-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/book-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/camera-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/code-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/dumbbell-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/gamepad-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/headphones-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/person-walking-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/plane-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/tree-solid.svg`);
addToSpriter(`${__dirname}/../assets/svg/html5.svg`);
addToSpriter(`${__dirname}/../assets/svg/css3.svg`);
addToSpriter(`${__dirname}/../assets/svg/sass.svg`);
addToSpriter(`${__dirname}/../assets/svg/bootstrap.svg`);
addToSpriter(`${__dirname}/../assets/svg/zurb.svg`);
addToSpriter(`${__dirname}/../assets/svg/js.svg`);
addToSpriter(`${__dirname}/../assets/svg/jquery.svg`);
addToSpriter(`${__dirname}/../assets/svg/react.svg`);
addToSpriter(`${__dirname}/../assets/svg/node.svg`);
addToSpriter(`${__dirname}/../assets/svg/webpack.svg`);
addToSpriter(`${__dirname}/../assets/svg/browserify.svg`);
addToSpriter(`${__dirname}/../assets/svg/npm.svg`);
addToSpriter(`${__dirname}/../assets/svg/yarn.svg`);

spriter.compile((error, result) => {
    for (const mode of Object.values(result)) {
        for (const resource of Object.values(mode)) {
            fs.mkdirSync(path.dirname(resource.path), { recursive: true });
            fs.writeFileSync(resource.path, resource.contents);
        }
    }
});