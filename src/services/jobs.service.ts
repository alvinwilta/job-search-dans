import axios from "axios";

export async function getDataFromDans() {
  try {
    const res = await axios.get(
      "http://dev3.dansmultipro.co.id/api/recruitment/positions.json"
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
}
