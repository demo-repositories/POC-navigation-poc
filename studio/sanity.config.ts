import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

export default defineConfig({
  name: 'default',
  title: 'poc-nav',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Categories')
              .child(
                S.list()
                  .title('Categories by Level')
                  .items([
                    S.listItem()
                      .title('Level 1')
                      .child(
                        S.documentList()
                          .title('Level 1 Categories')
                          .filter('_type == "category" && level == 1'),
                      ),
                    S.listItem()
                      .title('Level 2')
                      .child(
                        S.documentList()
                          .title('Level 2 Categories')
                          .filter('_type == "category" && level == 2'),
                      ),
                    S.listItem()
                      .title('Level 3')
                      .child(
                        S.documentList()
                          .title('Level 3 Categories')
                          .filter('_type == "category" && level == 3'),
                      ),
                    S.listItem()
                      .title('Level 4')
                      .child(
                        S.documentList()
                          .title('Level 4 Categories')
                          .filter('_type == "category" && level == 4'),
                      ),
                    S.listItem()
                      .title('All Categories')
                      .child(
                        S.documentList().title('All Categories').filter('_type == "category"'),
                      ),
                  ]),
              ),
            ...S.documentTypeListItems().filter(
              (listItem) => !['category'].includes(listItem.getId() || ''),
            ),
          ]),
    }),
    visionTool(),
    internationalizedArray({
      languages: [
        {id: 'en-gb', title: 'English (GB)'},
        {id: 'en-us', title: 'English (US)'},
        {id: 'de', title: 'German'},
        {id: 'fr', title: 'French'},
      ],
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'navigationItem', 'submenuItem', 'link'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
