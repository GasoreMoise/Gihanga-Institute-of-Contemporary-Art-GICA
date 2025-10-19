import { defineField, defineType } from 'sanity';
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'seo', type: 'object', fields: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'text' },
      { name: 'ogImage', type: 'image' }
    ]}),
    defineField({ name: 'content', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'locale', type: 'string', options: { list: ['en', 'rw'] }, initialValue: 'en' })
  ]
});


