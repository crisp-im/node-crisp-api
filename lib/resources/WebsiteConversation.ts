/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import BaseResource from "./BaseResource";

/**************************************************************************
 * TYPES + INTERFACES
 ***************************************************************************/

export interface Conversation {
  session_id: string;
  website_id: string;
  inbox_id?: string;
  people_id?: string;
  state?: ConversationState;
  status?: number;
  is_verified?: boolean;
  is_blocked?: boolean;
  availability?: string;
  active?: ConversationActive;
  last_message?: string;
  preview_message?: ConversationPreviewMessage;
  topic?: string;
  verifications?: ConversationVerification[];
  participants?: ConversationParticipant[];
  mentions?: string[];
  compose?: ConversationCompose;
  unread?: ConversationUnread;
  assigned?: ConversationAssigned;
  meta?: ConversationMeta;
  created_at?: number;
  updated_at?: number;
  waiting_since?: number;
}

type ConversationNew = {
  session_id?: string;
}

export interface ConversationActive {
  now?: boolean;
  last?: number;
}

export interface ConversationPreviewMessage {
  type?: string;
  from?: string;
  excerpt?: string;
  fingerprint?: number;
}

export interface ConversationCompose {
  operator?: ConversationComposeAtom;
  visitor?: ConversationComposeAtom;
}

export interface ConversationComposeAtom {
  type?: string;
  excerpt?: string;
  timestamp?: number;
  user?: ConversationComposeAtomUser;
  automated?: boolean;
}

export interface ConversationComposeAtomUser {
  user_id?: string;
  nickname?: string;
  avatar?: string;
}

export interface ConversationUnread {
  operator?: number;
  visitor?: number;
}

export interface ConversationAssigned {
  user_id?: string;
}

export interface ConversationVerification {
  identity?: string;
  method?: string;
  annotation?: string;
}

export interface ConversationParticipant {
  type?: string;
  target?: string;
}

export interface ConversationParticipants {
  participants?: ConversationParticipant[];
}

export interface ConversationParticipantsSave {
  participants?: ConversationParticipant[];
}

export interface ConversationMeta {
  nickname: string;
  email?: string;
  phone?: string;
  ip?: string;
  avatar?: string;
  data?: Record<string, unknown>;
  connection?: ConnectionInfo;
  device?: DeviceInfo;
  segments?: string[];
  address?: string;
  subject?: string;
  origin?: string;
}

export interface ConnectionInfo {
  isp?: string;
  asn?: string;
}

export interface DeviceInfo {
  capabilities?: string[];
  geolocation?: GeolocationInfo;
  system?: SystemInfo;
  timezone?: number;
  locales?: string[];
}

export interface GeolocationInfo {
  country?: string;
  region?: string;
  city?: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  latitude?: number;
  longitude?: number;
}

export interface SystemInfo {
  os?: OSInfo;
  engine?: EngineInfo;
  browser?: BrowserInfo;
  useragent?: string;
}

export interface OSInfo {
  version?: string;
  name?: string;
}

export interface EngineInfo {
  name?: string;
  version?: string;
}

export interface BrowserInfo {
  major?: string;
  version?: string;
  name?: string;
}

export type ConversationMessageType =
  | "text"
  | "file"
  | "animation"
  | "audio"
  | "carousel"
  | "note"
  | "picker"
  | "field";

export type ConversationState = "pending" | "unresolved" | "resolved";

export type ConversationContent = (
  string |
  ConversationFileMessageContent |
  ConversationAnimationMessageContent |
  ConversationAudioMessageContent |
  ConversationPickerMessageContent |
  ConversationFieldMessageContent |
  ConversationCarouselMessageContent |
  ConversationEventMessageContent
)

export interface ConversationMessage {
  session_id?: string;
  website_id?: string;
  type?: ConversationMessageType;
  from?: string;
  origin?: string;
  content?: ConversationContent;
  preview?: ConversationMessagePreview[];
  mentions?: string[];
  read?: string;
  delivered?: string;
  ignored?: Record<string, ConversationMessageIgnored>;
  edited?: boolean;
  translated?: boolean;
  automated?: boolean;
  fingerprint?: number;
  timestamp?: number;
  user?: ConversationMessageUser;
  references?: ConversationMessageReference[];
  original?: ConversationMessageOriginal;
}

export interface ConversationFileMessageContent {
  name?: string;
  url?: string;
  type?: string;
}

export interface ConversationAnimationMessageContent {
  url?: string;
  type?: string;
}

export interface ConversationAudioMessageContent {
  url?: string;
  type?: string;
  duration?: number;
}

export interface ConversationPickerMessageContent {
  id?: string;
  text?: string;
  choices?: ConversationPickerMessageContentChoice[];
  required?: boolean;
}

export interface ConversationPickerMessageContentChoice {
  value?: string;
  icon?: string;
  label?: string;
  selected?: boolean;
  action?: ConversationPickerMessageContentChoiceAction;
}

export interface ConversationPickerMessageContentChoiceAction {
  type?: string;
  target?: string;
}

export interface ConversationFieldMessageContent {
  id?: string;
  text?: string;
  explain?: string;
  value?: string;
  required?: boolean;
}

export interface ConversationCarouselMessageContent {
  text?: string;
  targets?: ConversationCarouselMessageContentTarget[];
}

export interface ConversationCarouselMessageContentTarget {
  title?: string;
  description?: string;
  image?: string;
  actions?: ConversationCarouselMessageContentTargetAction[];
}

export interface ConversationCarouselMessageContentTargetAction {
  label?: string;
  url?: string;
}

export interface ConversationEventMessageContent {
  namespace?: string;
  text?: string;
}

export interface ConversationMessagePreview {
  url?: string;
  website?: string;
  title?: string;
  preview?: ConversationMessagePreviewInformation;
  stamped?: boolean;
}

export interface ConversationMessagePreviewInformation {
  excerpt?: string;
  image?: string;
  embed?: string;
}

export interface ConversationMessageIgnored {
  type?: string;
  reason?: string;
}

export interface ConversationMessageUser {
  type?: string;
  user_id?: string;
  nickname?: string;
  avatar?: string;
}

export interface ConversationMessageReference {
  type?: string;
  name?: string;
  target?: string;
}

export interface ConversationMessageOriginal {
  original_id?: string;
}

export type ConversationMessageNew = (
  ConversationTextMessageNew |
  ConversationFileMessageNew |
  ConversationAnimationMessageNew |
  ConversationAudioMessageNew |
  ConversationPickerMessageNew |
  ConversationFieldMessageNew |
  ConversationCarouselMessageNew |
  ConversationNoteMessageNew |
  ConversationEventMessageNew
)

export interface ConversationTextMessageNew {
  type: "text" | "note";
  from: string;
  origin: string;
  content: unknown;
  mentions?: string[];
  fingerprint?: number;
  user?: ConversationMessageUser;
  references?: ConversationMessageReference[];
  original?: ConversationMessageOriginal;
  timestamp?: number;
  stealth?: boolean;
  translated?: boolean;
  automated?: boolean;
}

export interface ConversationFileMessageNew {
  type: "file";
  from?: string;
  origin?: string;
  content?: ConversationFileMessageContent;
  mentions?: string[];
  fingerprint?: number;
  user?: ConversationMessageUser;
  references?: ConversationMessageReference[];
  original?: ConversationMessageOriginal;
  timestamp?: number;
  stealth?: boolean;
  translated?: boolean;
  automated?: boolean;
}

export interface ConversationAnimationMessageNew {
  type: "animation";
  from?: string;
  origin?: string;
  content?: ConversationAnimationMessageContent;
  mentions?: string[];
  fingerprint?: number;
  user?: ConversationMessageUser;
  references?: ConversationMessageReference[];
  original?: ConversationMessageOriginal;
  timestamp?: number;
  stealth?: boolean;
  translated?: boolean;
  automated?: boolean;
}

export interface ConversationAudioMessageNew {
  type: "audio";
  from?: string;
  origin?: string;
  content?: ConversationAudioMessageContent;
  mentions?: string[];
  fingerprint?: number;
  user?: ConversationMessageUser;
  references?: ConversationMessageReference[];
  original?: ConversationMessageOriginal;
  timestamp?: number;
  stealth?: boolean;
  translated?: boolean;
  automated?: boolean;
}

export interface ConversationPickerMessageNew {
  type: "picker";
  from?: string;
  origin?: string;
  content?: ConversationPickerMessageContent;
  mentions?: string[];
  fingerprint?: number;
  user?: ConversationMessageUser;
  references?: ConversationMessageReference[];
  original?: ConversationMessageOriginal;
  timestamp?: number;
  stealth?: boolean;
  translated?: boolean;
  automated?: boolean;
}

export interface ConversationFieldMessageNew {
  type: "field";
  from?: string;
  origin?: string;
  content?: ConversationFieldMessageContent;
  mentions?: string[];
  fingerprint?: number;
  user?: ConversationMessageUser;
  references?: ConversationMessageReference[];
  original?: ConversationMessageOriginal;
  timestamp?: number;
  stealth?: boolean;
  translated?: boolean;
  automated?: boolean;
}

export interface ConversationCarouselMessageNew {
  type: "carousel";
  from?: string;
  origin?: string;
  content?: ConversationCarouselMessageContent;
  mentions?: string[];
  fingerprint?: number;
  user?: ConversationMessageUser;
  references?: ConversationMessageReference[];
  original?: ConversationMessageOriginal;
  timestamp?: number;
  stealth?: boolean;
  translated?: boolean;
  automated?: boolean;
}

export interface ConversationNoteMessageNew extends ConversationTextMessageNew {
  type: "note";
}

export interface ConversationEventMessageNew {
  type: "event";
  from?: string;
  origin?: string;
  content?: ConversationEventMessageContent;
  mentions?: string[];
  fingerprint?: number;
  user?: ConversationMessageUser;
  references?: ConversationMessageReference[];
  original?: ConversationMessageOriginal;
  timestamp?: number;
  stealth?: boolean;
  translated?: boolean;
  automated?: boolean;
}

export interface ConversationComposeMessageNew {
  type: string;
  from: string;
  excerpt?: string;
  stealth?: boolean;
  automated?: boolean;
}

export interface ConversationSuggestedSegment {
  segment?:  string;
  count?:    number;
}

export interface ConversationSuggestedData {
  key?:  string;
  count?: number;
}

export interface ConversationSpam {
  spam_id?:   string;
  type?:      string;
  reason?:    string;
  metadata?:  Record<string, unknown>;
  headers?:   Record<string, unknown>;
  timestamp?: number;
}

export interface ConversationSpamContent extends ConversationSpam {
  content?: Record<string, unknown>;
}

export interface ConversationReadMessageMark {
  from?: string;
  origin?: string;
  fingerprints?: number[];
}

export interface ConversationUnreadMessageMark {
  from?: string;
}

export interface ConversationRoutingAssignUpdate {
  assigned?: ConversationRoutingAssignUpdateAssigned;
  silent?: boolean;
}

export interface ConversationRoutingAssignUpdateAssigned {
  user_id?: string;
}

export interface ConversationOriginal {
  website_id?: string;
  session_id?: string;
  original_id?: string;
  type?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  headers?: Record<string, any>;
  content?: string;
  timestamp?: number;
}

export interface ConversationPage {
  page_title?: string;
  page_url?: string;
  page_referrer?: string;
  timestamp?: number;
}

export interface ConversationEvent {
  text?: string;
  data?: Record<string, any>;
  color?: string;
  timestamp?: number;
}

export interface ConversationFile {
  name?: string;
  type?: string;
  url?: string;
  fingerprint?: number;
  timestamp?: number;
}

export interface ConversationStateData {
  state?: ConversationState;
}

export interface ConversationBlock {
  blocked?: boolean;
}

export interface ConversationVerify {
  verified?: boolean;
  verifications?: ConversationVerification[];
}

export interface ConversationVerifyIdentityRequest {
  identity?: string;
  method?: string;
  recipient?: string;
}

export interface ConversationVerifyIdentityRedeem {
  identity?: string;
  token?: string;
  recipient?: string;
}

export interface ConversationBrowsing {
  browsing_id?: string;
  browsing_token?: string;
  useragent?: string;
}

export interface ConversationCall {
  call_id?: string;
}

/**************************************************************************
 * CLASSES
 ***************************************************************************/

/**
 * Crisp WebsiteConversation Resource
 * @class
 */
class WebsiteConversation extends BaseResource {
  /**
   * List Conversations
   */
  listConversations(
    websiteID: string, pageNumber: number = 1
  ): Promise<Conversation[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl(["website", websiteID, "conversations", String(pageNumber)])
    );
  };

  /**
   * List Suggested Conversation Segments
   */
  listSuggestedConversationSegments(
    websiteID: string, pageNumber: number = 1
  ): Promise<ConversationSuggestedSegment[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversations", "suggest", "segments", String(pageNumber)
      ])
    );
  };

  /**
   * Delete Suggested Conversation Segment
   */
  deleteSuggestedConversationSegment(websiteID: string, segment: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversations", "suggest", "segment"
      ]),

      null,

      {
        segment: segment
      }
    );
  };

  /**
   * List Suggested Conversation Data Keys
   */
  listSuggestedConversationDataKeys(
    websiteID: string, pageNumber: number = 1
  ): Promise<ConversationSuggestedData[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversations", "suggest", "data", String(pageNumber)
      ])
    );
  };

  /**
   * Delete Suggested Conversation Data Key
   */
  deleteSuggestedConversationDataKey(websiteID: string, key: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversations", "suggest", "data"
      ]),

      null,

      {
        key: key
      }
    );
  };

  /**
   * List Spam Conversations
   */
  listSpamConversations(
    websiteID: string, pageNumber: number = 1
  ): Promise<ConversationSpam[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversations", "spams", String(pageNumber)
      ])
    );
  };

  /**
   * Resolve Spam Conversation Content
   */
  resolveSpamConversationContent(
    websiteID: string, spamID: string
  ): Promise<ConversationSpamContent> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversations", "spam", spamID, "content"
      ])
    );
  };

  /**
   * Submit Spam Conversation Decision
   */
  submitSpamConversationDecision(
    websiteID: string, spamID: string, action: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversations", "spam", spamID, "decision"
      ]),

      null,

      {
        action: action
      }
    );
  };

  /**
   * Create A New Conversation
   */
  createNewConversation(websiteID: string): Promise<ConversationNew> {
    return this.crisp.post(
      this.crisp.prepareRestUrl(["website", websiteID, "conversation"]),

      null,

      null
    );
  };

  /**
   * Check If Conversation Exists
   */
  checkConversationExists(websiteID: string, sessionID: string) {
    return this.crisp.head(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID
      ])
    );
  };

  /**
   * Get A Conversation
   */
  getConversation(websiteID: string, sessionID: string): Promise<Conversation> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID
      ])
    );
  };

  /**
   * Remove A Conversation
   */
  removeConversation(websiteID: string, sessionID: string) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID
      ])
    );
  };

  /**
   * Initiate A Conversation With Existing Session
   */
  initiateConversationWithExistingSession(websiteID: string, sessionID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "initiate"
      ]),

      null,

      null
    );
  };

  /**
   * Get Messages In Conversation
   */
  getMessagesInConversation(
    websiteID: string, sessionID: string, timestampBefore?: string|number
  ): Promise<ConversationMessage[]> {
    // Generate query
    let query = {};

    if (timestampBefore) {
      // @ts-ignore
      query.timestamp_before = String(timestampBefore);
    }

    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "messages"
      ]),

      query
    );
  };

  /**
   * Send A Message In Conversation
   */
  sendMessageInConversation(
    websiteID: string, sessionID: string, message: ConversationMessageNew
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "message"
      ]),

      null, message
    );
  };

  /**
   * Get A Message In Conversation
   */
  getMessageInConversation(
    websiteID: string, sessionID: string, fingerprint: number
  ): Promise<ConversationMessage> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "message", String(fingerprint)
      ])
    );
  };

  /**
   * Update A Message In Conversation
   */
  updateMessageInConversation(
    websiteID: string, sessionID: string, fingerprint: number, content: ConversationContent
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "message", String(fingerprint)
      ]),

      null,

      {
        content: content
      }
    );
  };

  /**
   * Remove A Message In Conversation
   */
  removeMessageInConversation(
    websiteID: string, sessionID: string, fingerprint: number
  ) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "message", String(fingerprint)
      ])
    );
  };

  /**
   * Compose A Message In Conversation
   */
  composeMessageInConversation(
    websiteID: string, sessionID: string, compose: ConversationComposeMessageNew
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "compose"
      ]),

      null, compose
    );
  };

  /**
   * Mark Messages As Read In Conversation
   */
  markMessagesReadInConversation(
    websiteID: string, sessionID: string, read: ConversationReadMessageMark
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "read"
      ]),

      null, read
    );
  };

  /**
   * Mark Conversation As Unread
   */
  markConversationAsUnread(
    websiteID: string, sessionID: string, unread: ConversationUnreadMessageMark
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "unread"
      ]),

      null, unread
    );
  };

  /**
   * Mark Messages As Delivered In Conversation
   */
  markMessagesDeliveredInConversation(
    websiteID: string, sessionID: string, delivered: ConversationReadMessageMark
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "delivered"
      ]),

      null, delivered
    );
  };

  /**
   * Update Conversation Open State
   */
  updateConversationOpenState(
    websiteID: string, sessionID: string, opened: boolean
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "open"
      ]),

      null,

      {
        opened: (opened || false)
      }
    );
  };

  /**
   * Get Conversation Routing Assign
   */
  getConversationRoutingAssign(websiteID: string, sessionID: string) {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "routing"
      ])
    );
  };

  /**
   * Assign Conversation Routing
   */
  assignConversationRouting(
    websiteID: string, sessionID: string, assign: ConversationRoutingAssignUpdate
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "routing"
      ]),

      null, assign
    );
  };

  /**
   * Update Conversation Inbox
   */
  updateConversationInbox(
    websiteID: string, sessionID: string, inboxID: string
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "inbox"
      ]),

      null,

      {
        inbox_id: inboxID
      }
    );
  }

  /**
   * Get Conversation Metas
   */
  getConversationMetas(
    websiteID: string, sessionID: string
  ): Promise<ConversationMeta> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "meta"
      ])
    );
  }

  /**
   * Update Conversation Metas
   */
  updateConversationMetas(
    websiteID: string, sessionID: string, metas: ConversationMeta
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "meta"
      ]),

      null, metas
    );
  }

  /**
   * Get An Original Message In Conversation
   */
  getOriginalMessageInConversation(
    websiteID: string, sessionID: string, originalID: string
  ): Promise<ConversationOriginal> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "original", originalID
      ])
    );
  }

  /**
   * List Conversation Pages
   */
  listConversationPages(
    websiteID: string, sessionID: string, pageNumber: number = 1
  ): Promise<ConversationPage[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "pages", String(pageNumber)
      ])
    );
  };

  /**
   * List Conversation Events
   */
  listConversationEvents(
    websiteID: string, sessionID: string, pageNumber: number = 1
  ): Promise<ConversationEvent[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "events", String(pageNumber)
      ])
    );
  };

  /**
   * List Conversation Files
   */
  listConversationFiles(
    websiteID: string, sessionID: string, pageNumber: number = 1
  ): Promise<ConversationFile[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "files", String(pageNumber)
      ])
    );
  };

  /**
   * Get Conversation State
   */
  getConversationState(
    websiteID: string, sessionID: string
  ): Promise<ConversationStateData> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "state"
      ])
    );
  };

  /**
   * Change Conversation State
   */
  changeConversationState(
    websiteID: string, sessionID: string, state: ConversationState
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "state"
      ]),

      null,

      {
        state: state
      }
    );
  };

  /**
   * Get Conversation Participants
   */
  getConversationParticipants(
    websiteID: string, sessionID: string
  ): Promise<ConversationParticipant[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "participants"
      ])
    );
  };

  /**
   * Save Conversation Participants
   */
  saveConversationParticipants(
    websiteID: string, sessionID: string, participants: ConversationParticipantsSave
  ) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "participants"
      ]),

      null, participants
    );
  };

  /**
   * Get Block Status For Conversation
   */
  getBlockStatusForConversation(
    websiteID: string, sessionID: string
  ): Promise<ConversationBlock> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "block"
      ])
    );
  };

  /**
   * Block Incoming Messages For Conversation
   */
  blockIncomingMessagesForConversation(
    websiteID: string, sessionID: string, blocked: boolean
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "block"
      ]),

      null,

      {
        blocked: (blocked || false)
      }
    );
  };

  /**
   * Get Verify Status For Conversation
   */
  getVerifyStatusForConversation(
    websiteID: string, sessionID: string
  ): Promise<ConversationVerify> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "verify"
      ])
    );
  };

  /**
   * Update Verify Status For Conversation
   */
  updateVerifyStatusForConversation(
    websiteID: string, sessionID: string, verified: boolean
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "verify"
      ]),

      null,

      {
        verified: (verified || false)
      }
    );
  };

  /**
   * Request Identity Verification For Conversation
   */
  requestIdentityVerificationForConversation(
    websiteID: string, sessionID: string,
      verification: ConversationVerifyIdentityRequest
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "verify", "identity"
      ]),

      null, verification
    );
  };

  /**
   * Redeem Identity Verification Link For Conversation
   */
  redeemIdentityVerificationLinkForConversation(
    websiteID: string, sessionID: string,
      verification: ConversationVerifyIdentityRedeem
  ) {
    return this.crisp.put(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "verify", "identity",
        "link"
      ]),

      null, verification
    );
  };

  /**
   * Request Email Transcript For Conversation
   */
  requestEmailTranscriptForConversation(
    websiteID: string, sessionID: string, to: string, email?: string
  ) {
    // Generate body
    let body = {
      to: to
    };

    if (email) {
      // @ts-ignore
      body.email = email;
    }

    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "transcript"
      ]),

      null, body
    );
  };

  /**
   * Request Chatbox Binding Purge For Conversation
   */
  requestChatboxBindingPurgeForConversation(
    websiteID: string, sessionID: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "purge"
      ]),

      null,

      null
    );
  };

  /**
   * Request User Feedback For Conversation
   */
  requestUserFeedbackForConversation(websiteID: string, sessionID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "feedback"
      ]),

      null,

      null
    );
  };

  /**
   * List Browsing Sessions For Conversation
   */
  listBrowsingSessionsForConversation(
    websiteID: string, sessionID: string
  ): Promise<ConversationBrowsing[]> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "browsing"
      ])
    );
  };

  /**
   * Initiate Browsing Session For Conversation
   */
  initiateBrowsingSessionForConversation(websiteID: string, sessionID: string) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "browsing"
      ]),

      null,

      null
    );
  };

  /**
   * Send Action To An Existing Browsing Session
   */
  sendActionToExistingBrowsingSession(
    websiteID: string, sessionID: string, browsingID: string, action: string
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "browsing", browsingID
      ]),

      null,

      {
        action: action
      }
    );
  };

  /**
   * Assist Existing Browsing Session
   */
  assistExistingBrowsingSession(
    websiteID: string, sessionID: string, browsingID: string, assist: object
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "browsing", browsingID,
        "assist"
      ]),

      null, assist
    );
  };

  /**
   * Initiate New Call Session For Conversation
   */
  initiateNewCallSessionForConversation(
    websiteID: string, sessionID: string, mode: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "call"
      ]),

      null,

      {
        mode: (mode || "audio")
      }
    );
  };

  /**
   * Get Ongoing Call Session For Conversation
   */
  getOngoingCallSessionForConversation(
    websiteID: string, sessionID: string
  ): Promise<ConversationCall> {
    return this.crisp.get(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "call"
      ])
    );
  };

  /**
   * Abort Ongoing Call Session For Conversation
   */
  abortOngoingCallSessionForConversation(
    websiteID: string, sessionID: string, callID: string
  ) {
    return this.crisp.delete(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "call", callID
      ])
    );
  };

  /**
   * Transmit Signaling On Ongoing Call Session
   */
  transmitSignalingOnOngoingCallSession(
    websiteID: string, sessionID: string, callID: string, payload: object
  ) {
    return this.crisp.patch(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "call", callID
      ]),

      null, payload
    );
  };

  /**
   * Deliver Widget Button Action For Conversation
   */
  deliverWidgetButtonActionForConversation(
    websiteID: string, sessionID: string, pluginID: string, sectionID: string,
      itemID: string, data: object, value?: string
  ) {
    // Generate body
    let body = {
      section_id: sectionID,
      item_id: itemID,
      data: data
    };

    if (typeof value !== "undefined") {
      // @ts-ignore
      body.value = value;
    }

    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "widget", pluginID,
        "button"
      ]),

      null, body
    );
  };

  /**
   * Deliver Widget Data Fetch Action For Conversation
   */
  deliverWidgetDataFetchActionForConversation(
    websiteID: string, sessionID: string, pluginID: string, sectionID: string,
      itemID: string, data: object
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "widget", pluginID,
        "data"
      ]),

      null,

      {
        section_id: sectionID,
        item_id: itemID,
        data: data
      }
    );
  };

  /**
   * Deliver Widget Data Edit Action For Conversation
   */
  deliverWidgetDataEditActionForConversation(
    websiteID: string, sessionID: string, pluginID: string, sectionID: string,
      itemID: string, value: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "widget", pluginID,
        "data"
      ]),

      null,

      {
        section_id: sectionID,
        item_id: itemID,
        value: value
      }
    );
  };

  /**
   * Schedule A Reminder For Conversation
   */
  scheduleReminderForConversation(
    websiteID: string, sessionID: string, date: string, note: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "reminder"
      ]),

      null,

      {
        date: date,
        note: note
      }
    );
  };

  /**
   * Report Conversation
   */
  reportConversation(
    websiteID: string, sessionID: string, flag: string
  ) {
    return this.crisp.post(
      this.crisp.prepareRestUrl([
        "website", websiteID, "conversation", sessionID, "report"
      ]),

      null,

      {
        flag: flag
      }
    );
  };
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

export default WebsiteConversation;
