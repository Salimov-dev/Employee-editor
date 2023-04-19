const QuantityEducationsOnPage = 5;

if (!localStorage.getItem("QuantityEducationsOnPage")) {
  localStorage.setItem(
    "QuantityEducationsOnPage",
    JSON.stringify(QuantityEducationsOnPage)
  );
}
export default QuantityEducationsOnPage;
