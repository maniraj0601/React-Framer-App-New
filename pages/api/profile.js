// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import myData from "../../public/myData.json";

export default function handler(req, res) {
  res.status(200).json(myData.data);
}
