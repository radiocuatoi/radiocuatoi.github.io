let resolved = {};
let packages = undefined;
const packagesLockdotJson = async (options) => {
    if (packages) return packages;
    let path = options.path || ".";
    let response = await fetch(`${path}/package-lock.json`);
    let packagesLock = await response.json();
    for (let name in packagesLock.dependencies) {
        const dependency = packagesLock.dependencies[name];
        let packageUrl = `${path}/node_modules/${name}`;
        if (options.cdn === true) {
            packageUrl = `https://unpkg.com/${name}@${dependency.version}/`;
        }
        let dependencyJson = await fetch(`${packageUrl}/package.json`).then(r => r.json());
        dependency.json = dependencyJson;
        dependency.main = `${packageUrl}/${dependencyJson.main}`;
    }
    return (packages = packagesLock);
};
const brewquire = async (url, referer, options = {}) => {
    let packagesLock = await packagesLockdotJson(options);
    let dep = url.split("/")[0];
    if (packagesLock.dependencies[dep]) {
        return await brewquire(packagesLock.dependencies[dep].main, null, options);
    }
    let urlParts = `${url.replace(/\.js$/g, "")}.js`.split("/");
    if (referer) {
        let refererParts = referer.split("/");
        while (urlParts[0] === "." || urlParts[0] === "..") {
            refererParts.pop();
            urlParts.shift();
        }
        urlParts = refererParts.concat(urlParts);
    }
    let resolvedUrl = urlParts.join("/");
    if (resolved[resolvedUrl]) return resolved[resolvedUrl];
    let code = await fetch(resolvedUrl).then(r => r.text());
    if (options.transform) code = options.transform(code).code;
    return await (async () => {
        let exports = {};
        let require = async (u) => brewquire(u, resolvedUrl, options);
        try {
            code = code.replace(/= require/g, "= await require");
            await new Promise(resolve => {
                eval(`(async ()=>{${code};resolve()})()`);
            });
        } catch (e) {
            console.log(`Error parsing ${resolvedUrl}`, e, code);
        }
        resolved[resolvedUrl] = exports;
        return exports;
    })();
};

window.brewquire = brewquire;
