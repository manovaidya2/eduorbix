  import express from "express";
  import mongoose from "mongoose";
  import cors from "cors";
  import dotenv from "dotenv";
  dotenv.config();

import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import studyIndiaProgramRoutes from "./routes/studyIndiaProgramRoutes.js";
import studyAbroadRoutes from "./routes/studyAbroadRoutes.js";
import universityRoutes from './routes/universityRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import agentRoutes from './routes/agentRoutes.js'; // Add this line  
import associatesRoutes from "./routes/associatesRoutes.js";









  const app = express();

  // const allowedOrigins = process.env.CORS_ORIGIN
  //   ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
  //   : ["*", "http://localhost:5174"
  //     ,"https://apicourse.manovaidya.com", "https://course.manovaidya.com",
  //     "https://admincourse.manovaidya.com", "https://www.course.manovaidya.com"
  //   ];
  // app.use(cors({ origin: allowedOrigins, credentials: true }));
  // app.use(cors({ origin: (origin, cb) => !origin || allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error("Not allowed by CORS")), credentials: true }));
  app.use(cors({ origin: "*", credentials: true }));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use("/uploads", express.static("uploads"));

  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

 //use routes

app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/study-india-programs", studyIndiaProgramRoutes);
app.use("/api/study-abroad", studyAbroadRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api', blogRoutes);
app.use('/api', applicationRoutes);
app.use('/api', contactRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/agents', agentRoutes); // Add this line
app.use("/api", associatesRoutes);










  app.get("/api/health", (req, res) => res.json({ status: "OK", mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" }));

  app.use((err, req, res, next) => {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({ error: err.message });
  });

  const PORT = process.env.PORT || 5003;
  app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
