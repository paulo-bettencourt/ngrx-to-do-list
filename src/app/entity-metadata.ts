import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Item: {
    entityName: 'Item',
    selectId: function defaultSelectId(entity) {
      return entity == null ? undefined : entity._id
    }
  }
};

const pluralNames = { Item: '' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
