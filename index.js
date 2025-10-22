import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
 const userMessage = req.body?.text || "Hello from Cream Bot";

 const response = await fetch("https://api.openai.com/v1/chat/completions", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
   },
   body: JSON.stringify({
     model: "gpt-3.5-turbo",
     messages: [
       { role: "system", content: "You are Cream Bot, a friendly AI assistant for Cream First AI." },
       { role: "user", content: userMessage },
     ],
     temperature: 0.7,
   }),
 });

 const data = await response.json();
 const text = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

 res.json({
   version: "v2",
   content: {
     messages: [
       {
         type: "text",
         text,
       },
     ],
   },
 });
});

app.listen(3000, () => console.log("✅ Cream Bot running on port 3000"));

