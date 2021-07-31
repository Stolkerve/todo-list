import App from "./app"
/*
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query);
  return res.send("hola mundo");
});
router.get("/hoy", (req, res) => { res.send("hoy es martes") });

app.use("/api", router);
app.use(express.static("static"));
*/
function main() {
  const app = new App();
  app.run(3000 || process.env.PORT);
}

main();