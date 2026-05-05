// saurabh code 
export const buildPdfPayload = (service = {}, userData = {}) => {

  try {
    const {
      selectedService,
      selectedMethod,
      Addons = [],
      ToolUp = [],
      calculationResult = {},
      Demand,
      Installment = [],

       // ✅ NOW coming from service
      TandE = [],
      Desc = [],
    } = service;

    // console.log('TandE', TandE);
    // console.log('Desc', Desc);

    const {
      UserName,
      QueryId,
      ResearchArea,
      ResearchTopic,
      Course,
      ResearchDomain,
      Country,
      State,
      City,
      Createdby,
      Wrirk_Penic_Guide,
    } = userData;

    // ================= DESC FIX =================
    let cleanText = "";

    if (Desc && Desc.length > 0) {
      const template = Desc[0]?.Content || "";

      const values = {
        ResearchTopic: `<strong>${ResearchArea}</strong>`,
        ServiceType: `<strong>${selectedService?.label}</strong>`,
      };

      const formatted = template.replace(/\${(.*?)}/g, (match, key) => {
        return values[key] || match;
      });

      // remove HTML except <strong>
      cleanText = formatted.replace(/<(?!\/?strong\b)[^>]+>/g, "");
    }

    // ================= ADDONS =================

    const addonsFormatted = Addons.map((item) => ({

      addon: item?.Name || "",

      child: item?.Price || 0,

      child_first: item?.Price || 0,

    }));

    // ================= TOOLS =================

    const toolsFormatted = ToolUp.map((tool) => ({

      Name: tool?.Name || "",

    }));

    // ================= INSTALLMENT FIX =================

    let installmentData = Installment;

    if (!installmentData || installmentData.length === 0) {

      installmentData = [

        {

          Serial: 1,

          Module_Name: selectedService?.label || "Service",

          Amount: calculationResult?.total || 0,

          Gst2: 0,

          Net: calculationResult?.payable || 0,

        },

      ];

    }

    // ================= PER PAGE DATA =================

    const perPageWordData = {

      total_page: calculationResult?.qty || 1,

      originalTotalPrice: calculationResult?.total || 0,

    };

    // ================= ADDON PRICE =================

    const addonPrice = {

      originalPrice: addonsFormatted.map(a => a.child),

      originalTotalPrices: addonsFormatted.reduce((sum, a) => sum + a.child, 0),

      finalTotalPrices: addonsFormatted.reduce((sum, a) => sum + a.child, 0),

    };

    // ================= TOOL DATA =================

    const toolData = {

      toolOriginalPrice: ToolUp.map(t => t.Price || 0),

      toolTimes: ToolUp.map(t => t.Times || 1),

      toolFinalPricesBeforeDiscount: ToolUp.map(t => (t.Price || 0) * (t.Times || 1)),

      toolTotalBeforeDiscount: ToolUp.reduce(

        (sum, t) => sum + (t.Price || 0) * (t.Times || 1),

        0

      ),

      toolClientTotalPrice: ToolUp.reduce(

        (sum, t) => sum + (t.Price || 0) * (t.Times || 1),

        0

      ),

    };

    // ================= TOTAL =================

    const totalContainer = {

      Total: calculationResult?.total || 0,

      DiscountPrice: calculationResult?.discount || 0,

      // FinalTotal: calculationResult?.payable || 0,
      FinalTotal: calculationResult?.total || 0,

      GST: 18,

      GSTPrice: Math.round((calculationResult?.total || 0) * 0.18),

      // NetTotal: Math.round((calculationResult?.payable || 0) * 1.18),
      NetTotal: calculationResult?.payable  || 0,

    };

    // ================= FINAL PAYLOAD =================

    const payload = {

      UserName: UserName || "Guest",
      QueryId: QueryId || `Q-${Date.now()}`,
      Createdby: Createdby || "system",
      Course: Course || "N/A",
      Domain: ResearchDomain || "N/A",
      Area: ResearchArea || "N/A",
      Topic: ResearchTopic || "N/A",
      Country: Country || "",
      State: State || "",
      City: City || "",
      Current_Date: new Date().toLocaleDateString(),
      Expiry_Date: new Date(Date.now() + 7 * 86400000).toLocaleDateString(),

      Services: {

        service_type: selectedService?.label || "",
        Method: selectedMethod?.label || "",
        Res_Cat: ResearchArea || "",
        currency: "₹",
        Page_word_Condition: false,
        perPageWord_data: perPageWordData,
        Addons_pairs: addonsFormatted,
        addonPrice: addonPrice,
        Require_Tool: ToolUp.length > 0,
        tools_up: toolsFormatted,
        toolData: toolData,
        totalContainer: totalContainer,
        Remark: calculationResult?.remark || "",

        // ✅ NOW WORKING
        tande: TandE,
        desc_data: cleanText,
        desc_Name: Desc?.[0]?.Name || "",
      },
      Total: calculationResult?.total || 0,
      Qty: calculationResult?.qty || 1,
      Discount: calculationResult?.discount || 0,
      Payable: calculationResult?.payable || 0,
      Installment: installmentData,
      InstallmentCount: installmentData.length,
      Journal: "",
      Wrirk_Penic_Guide: Wrirk_Penic_Guide ?? true,

    };

    return payload;
  } catch (error) {
    console.error("❌ Payload Build Error:", error);
    return {};
  }
};

// end saurabh code 