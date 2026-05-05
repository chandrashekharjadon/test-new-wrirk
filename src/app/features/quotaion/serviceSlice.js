import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";
import { use } from "react";

const initialState = {
  serviceData1: {},
  serviceData: {},
  resCatData: { result: [], pw_true: [], pw_false: [] },

  selectedMethod: "",
  selectedValue: "",
  filteredResCats: [],
  selectedResCatId: "",

  priceList: [],
  methodPrice: null,
  methodDollarPrice: 0,

  // INR pricing
  inrBelowtpPrice: "",
  inrAbovetpPrice: "",
  inrBelowtwPrice: "",
  inrAbovetwPrice: "",
  calculatedPagePrice: 0,
  calculatedDollarPagePrice: 0,

  // Dollar pricing
  dollarBelowtpPrice: "",
  dollarAbovetpPrice: "",
  dollarBelowtwPrice: "",
  dollarAbovetwPrice: "",

  // Word pricing
  calculatedWordPrice: 0,
  calculatedDollarWordPrice: 0,

  addonCategories: [],
  selectedAddons: {},

  // Page
  numPages: "",
  minPage: "",
  maxPage: "",
  thresholdPage: "",

  // Word
  numWords: 0,
  minWord: 0,
  maxWord: 0,
  thresholdWord: "",

  selectedUnit: "page",
  selectedCurrency: "inr",

  toolList: [],
  showToolSel: false,
  selectedTool: [],
  toolCounts: [],

  tande: [],
  desc: [],

  discount: "",
  error: "",

  loading: true,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceData1: (state, action) => {
      state.serviceData1 = action.payload;
    },
    
    setServiceData: (state, action) => {
      state.serviceData = action.payload;
    },
    setResCatData: (state, action) => {
      state.resCatData = action.payload;
    },

    setSelectedMethod: (state, action) => {
      state.selectedMethod = action.payload;
    },
    setSelectedValue: (state, action) => {
      state.selectedValue = action.payload;
    },
    setFilteredResCats: (state, action) => {
      state.filteredResCats = action.payload;
    },
    setSelectedResCatId: (state, action) => {
      state.selectedResCatId = action.payload;
    },
    setPriceList: (state, action) => {
      state.priceList = action.payload;
    },
    setMethodPrice: (state, action) => {
      state.methodPrice = action.payload;
    },
    setMethodDollarPrice: (state, action) => {
      state.methodDollarPrice = action.payload;
    },

    // INR pricing
    setInrBelowtpPrice: (state, action) => {
      state.inrBelowtpPrice = action.payload;
    },
    setInrAbovetpPrice: (state, action) => {
      state.inrAbovetpPrice = action.payload;
    },
    setInrBelowtwPrice: (state, action) => {
      state.inrBelowtwPrice = action.payload;
    },
    setInrAbovetwPrice: (state, action) => {
      state.inrAbovetwPrice = action.payload;
    },
    setCalculatedPagePrice: (state, action) => {
      state.calculatedPagePrice = action.payload;
    },
    setCalculatedDollarPagePrice: (state, action) => {
      state.calculatedDollarPagePrice = action.payload;
    },

    // Dollar pricing
    setDollarBelowtpPrice: (state, action) => {
      state.dollarBelowtpPrice = action.payload;
    },
    setDollarAbovetpPrice: (state, action) => {
      state.dollarAbovetpPrice = action.payload;
    },
    setDollarBelowtwPrice: (state, action) => {
      state.dollarBelowtwPrice = action.payload;
    },
    setDollarAbovetwPrice: (state, action) => {
      state.dollarAbovetwPrice = action.payload;
    },

    // Word pricing
    setCalculatedWordPrice: (state, action) => {
      state.calculatedWordPrice = action.payload;
    },
    setCalculatedDollarWordPrice: (state, action) => {
      state.calculatedDollarWordPrice = action.payload;
    },

    // Addons
    setAddonCategories: (state, action) => {
      state.addonCategories = action.payload;
    },
    setSelectedAddons: (state, action) => {
      state.selectedAddons = action.payload;
    },

    // Pages
    setNumPages: (state, action) => {
      state.numPages = action.payload;
    },
    setMinPage: (state, action) => {
      state.minPage = action.payload;
    },
    setMaxPage: (state, action) => {
      state.maxPage = action.payload;
    },
    setThresholdPage: (state, action) => {
      state.thresholdPage = action.payload;
    },

    // Words
    setNumWords: (state, action) => {
      state.numWords = action.payload;
    },
    setMinWord: (state, action) => {
      state.minWord = action.payload;
    },
    setMaxWord: (state, action) => {
      state.maxWord = action.payload;
    },
    setThresholdWord: (state, action) => {
      state.thresholdWord = action.payload;
    },

    setSelectedUnit: (state, action) => {
      state.selectedUnit = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },

    // Tools
    setToolList: (state, action) => {
      state.toolList = action.payload;
    },
    setShowToolSel: (state, action) => {
      state.showToolSel = action.payload;
    },
    setSelectedTool: (state, action) => {
      state.selectedTool = action.payload;
    },
    setToolCounts: (state, action) => {
      state.toolCounts = action.payload;
    },

    calculateFinal: (state) => {
      const basePrice =
        state.selectedUnit === "page"
          ? Number(state.calculatedPagePrice || 0)
          : Number(state.calculatedWordPrice || 0);

      const addonTotal = Object.values(state.selectedAddons || {}).reduce(
        (sum, val) => sum + Number(val || 0),
        0
      );

      const toolTotal = (state.toolCounts || []).reduce(
        (sum, tool) => sum + Number(tool?.price || 0) * Number(tool?.Times || 1),
        0
      );

      const subtotal = basePrice + addonTotal + toolTotal;

      const discount = Number(state.discount || 0);

      const payable = subtotal - discount;

      state.finalCalculation = {
        basePrice,
        addonTotal,
        toolTotal,
        subtotal,
        discount,
        payable,
        currency: state.selectedCurrency,
        unit: state.selectedUnit,
      };
    },

    setTande: (state, action) => {
      state.tande = action.payload;
    },
    setDesc: (state, action) => {
      state.desc = action.payload;
    },

    // Misc
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setServiceData1,
  setServiceData,
  setResCatData,

  setSelectedMethod,
  setSelectedValue,
  setFilteredResCats,
  setSelectedResCatId,
  setPriceList,
  setMethodPrice,
  setMethodDollarPrice,

  setInrBelowtpPrice,
  setInrAbovetpPrice,
  setInrBelowtwPrice,
  setInrAbovetwPrice,
  setCalculatedPagePrice,
  setCalculatedDollarPagePrice,

  setDollarBelowtpPrice,
  setDollarAbovetpPrice,
  setDollarBelowtwPrice,
  setDollarAbovetwPrice,

  setCalculatedWordPrice,
  setCalculatedDollarWordPrice,

  setAddonCategories,
  setSelectedAddons,

  setNumPages,
  setMinPage,
  setMaxPage,
  setThresholdPage,

  setNumWords,
  setMinWord,
  setMaxWord,
  setThresholdWord,

  setSelectedUnit,
  setSelectedCurrency,

  setToolList,
  setShowToolSel,
  setSelectedTool,
  setToolCounts,

  setTande,
  setDesc,

  setDiscount,
  setError,
  setLoading,
  calculateFinal,
} = serviceSlice.actions;

export default serviceSlice.reducer;