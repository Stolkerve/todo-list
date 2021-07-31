import App from "./app"

function main() {
  const app = new App();
  app.run(3000 || process.env.PORT);
}

main();