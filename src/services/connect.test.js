import { signInRequest } from "./connect";
import axios from "axios";

jest.mock("axios");

describe("signInRequest", () => {
  it("should sign in successfully", async () => {
    const response = {
      data: {
        access: "test-access-token",
        refresh: "test-refresh-token",
        user: {
          id: 2,
          first_name: "Cosme",
          last_name: "Alves",
          email: "cosmeaf@gmail.com",
        },
      },
    };

    axios.post.mockResolvedValue(response);

    const result = await signInRequest("cosmeaf@gmail.com", "qweasd32");

    expect(result).toEqual(response.data);
    expect(axios.post).toHaveBeenCalledWith("/token/", {
      username: "cosmeaf@gmail.com",
      password: "qweasd32",
    });
  });

  it("should handle sign in failure", async () => {
    axios.post.mockRejectedValue(new Error("Sign in failed"));

    const result = await signInRequest("cosmeaf@gmail.com", "wrongpassword");

    expect(result).toBeNull();
    expect(axios.post).toHaveBeenCalledWith("/token/", {
      username: "cosmeaf@gmail.com",
      password: "wrongpassword",
    });
  });
});
