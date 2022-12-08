import twilio from "twilio";
import twilioConf from "../config/twilio";

export default twilio(twilioConf.accountSID, twilioConf.authToken);
