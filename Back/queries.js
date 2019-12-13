const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog',
  password: 'password',
  port: 5432,
})

const getPosts = (request, response) => {
    pool.query('select username, title, blogcontent, date from posts, users where posts.userid = users.userid order by date desc;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const newPost = (request, response) => {
    pool.query("insert into posts(userid, title, blogcontent) values ('"+request.body.data.userID+"', '"+request.body.data.title+"', '"+request.body.data.content+"');", (error, results) => {
        if (error) {
            throw error
        } else {
            console.log('Successful post')
            response.status(200).send('Successful post')
        }
    })

}
const checkCredentials = (request, response) => {
    pool.query('select username, password, userid from users;', (error, results) => {
        if (error) {
            throw error
        } else {
            var found = false;
            var match = null;
            for(var i = 0; i<results.rows.length; i++) {
                if (results.rows[i].username == request.body.data.username && results.rows[i].password == (request.body.data.password+' ')) {
                    console.log('Successful login')
                    found = true;
                    match = results.rows[i];
                }
            };
           

            if(found) {
                response.status(200).send(match)
            }
            else {
                response.send({message: 'Invalid credentials'})

            }
        }

        
    })
}

  module.exports = {
      getPosts,
      checkCredentials,
      newPost
  }