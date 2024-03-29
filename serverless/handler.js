const aws = require('aws-sdk')
const ses = new aws.SES()
const mainEmail = process.env.MAIN_EMAIL
const secondaryEmail = process.env.SECONDARY_EMAIL
const myDomain = process.env.DOMAIN

function generateResponse(code, payload) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(payload),
  }
}

function generateError(code, err) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(err.message),
  }
}

function generateEmailParams(body) {
  const { email, name, phone, message } = JSON.parse(body)
  if (!(email && name && message)) {
    throw new Error(
      "Missing parameters! Make sure to add parameters 'email', 'name', 'message'."
    )
  }

  return {
    Source: secondaryEmail,
    Destination: { ToAddresses: [mainEmail] },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `You received a message from ${myDomain}!`,
      },
    },
  }
}

module.exports.send = async (event) => {
  try {
    const emailParams = generateEmailParams(event.body)
    const data = await ses.sendEmail(emailParams).promise()
    return generateResponse(200, data)
  } catch (err) {
    return generateError(500, err)
  }
}
