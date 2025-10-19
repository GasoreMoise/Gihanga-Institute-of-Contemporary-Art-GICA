import { defineField, defineType } from 'sanity';
export default defineType({
  name: 'contributor',
  title: 'Contributor',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'bio', type: 'text' }),
    defineField({ name: 'avatar', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] })
  ]
});


