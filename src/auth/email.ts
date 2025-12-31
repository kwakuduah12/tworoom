export async function sendOtpEmail(email: string, code: string) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "TwoRoom <onboarding@resend.dev>",
        to: email,
        subject: "Your TwoRoom code",
        html: `<p>Your code is <strong>${code}</strong></p><p>It expires in 10 minutes.</p>`,
      }),
    });
  }