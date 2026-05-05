import { createSlice } from "@reduxjs/toolkit";
import { AreaChart } from "lucide-react";

const initialState = {
  navbar: {},
  footer: {},
  home_page: {},
  contact: {},
  research_categories: {},
  portfolio: {},
  blogs: {},
  case_testimonials: {},
  dynamic_pages: [],
  payment: {},

  // ✅ NEW STATES from other Site...
  areas: [],
  domains: [],
};

const wrirkbackendSlice = createSlice({
  name: "wrirkbackend",
  initialState,
  reducers: {
    setWrirkBackendData: (state, action) => {
      const data = action.payload;

      state.navbar = data.navbar || {};
      state.footer = data.footer || {};
      state.home_page = data.home_page || {};
      state.contact = data.contact || {};
      state.research_categories = data.research_categories || {};
      state.portfolio = data.portfolio || {};
      state.blogs = data.blogs || {};
      state.case_testimonials = data.case_testimonials || {};
      state.dynamic_pages = data.dynamic_pages || [];
      state.payment = data.payment || {};
    },

    setAreaData: (state, action) => {
      state.areas = action.payload || [];
    },
    setDomainData: (state, action) => {
      state.domains = action.payload || [];
    },
  },


});

export const { setWrirkBackendData, setAreaData, setDomainData } = wrirkbackendSlice.actions;
export default wrirkbackendSlice.reducer;