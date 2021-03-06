/* Import faunaDB sdk */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = async (event, context) => {
  console.log('Function `read-all` invoked')
  return client
    .query(q.Paginate(q.Match(q.Ref('indexes/all_matters'))))
    .then((response) => {
      const matterRefs = response.data
      // create new query out of item refs. http://bit.ly/2LG3MLg
      const getAllMattersDataQuery = matterRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllMattersDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret),
        }
      })
    })
    .catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}
