import { defineType, defineField } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  groups: [
    { name: "topbar", title: "Top Bar" },
    { name: "mainnav", title: "Main Nav" },
  ],
  fields: [
    defineField({
      name: "topBarItems",
      title: "Top Bar Links",
      type: "array",
      group: "topbar",
      of: [
        {
          type: "object",
          name: "topBarItem",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "href", type: "string", title: "Link URL" }),
          ],
        },
      ],
    }),
    defineField({
      name: "mainNavItems",
      title: "Main Navigation Items",
      type: "array",
      group: "mainnav",
      of: [
        {
          type: "object",
          name: "mainNavItem",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({
              name: "category",
              type: "reference",
              to: [{ type: "category" }],
              title: "Link to Category",
              description: "If set, overrides the Link URL with the category slug",
            }),
            defineField({ name: "href", type: "string", title: "Link URL", description: "Used only when no category is selected" }),
            defineField({
              name: "children",
              title: "Sub Items (Mega Menu)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "subItem",
                  fields: [
                    defineField({ name: "title", type: "string", title: "Title" }),
                    defineField({ name: "href", type: "string", title: "Link URL" }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              categoryTitle: "category.name",
            },
            prepare({ title, categoryTitle }: { title?: string; categoryTitle?: string }) {
              return { title: title || "Untitled", subtitle: categoryTitle ? `→ ${categoryTitle}` : "No category" };
            },
          },
        },
      ],
    }),
  ],
});
