"use client";

import React, { memo } from "react";
import Hero from "@/app/components/ContactusComponents/Hero";

const ContactClient = ({ data }) => {
  return <Hero data={data} />;
};

export default memo(ContactClient);