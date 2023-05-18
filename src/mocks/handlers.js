import { rest } from "msw";
export const handlers = [
  rest.get("/list-contacts.php", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        contacts: [
          {
            id: 1,
            name: "Taylor",
            email: "taylor@mail.com",
            selected: false,
          },
          {
            id: 2,
            name: "Alice",
            email: "alice@mail.com",
            selected: false,
          },
          {
            id: 3,
            name: "Bob",
            email: "bob@mail.com",
            selected: false,
          },
        ],
      })
    );
  }),
  rest.get("/list-messages.php", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        messages: [
          {
            id: 1,
            receiverId: 1,
            receiverName: "Juri",
            content: "text",
          },
          {
            id: 2,
            receiverId: 2,
            receiverName: "Juri",
            content: "text",
          },
        ],
      })
    );
  }),
  rest.post("/contact", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
  rest.post("/profile/:profileId", (req, res, ctx) => {
    const body = req.body;
    return res(ctx.status(200), ctx.json({ success: true, payload: body }));
  }),
  rest.post("/login", (req, res, ctx) => {
    if (req.body.username && req.body.password) {
      sessionStorage.setItem("isAuthenticated", true);
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          user: { id: 1, username: "user", email: "user@example.com" },
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          success: false,
          error: "Invalid username or password",
        })
      );
    }
  }),
  rest.get("/getlogin-User", (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      return res(
        ctx.status(201),
        ctx.json({
          success: false,
        })
      );
    }

    const user = {
      id: 1,
      username: "inisi",
      email: "inis@gmail.com",
    };
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        user: user,
      })
    );
  }),
  rest.post("/logout", (req, res, ctx) => {
    sessionStorage.removeItem("isAuthenticated");
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
  // rest.get('/user', (req, res, ctx) => {
  // Persist user's authentication in the session
  //   sessionStorage.setItem('is-authenticated', 'true')

  //   // Check if the user is authenticated in this session
  //   const isAuthenticated = sessionStorage.getItem('is-authenticated')
  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: 'Not authorized',
  //       }),
  //     )
  //   }
  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: 'admin',
  //     }),
  //   )
  // }),
];
