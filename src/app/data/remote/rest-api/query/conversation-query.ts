import {PageQuery} from '../page-query';

export class ConversationQuery extends PageQuery {
  conversationId?: number;
  unassigned?: boolean;
}
