import { defineField, defineType } from 'sanity';
export default defineType({
  name: 'programme',
  title: 'Programme Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'date', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'poster', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }),
    defineField({ name: 'locale', type: 'string', options: { list: ['en', 'rw'] }, initialValue: 'en' })
  ]
});


