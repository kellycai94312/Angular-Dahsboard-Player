import { GROUP_PERSON_CLAIM_STATE_SUBTYPES } from 'app/data/remote/model/group/person/state/group-person-claim-state-subtypes';
import { TypeOptions } from 'class-transformer';

export const GROUP_PERSON_CLAIM_STATE_TYPE_OPTIONS: TypeOptions = {
  discriminator: {
    property: 'discriminator',
    subTypes: GROUP_PERSON_CLAIM_STATE_SUBTYPES
  },
  keepDiscriminatorProperty: true
};
