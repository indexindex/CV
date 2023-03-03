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

spriter.add(`${__dirname}/../assets/svg/mobile-screen-button-solid.svg`, null, 
fs.readFileSync(`${__dirname}/../assets/svg/mobile-screen-button-solid.svg`, 'utf-8'));

spriter.add(`${__dirname}/../assets/svg/earth-europe-solid.svg`, null, 
fs.readFileSync(`${__dirname}/../assets/svg/earth-europe-solid.svg`, 'utf-8'));

spriter.add(`${__dirname}/../assets/svg/envelope-solid.svg`, null, 
fs.readFileSync(`${__dirname}/../assets/svg/envelope-solid.svg`, 'utf-8'));

spriter.add(`${__dirname}/../assets/svg/map-pin-solid.svg`, null, 
fs.readFileSync(`${__dirname}/../assets/svg/map-pin-solid.svg`, 'utf-8'));

spriter.add(`${__dirname}/../assets/svg/facebook-f.svg`, null, 
fs.readFileSync(`${__dirname}/../assets/svg/facebook-f.svg`, 'utf-8'));

spriter.add(`${__dirname}/../assets/svg/linkedin-in.svg`, null, 
fs.readFileSync(`${__dirname}/../assets/svg/linkedin-in.svg`, 'utf-8'));

spriter.add(`${__dirname}/../assets/svg/graduation-cap-solid.svg`, null, 
fs.readFileSync(`${__dirname}/../assets/svg/graduation-cap-solid.svg`, 'utf-8'));

spriter.add(`${__dirname}/../assets/svg/briefcase-solid.svg`, null, 
fs.readFileSync(`${__dirname}/../assets/svg/briefcase-solid.svg`, 'utf-8'));

spriter.compile((error, result) => {
    for (const mode of Object.values(result)) {
        for (const resource of Object.values(mode)) {
            fs.mkdirSync(path.dirname(resource.path), { recursive: true });
            fs.writeFileSync(resource.path, resource.contents);
        }
    }
});