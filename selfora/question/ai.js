 const OPENAI_API_KEY = "APL key";

    async function analyzeAnswer() {
      const userInput = document.getElementById("userInput").value;
      const resultDiv = document.getElementById("result");

      const messages = [
        {
          role: "system",
          content: "คุณคือที่ปรึกษาด้านMBTIและการพัฒนาตนเอง วิเคราะห์คำตอบปลายเปิดของผู้ใช้ในเชิงลึก  และควรพัฒนาทักษะใดเพิ่มเติม"
        },
        {
          role: "user",
          content: `คำตอบของผู้ใช้: ${userInput}`
        }
      ];

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5/4", //ไม่แน่ใจใช้ตัวไหน//
            messages: messages,
            temperature: 0.7
          })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
          resultDiv.innerText = data.choices[0].message.content;
        } else {
          resultDiv.innerText = "❌ ไม่สามารถวิเคราะห์ได้ กรุณาลองใหม่";
        }
      } catch (error) {
        resultDiv.innerText = "⚠️ เกิดข้อผิดพลาดในการเชื่อมต่อ API";
        console.error(error);
      }
    }