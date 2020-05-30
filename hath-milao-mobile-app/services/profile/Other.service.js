import Axios from "axios";

import config from "../../util/config.json";
import { getCurrentUser } from "../auth.service.js";

const UpdateOther = async data => {
  const user = await getCurrentUser();
  const token = user.access_token;

  return Axios.put(
    `${config.SERVER_URI}/student/profile/other/${user.user.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    },
    { timeout: 5000 }
  );
};

export { UpdateOther };
