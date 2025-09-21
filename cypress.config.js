const { defineConfig } = require("cypress");
// const {
//   beforeRunHook,
//   afterRunHook,
// } = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);

      // on("before:run", async (details) => {
      //   console.log("override before:run");
      //   await beforeRunHook(details);
      // });

      // on("after:run", async () => {
      //   console.log("override after:run");
      //   await afterRunHook();
      // });
    },
    specPattern: "cypress/e2e/*.js",
  },
});
