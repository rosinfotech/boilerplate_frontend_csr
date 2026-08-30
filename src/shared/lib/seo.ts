type TSeoParams = {
    description?: string;
    image?: string;
    title: string;
};

export const seo = (params: TSeoParams) => {
    const { description, image, title } = params;

    return [
        { title },
        { content: description, name: "description" },
        { content: title, name: "twitter:title" },
        { content: description, name: "twitter:description" },
        { content: image ? "summary_large_image" : "summary", name: "twitter:card" },
        { content: "website", property: "og:type" },
        { content: title, property: "og:title" },
        { content: description, property: "og:description" },
        ...(image
            ? [
                  { content: image, name: "twitter:image" },
                  { content: image, property: "og:image" },
              ]
            : []),
    ];
};
