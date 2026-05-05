"use client";

import { memo } from "react";
import BlogDetailContainer from "@/app/components/BlogComponents/BlogDetailContainer";

const BlogDetailClient = ({ data }) => {
  if (!data) return null;

  return (
    <BlogDetailContainer
      card_title={data.title}
      card_desc={data.description}
      card_image_src={data.image}
      card_image_alt={data.image_alt}
      card_post_date={data.post_date}
      card_likes={data.likes}
      card_comments={data.comments}
      resp_data={data.responses}
    />
  );
};

export default memo(BlogDetailClient);