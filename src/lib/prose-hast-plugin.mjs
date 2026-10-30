// @ts-check
/**
 * Small HTML-tree plugin for the Sätteri Markdown processor.
 *
 * 1. A paragraph that contains only an image with a title
 *    (`![alt](./img.png "Caption")`) becomes
 *    `<figure><img><figcaption>Caption</figcaption></figure>`, matching the
 *    figure + caption in the design. The title attribute is dropped so the
 *    caption is not repeated as a tooltip.
 * 2. Tables are wrapped in a focusable, labelled region that scrolls
 *    horizontally on narrow screens instead of widening the page.
 *
 * Runs before Astro's own image plugin, so images moved into a figure are
 * still optimised by astro:assets.
 *
 * @type {import('satteri').HastPluginDefinition}
 */
export const proseHastPlugin = {
  name: 'notes-prose',
  element: [
    {
      filter: ['p'],
      visit(node, ctx) {
        const children = node.children.filter(
          (child) => !(child.type === 'text' && child.value.trim() === ''),
        );
        if (children.length !== 1) return;
        const [img] = children;
        if (img.type !== 'element' || img.tagName !== 'img') return;
        const title = img.properties?.title;
        if (typeof title !== 'string' || title.trim() === '') return;

        const { title: _title, ...imgProperties } = img.properties;
        ctx.replaceNode(node, {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: [
            { ...img, properties: imgProperties },
            {
              type: 'element',
              tagName: 'figcaption',
              properties: {},
              children: [{ type: 'text', value: title }],
            },
          ],
        });
      },
    },
    {
      filter: ['table'],
      visit(node, ctx) {
        ctx.wrapNode(node, {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['table-scroll'],
            role: 'region',
            ariaLabel: 'Table',
            tabIndex: 0,
          },
          children: [],
        });
      },
    },
  ],
};
