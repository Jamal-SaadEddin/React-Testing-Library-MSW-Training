import { http, HttpResponse } from "msw";

interface UserRequestBody {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export const handlers = [
  http.post("https://api.realworld.io/api/users", async ({ request }) => {
    const requestBody = (await request.json()) as UserRequestBody;
    const email = requestBody.user.email;

    if (email === "fail@example.com") throw new Error();

    return HttpResponse.json({});
  }),
];
