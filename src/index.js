const app = require("./app"); // Setup Express App settings, API routes, etc.

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🚀  Server server now on port", PORT, "👻 React App on Port 3000");
});