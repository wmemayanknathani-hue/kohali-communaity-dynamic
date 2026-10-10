export interface SuccessStory {
  slug: string;
  tag: string;
  date: string;
  place: string;
  img: string;
  title: string;
  person: string;
  org: string;
  desc: string;
  body?: string[];
  youtube_url?: string;
  quote?: {
    text: string;
    author: string;
  };
  highlights?: string[];
}

const API_PATH =
  window.location.hostname === "localhost" ||
  window.location.hostname === "192.168.1.62"
    ? import.meta.env.VITE_LOCAL_API_PATH
    : import.meta.env.VITE_LIVE_API_PATH;

export async function getSuccessStories(): Promise<SuccessStory[]> {
  try {
    const response = await fetch(`${API_PATH}/action_layer.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "get_success_stories",
      }),
    });

    const result = await response.json();

    console.log("Success Stories API Response:", result);

    if (
      result.status === true ||
      result.status === 1 ||
      result.success === true
    ) {
      const data =
        result.success_stories ||
        result.data ||
        result.result ||
        [];

      return data.map((item: any): SuccessStory => ({
        slug: String(item.slug || item.id || ""),

        tag:
          item.tag ||
          item.category ||
          "",

        date:
          item.date ||
          "",

        place:
          item.place ||
          item.location ||
          "",

        img:
          item.img ||
          item.image ||
          "",

        title:
          item.title ||
          "",

        person:
          item.person ||
          item.name ||
          "",

        org:
          item.org ||
          item.occupation ||
          "",

        youtube_url:
          item.youtube_url ||
          "",

        desc:
          item.desc ||
          item.short_description ||
          item.description ||
          "",

        body:
          Array.isArray(item.body)
            ? item.body
            : item.body
              ? [item.body]
              : [],

        quote:
          item.quote
            ? {
                text: item.quote.text || "",
                author: item.quote.author || "",
              }
            : undefined,

        highlights:
          Array.isArray(item.highlights)
            ? item.highlights
            : [],
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching success stories:", error);
    return [];
  }
}

export async function getStoryBySlug(
  slug: string
): Promise<SuccessStory | undefined> {
  const stories = await getSuccessStories();

  return stories.find((story) => story.slug === slug);
}

export function getInitial(person: string): string {
  return person
    .replace(/^(श्री\.|सौ\.|कु\.)\s*/, "")
    .trim()
    .charAt(0);
}