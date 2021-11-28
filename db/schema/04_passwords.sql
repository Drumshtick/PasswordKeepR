
DROP TABLE IF EXISTS passwords CASCADE;

CREATE TABLE passwords (
  id SERIAL PRIMARY KEY NOT NULL,
  website_name VARCHAR(255) NOT NULL,
  website_username VARCHAR(255) NOT NULL,
  website_password VARCHAR(255) NOT NULL,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  catagory_id INTEGER REFERENCES catagories(id) ON DELETE CASCADE
);
