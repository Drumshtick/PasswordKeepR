-- SELECT username , url, count(1)
-- FROM passwords GROUP BY  username , url
-- Having count(1) > 1;


const usernameExist = function(data){

  return db
  .query(`select username from passwords
  where username = $1 AND url = $2
  AND organization_id IN (select id from organizations
    where name = $3)

  `,[data.username, data.url, data.organisationName])
  .then((res)=>{
    console.log(res.rows)
    if(res.rows.length === 0){
      return false;
    }
     return true;
  })

}
