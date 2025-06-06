export async function askScientist(user_id, character_id, question) {
  console.log("Mock API called:", { user_id, character_id, question });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        answer: `${character_id.charAt(0).toUpperCase() + character_id.slice(1)} says: "${question}" is a fascinating question!`,
      });
    }, 600);
  });
}




// export async function askScientist(user_id, character_id, question) {
//  const res = await fetch("/ask", {
//    method: "POST",
//    headers: { "Content-Type": "application/json" },
//    body: JSON.stringify({ user_id, character_id, question })
//  });
//  if (!res.ok) throw new Error("API error");
//  return await res.json();
// }
