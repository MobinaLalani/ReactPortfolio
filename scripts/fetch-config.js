const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch"); // اگر Node 18 به پایین داری نیاز است

async function run() {
  try {
    console.log("Fetching DropDownEnums from API...");

    const res = await fetch(
      "https://dev-api.halaz.ir/management/api/v1/Enums/GetAll",
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      console.warn("Warning: API returned empty data.");
    }

    const outputPath = path.join(
      __dirname,
      "../src/Types/enums/dropDowns/DropDownEnums.json",
    );

    // مطمئن می‌شیم فولدر وجود داره
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // داده‌ها رو با فرمت JSON جایگزین می‌کنیم
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");

    console.log(`DropDownEnums.json updated successfully at ${outputPath}`);
  } catch (err) {
    console.error("Error generating DropDownEnums.json:", err);
    process.exit(1);
  }
}

run();
