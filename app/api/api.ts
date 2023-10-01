import { Post } from "~/models/Post";

const host = "https://fastapi-production-5958.up.railway.app";

export async function loadPosts(): Promise<{ [key: string]: Post[] }> {
  const result = await fetch(host + "/get-posts-grouped-by-day/");

  if (result.ok) {
    return await result.json();
  }

  return {};
}

export async function createPosts(
  data: GeneratePostDto
): Promise<{ [key: string]: Post[] }> {
  const response = await fetch(host + "/generate-posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return await response.json();
  }

  return {};
}
