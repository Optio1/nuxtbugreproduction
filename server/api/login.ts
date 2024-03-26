import jwt from 'jsonwebtoken';
export default defineEventHandler(event => {
    const secret = "hEl2MLIWr3JU/J5kAnZ8thhkEmZg9DLbBdBVtkpjClI="
    function stringGen() {
        var text = ""
        let len = 20
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

        for (var i = 0; i < len; i++)
          text += charset.charAt(Math.floor(Math.random() * charset.length))

        return text
    }
    var state = stringGen()
    var token = jwt.sign({ state: state }, secret);
    setCookie(event, 'state', token, {
      maxAge: 15*60,
      secure: true,
      sameSite: 'strict',
      httpOnly: true
    })
    return sendRedirect(event, `https://discord.com/oauth2/authorize?client_id=773293692672016506&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fcallback&scope=identify+guilds+email&state=${state}`, 307)
  })