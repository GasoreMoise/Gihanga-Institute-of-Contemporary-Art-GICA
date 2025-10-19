import { defineField, defineType } from 'sanity';
export default defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'file', type: 'file', options: { storeOriginalFilename: true } }),
    defineField({ name: 'alt', type: 'string' })
  ]
});


