import Hero from "@/app/components/ContactusComponents/Hero";

const ContactClient = ({ data, areas, domains }) => {
  return <Hero data={data} areas={areas} domains={domains} />;
};

export default ContactClient;