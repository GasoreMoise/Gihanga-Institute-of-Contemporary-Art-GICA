import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: 'summary', type: 'text' }),
    defineField({ name: 'startDate', type: 'date', validation: r => r.required() }),
    defineField({ name: 'endDate', type: 'date' }),
    defineField({ name: 'cover', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'locale', type: 'string', options: { list: ['en', 'rw'] }, initialValue: 'en' })
  ],
  preview: { select: { title: 'title', media: 'cover' } }
});


