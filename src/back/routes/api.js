// 'use strict';

const SudokuSolver = require("../js/sudoku-solver.js");

const Translator = require("../js/translator.js");

const ConvertHandler = require("../js/convertHandler.js");

const multer = require("multer");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);

let issueSchema = new mongoose.Schema({
  project: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: String,
  status_text: String,
  open: { type: Boolean, default: true },
});

let Issue = mongoose.model("Issue", issueSchema);

module.exports = function (app) {
  //----------------------SUDOKU------------------------------

  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const solver = new SudokuSolver();
    if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
      res.json({ error: "Required field(s) missing" });
    } else {
      let check = solver.check(
        req.body.puzzle,
        req.body.coordinate,
        req.body.value
      );
      res.json(check);
    }
  });

  app.route("/api/solve").post((req, res) => {
    if (!req.body.puzzle) {
      res.json({ error: "Required field missing" });
    } else {
      const solver = new SudokuSolver();
      const solvedString = solver.solve(req.body.puzzle);

      if (
        solvedString != "Expected puzzle to be 81 characters long" &&
        solvedString != "Invalid characters in puzzle" &&
        solvedString != "Required field missing" &&
        solvedString != "Puzzle cannot be solved"
      ) {
        res.json({ solution: solvedString });
      } else {
        res.json({ error: solvedString });
      }
    }
  });

  //----------------------TRADUCTION------------------------------

  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    if (req.body.text === "") {
      res.json({ error: "No text to translate" });
    } else if (!req.body.text || !req.body.locale) {
      res.json({ error: "Required field(s) missing" });
    } else {
      let translatedText = translator.getTranslation(
        req.body.text,
        req.body.locale
      );
      if (translatedText.error) {
        res.json(translatedText);
      } else {
        res.json({ text: req.body.text, translation: translatedText });
      }
    }
  });

  //----------------------CONVERSION------------------------------

  const convertHandler = new ConvertHandler();

  app.route("/api/convert").post((req, res) => {
    let input = req.body.text;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    if (initUnit === "invalid unit" && initNum === "invalid number") {
      res.json({ error: "invalid number and unit" });
    } else if (initUnit === "invalid unit") {
      res.json({ error: "invalid unit" });
    } else if (initNum === "invalid number") {
      res.json({ error: "invalid number" });
    } else {
      res.json({
        initNum: parseFloat(initNum),
        initUnit,
        returnNum: parseFloat(returnNum),
        returnUnit,
        string: toString,
      });
    }
  });

  //----------------------TRACKER------------------------------

  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      let queryObject = {
        project,
      };
      for (let key in req.query) {
        queryObject[key] = req.query[key];
      }
      Issue.find(queryObject)
        .select({ project: 0 })
        .exec((err, data) => {
          if (err) {
            return console.log("Error: " + err);
          } else {
            res.json(data);
          }
        });
    })

    .post(function (req, res) {
      let project = req.params.project;
      let issue = new Issue({
        project,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
      });

      if (issue.issue_title && issue.issue_text && issue.created_by) {
        issue.save((err, data) => {
          if (err) {
            return console.log("Error: " + err);
          } else {
            data = data.toObject();
            delete data.__v;
            res.json(data);
          }
        });
      } else {
        res.json({ error: "required field(s) missing" });
      }
    })

    .put(function (req, res) {
      if (req.body._id) {
        let updatedObject = {
          updated_on: new Date(),
        };

        for (let key in req.body) {
          if (req.body[key] && key != "_id" && key != "open") {
            updatedObject[key] = req.body[key];
          }
          if (key == "open" && !req.body[key]) {
            updatedObject[key] = req.body[key];
          }
        }

        if (Object.keys(updatedObject).length > 1) {
          Issue.findOneAndUpdate(
            { _id: req.body._id },
            updatedObject,
            (err, data) => {
              if (err || !data) {
                res.json({ error: "could not update", _id: req.body._id });
              } else {
                res.json({ result: "successfully updated", _id: data._id });
              }
            }
          );
        } else {
          res.json({ error: "no update field(s) sent", _id: req.body._id });
        }
      } else {
        res.json({ error: "missing _id" });
      }
    })

    .delete(function (req, res) {
      if (req.body._id) {
        Issue.findByIdAndRemove(req.body._id, (err, data) => {
          if (err || !data) {
            res.json({ error: "could not delete", _id: req.body._id });
          } else {
            res.json({ result: "successfully deleted", _id: data._id });
          }
        });
      } else {
        res.json({ error: "missing _id" });
      }
    });

  //----------------------PDF_COUNTER------------------------------

  const maxSize = 6 * 1024 * 1024;

  var upload = multer({
    dest: "./src/back/static/uploads",
    limits: {
      fileSize: maxSize
    },
    fileFilter: (req, file, cb) => {
      cb(null, file.mimetype == "application/pdf");
    },
  });

  const pdfUpload = upload.single("pdfFile");

  app.route("/api/pdfupload").post((req, res, next) => {
    pdfUpload(req, res, (err) => {
      if (err || !req.file) {
        return res.send({
          error:
            "Erreur de fichier. Celui-di doit être un PDF, et peser moins de 6Mo",
        });
      }
      res.send({ message: "Upload réussi !" });
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).send(error.storageErrors);
  });
};
