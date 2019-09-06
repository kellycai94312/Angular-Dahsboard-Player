import {PageQuery} from '../page-query';

// TODO: Move to conversation api folder
export class ConversationQuery extends PageQuery {
  conversationId?: number;
  unassigned?: boolean;
}
