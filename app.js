const express = require("express");
const { projects } = require("./data.json");
const { notFoundError } = require("./utils");

const app = express();

const port = process.env.PORT || 3000;

app.use("/static", express.static("public"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects/:id", (req, res, next) => {
  const { id } = req.params;
  const project = projects.filter((project) => project.id === parseInt(id))[0];
  if (project) {
    res.render("project", { project });
  } else {
    console.log(`The project with id ${parseInt(id)} does not exist`);
    const error = notFoundError();
    next(error);
  }
});

app.use((req, res, next) => {
  console.log(`The URL ${req.url} was not found`);
  const error = notFoundError();
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`The application is running on localhost:${port}!`);
});
