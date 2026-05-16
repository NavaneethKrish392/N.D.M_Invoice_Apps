import { ndmInvoiceApp } from "./app";

const PORT = process.env.PORT || 8080;

ndmInvoiceApp.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});