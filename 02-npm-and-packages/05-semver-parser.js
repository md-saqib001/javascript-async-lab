const versionString = "2.14.3";
const [major, minor, patch] = versionString.split(".");

console.log("=== Semantic Versioning Decoder ===");
console.log(`Original:  ${versionString}`);
console.log(`Major (${major}): Breaking changes. Code rewrites needed.`);
console.log(`Minor (${minor}): New features. Backwards compatible.`);
console.log(`Patch (${patch}): Bug fixes. Always safe to update.`);