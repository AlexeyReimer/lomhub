async function main() {
  console.log("Seed completed. No data is required for the bootstrap stage.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
