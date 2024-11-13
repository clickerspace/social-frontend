function removePrefix(address: string) {
  const colonIndex = address?.indexOf(":");
  return address?.substring(colonIndex + 1);
}
function shortenAddress(address: string) {
  return `${address?.substring(0, 3)}...${address?.substring(address?.length - 3)}`;
}
export { removePrefix, shortenAddress };
