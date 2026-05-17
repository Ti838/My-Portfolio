import { getPersonalInfo, getProjects } from '../src/data/portfolio.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function debug() {
  console.log("Starting debug fetch...");
  try {
    const start = Date.now();
    const info = await getPersonalInfo();
    console.log(`Fetched personal info in ${Date.now() - start}ms`);
    console.log("Name:", info.name);
    
    const pStart = Date.now();
    const projects = await getProjects();
    console.log(`Fetched projects in ${Date.now() - pStart}ms`);
    console.log("Projects count:", projects.length);
  } catch (err) {
    console.error("Debug fetch failed:", err);
  }
}

debug();
