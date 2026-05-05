import { fetchSeo } from "@/app/lib/seo";
import PaymentClient from "./PaymentClient";

export default async function PaymentPage() {

  const payment = await fetchSeo('payment');
  
  if (!payment) return <Loading />;

  return <PaymentClient payment={payment} />;

}