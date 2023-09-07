require("dotenv").config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const calculate_price = (start_date, end_date, seating) => {
  const charges = JSON.parse(process.env.CHARGES);
  const key = `CAP${seating}_CHARGE`;

  const days = number_of_days(start_date, end_date);
  const service_charge = charges.SERVICE_CHARGE * days;
  const tax = charges[`${key}`] * days;

  return {
    service_charge,
    tax,
    total_amount: service_charge + tax,
  };
};

const send_whatsapp_message = (contact_number, data) => {
  client.messages
    .create({
      body: client_whatsapp_message(data),
      from: `whatsapp:${process.env.TWILIO_CONTACT_NUMBER}`,
      to: `whatsapp:+91${contact_number}`,
    })
    .then((message) =>
      console.log(
        `Message sent successfully to client. Message SId ${message.sid}`
      )
    );

  client.messages
    .create({
      body: admin_whatsapp_message(data),
      from: `whatsapp:${process.env.TWILIO_CONTACT_NUMBER}`,
      to: `whatsapp:+91${process.env.ADMIN_CONTACT_NUMBER}`,
    })
    .then((message) =>
      console.log(
        `Message sent successfully to admin. Message SId ${message.sid}`
      )
    );
};

const client_whatsapp_message = (params) => {
  let msg;
  if (params.tax_type === "road_tax") {
    msg = `Your order is confirmed. The details are mentioned below.\n*Vehicle Number*: ${params.vehicle_number}\n*Seating Capacity*: ${params.seating}\n*Chasis Number*: ${params.chasis_number}\n*Tax Mode*: ${params.tax_mode}`;
  } else {
    msg = `Your order is confirmed. The details are mentioned below.\n*State*: ${
      params.state
    }\n*City*: ${params.city}\n*Vehicle Number*: ${
      params.vehicle_number
    }\n*Seating Capacity*: ${
      params.seating
    }\n*Start Date*: ${params.start_date.getDate()}-${
      params.start_date.getMonth() + 1
    }-${params.start_date.getFullYear()}\n*End Date*: ${params.end_date.getDate()}-${
      params.end_date.getMonth() + 1
    }-${params.end_date.getFullYear()}\n*Amount*: ${
      params.amount.total_amount
    }`;
  }

  return msg;
};

const admin_whatsapp_message = (params) => {
  let msg;
  if (params.tax_type === "road_tax") {
    msg = `New Order Received. The details are mentioned below.\n*Type*: ${params.tax_type}\n*Vehicle Number*: ${params.vehicle_number}\n*Seating Capacity*: ${params.seating}\n*Chasis Number*: ${params.chasis_number}\n*Tax Mode*: ${params.tax_mode}`;
  } else {
    msg = `New Order Received. The details are mentioned below.\n*State*: ${
      params.state
    }\n*City*: ${params.city}\n*Vehicle Number*: ${
      params.vehicle_number
    }\n*Seating Capacity*: ${
      params.seating
    }\n*Start Date*: ${params.start_date.getDate()}-${
      params.start_date.getMonth() + 1
    }-${params.start_date.getFullYear()}\n*End Date*: ${params.end_date.getDate()}-${
      params.end_date.getMonth() + 1
    }-${params.end_date.getFullYear()}\n*Amount*: ${
      params.amount.total_amount
    }`;
  }

  return msg;
};

const number_of_days = (start_date, end_date) => {
  return (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24) + 1;
};

module.exports = { calculate_price, send_whatsapp_message };
