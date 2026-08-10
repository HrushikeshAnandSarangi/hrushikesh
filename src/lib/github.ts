import { cache } from "@solidjs/router";

export interface OpenSourceOrg {
    login: string;
    name: string;
    description: string;
    avatarUrl: string;
    htmlUrl: string;
    prCount: number;
    prsUrl: string;
}

export const GITHUB_USERNAME = "HrushikeshAnandSarangi";

const GITHUB_API = "https://api.github.com";

async function fetchJson(url: string) {
    try {
        const response = await fetch(url, {
            headers: { Accept: "application/vnd.github+json" },
        });
        return { status: response.status, data: response.ok ? await response.json() : null };
    } catch (error) {
        console.error(`GitHub request failed: ${url}`, error);
        return { status: 0, data: null };
    }
}

export const getOpenSourceContributions = cache(
    async (username: string = GITHUB_USERNAME): Promise<OpenSourceOrg[]> => {
        "use server";

        const search = await fetchJson(
            `${GITHUB_API}/search/issues?q=author:${username}+type:pr&per_page=100`
        );
        if (!search.data || !Array.isArray(search.data.items)) return [];

        const orgMap = new Map<string, number>();
        for (const item of search.data.items) {
            const match = item.repository_url?.match(/repos\/([^/]+)\/[^/]+$/);
            const owner = match?.[1];
            if (!owner || owner === username) continue;
            orgMap.set(owner, (orgMap.get(owner) || 0) + 1);
        }

        const orgs: OpenSourceOrg[] = [];
        for (const [login, prCount] of orgMap) {
            const org = await fetchJson(`${GITHUB_API}/orgs/${login}`);

            if (org.status === 404) continue;
            if (org.data && org.data.type !== "Organization") continue;

            orgs.push({
                login,
                name: org.data?.name || login,
                description: org.data?.description || "",
                avatarUrl: org.data?.avatar_url || `https://github.com/${login}.png?size=80`,
                htmlUrl: org.data?.html_url || `https://github.com/${login}`,
                prCount,
                prsUrl: `https://github.com/pulls?q=is%3Apr+author%3A${username}+org%3A${login}`,
            });
        }

        orgs.sort((a, b) => b.prCount - a.prCount);
        return orgs;
    },
    "open-source-contributions"
);
