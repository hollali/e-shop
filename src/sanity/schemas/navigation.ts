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
            defineField({ name: "href", type: "string", title: "Link URL" }),
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
        },
      ],
    }),
  ],
});
