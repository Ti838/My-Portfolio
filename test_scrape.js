async function testScrape() {
  try {
    const tophRes = await fetch('https://toph.co/u/Timon15');
    const tophHtml = await tophRes.text();
    const tophMatch = tophHtml.match(/<div[^>]*>(\d+)[^<]*<\/div>\s*<div[^>]*>Problems Solved<\/div>/i) || tophHtml.match(/(\d+)\s+Problems Solved/i);
    console.log("Toph Solved:", tophMatch ? tophMatch[1] : "Not Found");

    const vjRes = await fetch('https://vjudge.net/user/Timon15');
    const vjHtml = await vjRes.text();
    const vjMatch = vjHtml.match(/title="Overall solved"[^>]*>\s*(\d+)/i) || vjHtml.match(/Overall solved[\s\S]{0,100}?>\s*(\d+)/i);
    console.log("VJudge Solved:", vjMatch ? vjMatch[1] : "Not Found");
  } catch (err) {
    console.error(err);
  }
}
testScrape();
