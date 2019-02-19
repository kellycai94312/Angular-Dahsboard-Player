import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {FuseUtils} from '@fuse/utils';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../data/local/property-constant';
import {ConversationWrapper} from '../../../data/local/conversation-wrapper';
import {AppHelper} from '../../../utils/app-helper';

@Injectable()
export class ChatPanelService {
  contacts: ConversationWrapper[];
  chats: any[];
  user: any;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _participantRestApiService: ParticipantRestApiService,
    private _httpClient: HttpClient,
    private _appHelper: AppHelper
  ) {
  }

  /**
   * Loader
   *
   * @returns {Promise<any> | any}
   */
  async loadContacts(): Promise<ConversationWrapper[]> {
    const pageContainer = await this._participantRestApiService.getActiveMessages({count: PropertyConstant.pageSize});
    return (await this._appHelper.pageContainerConverter(pageContainer, obj => {
      return new ConversationWrapper(obj);
    })).list;
  }

  /**
   * Get chat
   *
   * @param contactId
   * @returns {Promise<any>}
   */
  getChat(contactId): Promise<any> {
    const chatItem = this.user.chatList.find((item) => {
      return item.contactId === contactId;
    });

    // Get the chat
    return new Promise((resolve, reject) => {

      // If there is a chat with this user, return that.
      if (chatItem) {
        this._httpClient.get('api/chat-panel-chats/' + chatItem.chatId)
          .subscribe((chat) => {

            // Resolve the promise
            resolve(chat);

          }, reject);
      }
      // If there is no chat with this user, create one...
      else {
        this.createNewChat(contactId).then(() => {

          // and then recall the getChat method
          this.getChat(contactId).then((chat) => {
            resolve(chat);
          });
        });
      }
    });
  }

  /**
   * Create new chat
   *
   * @param contactId
   * @returns {Promise<any>}
   */
  createNewChat(contactId): Promise<any> {
    return new Promise((resolve, reject) => {

      // Generate a new id
      const chatId = FuseUtils.generateGUID();

      // Prepare the chat object
      const chat = {
        id: chatId,
        dialog: []
      };

      // Prepare the chat list entry
      const chatListItem = {
        chatId: chatId,
        contactId: contactId,
        lastMessageTime: '2017-02-18T10:30:18.931Z'
      };

      // Add new chat list item to the user's chat list
      this.user.chatList.push(chatListItem);

      // Post the created chat to the server
      this._httpClient.post('api/chat-panel-chats', {...chat})
        .subscribe(() => {

          // Post the updated user data to the server
          this._httpClient.post('api/chat-panel-user/' + this.user.id, this.user)
            .subscribe(() => {

              // Resolve the promise
              resolve();
            });
        }, reject);
    });
  }

  /**
   * Update the chat
   *
   * @param chatId
   * @param dialog
   * @returns {Promise<any>}
   */
  updateChat(chatId, dialog): Promise<any> {
    return new Promise((resolve, reject) => {

      const newData = {
        id: chatId,
        dialog: dialog
      };

      this._httpClient.post('api/chat-panel-chats/' + chatId, newData)
        .subscribe(updatedChat => {
          resolve(updatedChat);
        }, reject);
    });
  }

  /**
   * Get contacts
   *
   * @returns {Promise<any>}
   */
  getContacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/chat-panel-contacts')
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  /**
   * Get user
   *
   * @returns {Promise<any>}
   */
  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/chat-panel-user')
        .subscribe((response: any) => {
          resolve(response[0]);
        }, reject);
    });
  }
}
