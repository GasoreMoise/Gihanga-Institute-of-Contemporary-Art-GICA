import { type SchemaTypeDefinition } from 'sanity';
import exhibition from './schemas/exhibition';
import programme from './schemas/programme';
import contributor from './schemas/contributor';
import page from './schemas/page';
import media from './schemas/media';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [exhibition, programme, contributor, page, media]
};


