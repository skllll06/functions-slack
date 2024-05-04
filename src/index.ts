import {
  VerifyRequestSignatureParams,
  verifyRequestSignature,
} from "@slack/events-api";
import * as functions from "@google-cloud/functions-framework";
import { Request, Response } from "@google-cloud/functions-framework";
import { HttpError } from "./types/error";
import { SlackMessage } from "./types/slack";
import * as dotenv from "dotenv";

dotenv.config();

functions.http("message", async (req: Request, res: Response) => {
  try {
    if (req.method !== "POST") {
      const error = new HttpError({
        code: 405,
        message: "Only POST requests are accepted",
      });

      throw error;
    }
    // Verify that this request came from Slack
    verifyWebhook({ req });

    const message = req.body.text || "Please provide a message to send.";

    // Return a formatted message
    const response = formatSlackMessage(message);

    // Send the formatted message back to Slack
    res.json(response);

    return Promise.resolve();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
    return Promise.reject(err);
  }
});

// [START functions_slack_format]
/**
 * Format the Knowledge Graph API response into a richly formatted Slack message.
 *
 * @param {string} query The user's search query.
 * @param {object} response The response from the Knowledge Graph API.
 * @returns {object} The formatted message.
 */
const formatSlackMessage = (query: string) => {
  // Prepare a rich Slack message
  // See https://api.slack.com/docs/message-formatting
  const slackMessage: SlackMessage = {
    response_type: "in_channel",
    text: `Comment: ${query}`,
    attachments: [
      {
        title: "Cloud Functions Slack Integration",
        text: "This comment is coming to Slack via Cloud Functions",
        image_url:
          "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        color: "#3367d6",
      },
    ],
  };

  return slackMessage;
};

// [START functions_verify_webhook]
/**
 * Verify that the webhook request came from Slack.
 *
 * @param {object} req Cloud Function request object.
 * @param {string} req.headers Headers Slack SDK uses to authenticate request.
 * @param {string} req.rawBody Raw body of webhook request to check signature against.
 */
const verifyWebhook = ({ req }: { req: Request }) => {
  const signingSecret = process.env.SLACK_SECRET as string;
  const requestSignature = req.headers["x-slack-signature"] as string;
  const body = req.rawBody?.toString();

  const getRequestTimestamp = (): number => {
    const headerValue = req.headers["x-slack-request-timestamp"];
    if (typeof headerValue === "string") {
      const parsedTimestamp = parseInt(headerValue, 10);
      if (!isNaN(parsedTimestamp)) {
        return parsedTimestamp;
      }
    }
    throw new HttpError({ code: 400 });
  };

  const requestTimestamp = getRequestTimestamp();

  const signature: VerifyRequestSignatureParams = {
    signingSecret,
    requestSignature,
    requestTimestamp,
    body: body || "",
  };

  // This method throws an exception if an incoming request is invalid.
  verifyRequestSignature(signature);
};
