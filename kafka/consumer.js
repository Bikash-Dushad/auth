const kafka = require("../config/kafka");
const { AUTHUSER_REGISTERED } = require("./topics");
const consumer = kafka.consumer({ groupId: "auth-service-group" });
const AuthModel = require("../models/auth.schema");

const markAuthUserRegistered = async ({ authId }) => {
  try {
    const user = await AuthModel.findById(authId);
    if (!user) {
      throw new Error("Auth user not found");
    }
    user.isRegistered = true;
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

const startAuthUserRegisteredConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: AUTHUSER_REGISTERED,
    fromBeginning: false,
  });

  console.log("Auth Service Kafka Consumer Connected");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());

      await markAuthUserRegistered({
        authId: data.authId,
      });
    },
  });
};

module.exports = startAuthUserRegisteredConsumer;
