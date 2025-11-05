# 🌐 ESP32 Web Server Guide

Run your own **Web Server on an ESP32** — simple, cheap, and fun! 🚀  

---

## 💡 What You’ll Need

- 💵 **ESP32 board** (around **$5**)  
  → It’s affordable and much more powerful than classic Arduino boards.  
- 💻 **VS Code** with the **PlatformIO** extension  
  → Download both — don’t worry, Google or ChatGPT can help you set them up 😉  

---

## ⚙️ Getting Started

1. **Create a new PlatformIO project** in VS Code.  
   *OR*  
2. **Clone this project** directly (note: I’m using an **ESP32-CAM**).  

---

## 📶 Configure Your Wi-Fi

Before uploading the code, make sure to edit these lines with your own Wi-Fi info:


const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

## 🧩 Tips for Connection

If your main Wi-Fi network is **not accessible**, you can:

- 🔹 Connect your **ESP32** to your **computer’s hotspot** — great for local testing.  
- 🔹 Or use **ngrok** to make your local web server **publicly accessible** (acts as a bridge).  

---

## 🎉 Done!

Now just **upload** the code**, open the Serial Monitor**, and check the **IP address** to access your ESP32 Web Server in your browser. 🌍  

---

> ✨ **HOPE YOU CAN DO IT!** ✨
