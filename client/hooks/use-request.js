import { useState } from "react";
import axios from "axios";

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setError] = useState(null);

  const doRequest = async () => {
    try {
      setError(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setError(
        <div className="alert alert-danger">
          <h4>Opps...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};
