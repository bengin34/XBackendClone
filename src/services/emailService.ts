import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


require('dotenv').config()

const ses = new SESClient({});

const createSendEmailCommmand = (
  toAdress: string,
  fromAddress: string,
  message: string,
) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAdress],
    },
    Source: fromAddress,
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Your Email Token",
      },
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message,
        },
      },
    },
  });
};

export const sendEmailToken = async (email: string, token: string) => {
  console.log("email sent to: ", email, token);

  const message = `Your email token is: ${token}`;
  const command = createSendEmailCommmand(
    email,
    "becaglar3434@gmail.com",
    message,
  );

  try {
    return await ses.send(command);
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};

sendEmailToken("caglarburakengin@gmail.com", "123456");
