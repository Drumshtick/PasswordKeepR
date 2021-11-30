
const express = require('express');
const passwordRouter  = express.Router();
const { db, Pool } = require('../db/dbConn');

//db.connect();

const getUserOrganizations = function (userId) {
  return db.query(`
  SELECT DISTINCT organizations.name AS name
  FROM organizations
  JOIN users_organizations ON organizations.id = users_organizations.organization_id
  WHERE user_id = ${userId};`
  ).then(res => {
      // console.log("--------------------------------------");
      // console.log("res: ", res);
      return res.rows;
    }).catch((err) => {
      console.log(err.message);
    });
};

// get routes for password generator page
passwordRouter.get("/", (req, res) => {
  const {user_id} = req.session;
  console.log(user_id);
  getUserOrganizations(user_id)
  .then((organizations) => {
    //console.log(organizations);
    // console.log(results);
    const templateVars = { user_id, organizations};
    res.render("password_gen", templateVars);
  })
  .catch((error) => {
    console.log(error.message);
  });
  return Promise.resolve(false);
});

passwordRouter.post("/", (req, res) => {
  console.log('hello world!');
  res.status(200).send('Working test!');
});


// export whole router
module.exports = passwordRouter;
//module.exports = router ;
