import Ajv, { JSONSchemaType } from "ajv";
import { INews } from "types";

const ajv = new Ajv();

const schema: JSONSchemaType<INews[]> = {
  type: "array",
  items: {
    type: "object",
    properties: {
      category: { type: "string" },
      datetime: { type: "number" },
      headline: { type: "string" },
      id: { type: "number" },
      image: { type: "string" },
      related: { type: "string" },
      source: { type: "string" },
      summary: { type: "string" },
      url: { type: "string" },
    },
    required: [],
  },
  additionalProperties: true,
};

const URL =
  "https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2021-03-01&to=2021-03-15&token=bpjsf67rh5r9328ecgvg";

export async function getNews(): Promise<INews[]> {
  const response = await fetch(URL);
  const news = await response.json();

  const validate = ajv.compile(schema);
  const valid = validate(news);

  // ! throw error
  if (!valid) console.log(validate.errors);

  return news;
}
