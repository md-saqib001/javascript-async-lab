console.log("Where does Node look for packages?", module.paths);

// This package does NOT exist in any of the node_modules paths above:
const missingPkg = require("some-package-that-does-not-exist");
