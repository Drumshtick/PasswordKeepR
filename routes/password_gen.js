
const express = require('express');
const passwordRouter  = express.Router();
const db = require('../db/dbConn');
const generator = require('generate-password');
//db.connect();

// const getUserOrganizations = function (userId) {
//   return db.query(`
//   SELECT DISTINCT organizations.name AS name
//   FROM organizations
//   JOIN users_organizations ON organizations.id = users_organizations.organization_id
//   WHERE user_id = ${userId};`
//   ).then(res => {
//       // console.log("--------------------------------------");
//       // console.log("res: ", res);
//       return res.rows;
//     }).catch((err) => {
//       console.log(err.message);
//     });
// };

// get routes for password generator page
const getUserOrganizations = function (userId) {
  return db.query(`
  SELECT DISTINCT organizations.name AS name
  FROM organizations
  JOIN users_organizations ON organizations.id = users_organizations.organization_id
  WHERE user_id = ${userId};
  `).then(res => {
      // console.log("--------------------------------------");
      // console.log("res: ", res);
      return res.rows;
    }).catch((err) => {
      console.log(err.message);
    });
};

const passwordGenerator = function (req) {

  if (req.body.uppercase === 'true') {
    uppercaseBoolean = true;
  } else if (req.body.uppercase === 'false') {
    uppercaseBoolean = false;
  }

  if (req.body.lowercase === 'true') {
    lowercaseBoolean = true;
  } else if (req.body.lowercase === 'false') {
    lowercaseBoolean = false;
  }

  if (req.body.symbols === 'true') {
    symbolsBoolean = true;
  } else if (req.body.symbols=== 'false') {
    symbolsBoolean = false;
  }

  if (req.body.numbers === 'true') {
    numbersBoolean = true;
  } else if (req.body.numbers === 'false') {
    numbersBoolean = false;
  }

  return password = generator.generate({
    length: req.body.length,
    numbers: numbersBoolean,

    uppercase: uppercaseBoolean,
    lowercase: lowercaseBoolean,
    symbols: symbolsBoolean
  });
}

// const getUserOrganizations = function (userId) {
//   const query = `
//   SELECT DISTINCT organizations.name AS name
//   FROM organizations
//   JOIN users_organizations ON organizations.id = users_organisations.organization_id
//   WHERE user_id = ${userId};
//   `
//   return pool.query(query)
//     .then(res => {
//       return res.rows;
//     });
// };

// router.post('/', (req, res) => {
//   const user = req.body;
//   user.password = bcrypt.hashSync(user.password, 12);
//   database.addUser(user)
//   .then(user => {
//     if (!user) {
//       res.send({error: "error"});
//       return;
//     }
//     req.session.userId = user.id;
//     res.send("🤗");
//   })
//   .catch(e => res.send(e));
// });

passwordRouter.get("/", (req, res) => {
  const {user_id} = req.session;
  console.log(user_id);
  getUserOrganizations(user_id)
  .then((organizations) => {
    //console.log(organizations);
    // console.log(results);
    const templateVars = {user_id, organizations};
    res.render("password_gen", templateVars);
  })
  .catch((error) => {
    console.log(error.message);
  });
  return Promise.resolve(false);
});

const getOrgID = function(orgName) {
  return db
  .query(`
    SELECT id
    FROM organizations
    WHERE name = $1;
  `, [orgName])
  .then((results) => {
    return results.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const writePassTodb = function(data) {
  return db
  .query(`
    INSERT INTO
    passwords (user_id, organization_id, category, url, password_text)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `, [data.user_id, data.organization_id, data.category, data.url, data.password_text])
  .then((results) => {
    return results.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

passwordRouter.post("/", (req, res) => {
  const { user_id } = req.session;
  const {organisationName, category, url} = req.body;
  if(req.body.length){
    const password_text = passwordGenerator(req);
    getOrgID(organisationName).then((result) => {
      const data = {
        user_id,
        'organization_id': result.id,
        'category': category,
        url,
        password_text
      };
      writePassTodb(data)
      .then(result => {
        console.log(result);
        // return res.redirect('/');
      })
    });
  } else {
  const {password} = req.body;
  getOrgID(organisationName).then((result) => {
    const data = {
      user_id,
      'organization_id': result.id,
      'category': category,
      url,
      'password_text': password
    };
    // console.log("made obj data: ", data);
    writePassTodb(data)
    .then(result => {
      console.log(result);
      // return res.redirect('/');
      res.send("worked");
    })
  });
  // res.status(200).send('Working test!');
  }
});

// const id = req.session.user_id;



//   const thePassword = passwordGenerator();

// export whole router
module.exports = passwordRouter;
//module.exports = router ;
