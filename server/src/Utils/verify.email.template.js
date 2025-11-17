export const verifyEmailTemplate = (link) => {
  return `
  <div style="
      background-color:#f4f4f4;
      padding:40px 0;
      font-family: Arial, sans-serif;
  ">
    <div style="
        max-width:600px;
        margin:0 auto;
        background:white;
        border-radius:10px;
        padding:40px;
        box-shadow:0 4px 15px rgba(0,0,0,0.1);
        text-align:center;
    ">

      <img 
        src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
        alt="Email Verification"
        style="width:120px; margin-bottom:20px;"
      />

      <h1 style="color:#333; margin-bottom:10px;">
        Verify Your Email
      </h1>

      <p style="color:#555; font-size:16px; line-height:1.6;">
        Thanks for signing up! Please verify your email address by clicking the button below.
      </p>

      <a href="${link}"
        style="
          display:inline-block;
          margin-top:25px;
          padding:14px 28px;
          background-color:#4CAF50;
          color:white;
          text-decoration:none;
          font-size:16px;
          font-weight:bold;
          border-radius:8px;
        "
      >
        Verify Email
      </a>

      <p style="color:#555; font-size:16px; line-height:1.6;">
        This Link will expire in 1 hour.
      </p>
    </div>
  </div>
`;
};
