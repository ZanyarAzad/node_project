const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const joi = require("joi");
const db = require("./db");
const reusable = require("./plugin/methods");
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const allUser = await db.user.findMany({
    select: { id: true, first_name: true, age: true },
    where: { active: true },
  });
  res.send(allUser);
});

app.get("/users/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await db.user
    .findFirstOrThrow({
      where: { id: userId },
      select: { id: true, first_name: true, age: true },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      const error = reusable.prismaCatch(err);
      res.status(error.status).send({ message: error.message });
    });
});

app.get("/users/:userId/:age", async (req, res) => {
  const userId = req.params.userId;
  const age = req.params.age;
  const user = await db.user.findFirst({
    where: { age: age },
    select: { id: true, first_name: true, age: true },
  });
  res.send(user);
});

app.post("/users", async (req, res) => {
  const body = req.body;
  const addUser = await db.user.create({ data: body });

  res.send(addUser);
});
app.put("/users/:userId", async (req, res) => {
  const body = req.body;
  const userId = parseInt(req.params.userId);
  const { error, value } = joi
    .object({
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      age: joi.number().required(),
    })
    .validate(body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const addUser = await db.user
    .update({ data: value, where: { id: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      const error = reusable.prismaCatch(err);
      res.status(error.status).send({ message: error.message });
    });
});

app.delete("/remove_user/:user_id", async (req, res) => {
  const user_id = parseInt(req.params.user_id);

  try {
    const deletedUser = await db.user.delete({
      where: { id: user_id },
    });

    res.send({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    const error = reusable.prismaCatch(err);
    res.status(error.status).send({ message: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`slaw app listening on port ${port}`);
});
