import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: 'postgresql://course_with_ai_db_owner:deE8jp5sTGrh@ep-bold-paper-a5i97pwy.us-east-2.aws.neon.tech/course_with_ai_db?sslmode=require',
  }
});
