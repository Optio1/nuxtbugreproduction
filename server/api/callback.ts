import jwt from 'jsonwebtoken';
export default defineEventHandler(event => {
    console.log("Callback")
    let stateCookie = getCookie(event, 'state')
    const secret = "hEl2MLIWr3JU/J5kAnZ8thhkEmZg9DLbBdBVtkpjClI="
    console.log("Got Cookie " + stateCookie)
    if (stateCookie === undefined) {
      console.log("State Cookie is undefined")
      // return sendRedirect(event, "/api/login", 307)
    }
    console.log("State Cookie Checked")
    var decoded = jwt.verify(stateCookie, secret)
    deleteCookie(event, 'state')
    console.log("Deleted Cookie")
    if (decoded.state === getQuery(event).state) {
      return {
        status: 200,
        body: "State Validation Passed, You're Safe!"
      }
    } else {
      return {
        status: 401,
        body: "State Validation Failed, You're Not Safe!"
      }
    }
  })
  