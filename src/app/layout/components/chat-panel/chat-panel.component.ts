import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {ChatPanelService} from 'app/layout/components/chat-panel/chat-panel.service';
import {ConversationWrapper} from '../../../data/local/conversation-wrapper';

@Component({
  selector: 'chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatPanelComponent implements OnInit, AfterViewInit, OnDestroy {

  public selectedConversation: ConversationWrapper;

  chat: any;
  sidebarFolded: boolean;

  @ViewChild('replyForm')
  set replyForm(content: NgForm) {
    this._replyForm = content;
  }

  @ViewChild('replyInput')
  set replyInput(content: ElementRef) {
    this._replyInput = content;
  }

  @ViewChildren(FusePerfectScrollbarDirective)
  private _fusePerfectScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

  // Private
  private _chatViewScrollbar: FusePerfectScrollbarDirective;
  private _replyForm: NgForm;
  private _replyInput: ElementRef;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _chatPanelService: ChatPanelService,
    private _httpClient: HttpClient,
    private _fuseSidebarService: FuseSidebarService
  ) {
    this.sidebarFolded = true;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._fuseSidebarService.getSidebar('chatPanel').foldedChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((folded) => {
        this.sidebarFolded = folded;
      });
  }

  ngAfterViewInit(): void {
    this._chatViewScrollbar = this._fusePerfectScrollbarDirectives.find((directive) => {
      return directive.elementRef.nativeElement.id === 'messages';
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  foldSidebarTemporarily(): void {
    this._fuseSidebarService.getSidebar('chatPanel').foldTemporarily();
  }

  unfoldSidebarTemporarily(): void {
    this._fuseSidebarService.getSidebar('chatPanel').unfoldTemporarily();
  }

  toggleSidebarOpen(): void {
    this._fuseSidebarService.getSidebar('chatPanel').toggleOpen();
  }

  toggleChat(val: ConversationWrapper): void {
    if (this.selectedConversation && val.messageWrapper.message.id === this.selectedConversation.messageWrapper.message.id) {
      this.resetChat();
    } else {
      this.unfoldSidebarTemporarily();
      this.selectedConversation = val;
    }
  }

  resetChat(): void {
    this.selectedConversation = null;
    this.chat = null;
  }

}
