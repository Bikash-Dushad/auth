const kafka = require("../config/kafka");
const { CAPTAIN_REGISTERED } = require("./topics");
const consumer = kafka.consumer({ groupId: "auth-service-group" });
const AuthModel = require("../models/auth.schema");

const markCaptainAsRegistered = async ({ authId }) => {
  try {
    const user = await AuthModel.findById(authId);
    if (!user) {
      throw new Error("Auth user not found");
      return;
    }
    user.isRegistered = true;
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

const startCaptainRegisteredConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: CAPTAIN_REGISTERED,
    fromBeginning: false,
  });

  console.log("Auth Service Kafka Consumer Connected");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      
      await markCaptainAsRegistered({
        authId: data.authId,
      });
    },
  });
};

module.exports = startCaptainRegisteredConsumer;
