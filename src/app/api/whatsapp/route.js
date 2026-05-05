import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      pdfLink,
      salesName,
      salesPhone,
    } = body;

    // console.log("DATA:", body);

    // ✅ Validation
    if (!name || !phone || !pdfLink || !salesPhone) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // ⚠️ Use ENV in production
    const apiKey = process.env.AISENSY_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTRmMDk2YzVmNzY3MGJmMWIxZGM2MSIsIm5hbWUiOiJXUklSSyIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NmYyNjhlNDlmZjkxNjBiNzAwMDdlNTEiLCJhY3RpdmVQbGFuIjoiRlJFRV9GT1JFVkVSIiwiaWF0IjoxNzQzMDU3MDQ2fQ.YPEVn8kY_ncv7D_d6OoayAKiQVSuLSma7XsxlgIMtss";

    // ✅ Clean phone numbers properly
    const formatNumber = (num) => {
      const cleaned = String(num).replace(/\D/g, "").replace(/^91/, "");
      return "91" + cleaned;
    };

    const cleanUser = formatNumber(phone);
    const cleanSales = formatNumber(salesPhone);

    console.log("User:", cleanUser);
    console.log("Sales:", cleanSales);

    // ✅ 1. Send PDF to USER
    const res1 = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey,
        campaignName: "pdf_send_user",
        destination: cleanUser,
        userName: name,
        templateParams: [
          String(name),
          String(pdfLink),
          String(salesName),
          String(salesPhone),
        ],
      }),
    });

    const data1 = await res1.json();
    console.log("PDF API RESPONSE:", data1);

    // ❗ If first fails → return early
    if (!res1.ok) {
      return NextResponse.json({
        success: false,
        step: "pdf_send_user failed",
        error: data1,
      });
    }

    // ✅ 2. Send lead to SALES PERSON
    const res2 = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey,
        campaignName: "lead_to_sales",
        destination: cleanSales,
        userName: salesName,
        templateParams: [
         
          String(name),
          String(phone),
          
        ],
      }),
    });

    const data2 = await res2.json();
    console.log("SALES API RESPONSE:", data2);

    if (!res2.ok) {
      return NextResponse.json({
        success: false,
        step: "lead_to_sales failed",
        error: data2,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Both messages sent successfully",
    });

  } catch (error) {
    console.error("ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}