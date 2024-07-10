import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://api.realworld.io/api/users", () => {
    return HttpResponse.json({});
  }),
];
