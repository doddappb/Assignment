const { register } = require("module");
const path = require("path");
const { format } = require("path");

module.exports={
    default:{
        require:["./src/step-def/**/*.ts","./src/support/world.ts","./src/support/hooks.ts"],
        path:"./src/features/*.feature",
        format:["progress","json:./reports/cucumber_report.json","html:./reports/playwrightdemo.html",],
        // parallel:2

    }
}