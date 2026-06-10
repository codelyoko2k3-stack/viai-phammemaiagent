export type SeoAnalyzePayload = {
    focusKeyword: string
    title?: string
    slug?: string
    content?: string
    seoTitle?: string
    seoDescription?: string
    thumbnail?: string
}

export type SeoCheck = {
    id: string;
    label: string;
    status: "error" | "warning" | "good";
    score: number;
    maxScore: number;
    detail: string;
}

export type SeoSection = {
    label: string;
    score: number;
    maxScore: number;
    checks: SeoCheck[];
}

export type SeoSections = {
    basicSeo: SeoSection;
    additional: SeoSection;
    titleReadability: SeoSection;
    contentReadability: SeoSection;
}

export type SeoScore = {
    score: number;
    maxScore: number;
    grade: "poor" | "average" | "good" | "excellent";
    focusKeyword: string;
    sections: SeoSections;
}

export type SeoScoreResult = {
    data: SeoScore
}