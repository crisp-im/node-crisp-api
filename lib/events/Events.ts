/*
 * This file is part of node-crisp-api
 *
 * Copyright (c) 2025 Crisp IM SAS
 * All rights belong to Crisp IM SAS
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: RESOURCES
import {
  ConversationMessageType,
  ConversationMessageUser,
  ConversationState,
  ConversationFileMessageContent,
  ConversationAnimationMessageContent,
  ConversationAudioMessageContent,
  ConversationPickerMessageContent,
  ConversationFieldMessageContent,
  ConversationCarouselMessageContent,
  ConversationEventMessageContent,
  GeolocationInfo,
  SystemInfo,
  ConnectionInfo
} from "@/resources/WebsiteConversation";

/**************************************************************************
 * TYPES + INTERFACES (COMMON)
 ***************************************************************************/

/**
 * Common fields shared by every website-scoped event.
 */
export interface EventsWebsiteGeneric {
  website_id: string;
}

/**
 * Common fields shared by every session-scoped event.
 */
export interface EventsSessionGeneric extends EventsWebsiteGeneric {
  session_id: string;
  inbox_id: string | null;
}

export interface EventsOperator {
  user_id: string;
  avatar?: string | null;
  nickname?: string;
}

/**************************************************************************
 * TYPES + INTERFACES (SESSION EVENTS)
 ***************************************************************************/

export type EventsSessionAvailability = "online" | "offline";

export interface EventsSessionUpdateAvailability extends EventsSessionGeneric {
  availability: EventsSessionAvailability;
}

export interface EventsSessionVerification {
  identity: string;
  method: string;
  annotation: string;
}

export interface EventsSessionUpdateVerify extends EventsSessionGeneric {
  is_verified: boolean;
  verifications: EventsSessionVerification[];
}

export type EventsSessionRequestInitiated = EventsSessionGeneric;

export interface EventsSessionSetEmail extends EventsSessionGeneric {
  email: string;
}

export interface EventsSessionSetPhone extends EventsSessionGeneric {
  phone: string;
}

export interface EventsSessionSetAddress extends EventsSessionGeneric {
  address: string;
}

export interface EventsSessionSetSubject extends EventsSessionGeneric {
  subject: string;
}

export interface EventsSessionSetAvatar extends EventsSessionGeneric {
  avatar: string;
}

export interface EventsSessionSetNickname extends EventsSessionGeneric {
  nickname: string;
}

export interface EventsSessionSetOrigin extends EventsSessionGeneric {
  origin: string;
}

export interface EventsSessionSetData extends EventsSessionGeneric {
  data: Record<string, string | number | boolean>;
}

export interface EventsSessionSetSegments extends EventsSessionGeneric {
  segments: string[];
}

export interface EventsSessionSetBlock extends EventsSessionGeneric {
  is_blocked: boolean;
}

export interface EventsSessionSetOpened extends EventsSessionGeneric {
  operator: EventsOperator;
}

export interface EventsSessionSetClosed extends EventsSessionGeneric {
  operator: EventsOperator;
}

export interface EventsSessionParticipant {
  target: string;
  type: string;
}

export interface EventsSessionSetParticipants extends EventsSessionGeneric {
  participants: EventsSessionParticipant[];
}

export interface EventsSessionSetMentions extends EventsSessionGeneric {
  mentions: string[];
}

export interface EventsSessionSetRouting extends EventsSessionGeneric {
  routing_id: string | null;
  previous_routing_id: string | null;
}

export interface EventsSessionSetInbox extends EventsSessionGeneric {
  previous_inbox_id: string | null;
}

export interface EventsSessionSetState extends EventsSessionGeneric {
  state: ConversationState;
}

export interface EventsSessionSyncCapabilities extends EventsSessionGeneric {
  capabilities: string[];
}

export interface EventsSessionSyncGeolocation extends EventsSessionGeneric {
  geolocation: GeolocationInfo;
}

export interface EventsSessionSyncSystem extends EventsSessionGeneric {
  system: SystemInfo;
}

export interface EventsSessionSyncNetworkInfo {
  ip: string;
  connection?: ConnectionInfo;
}

export interface EventsSessionSyncNetwork extends EventsSessionGeneric {
  network: EventsSessionSyncNetworkInfo;
}

export interface EventsSessionSyncTimezone extends EventsSessionGeneric {
  timezone: {
    offset: number;
  };
}

export interface EventsSessionSyncLocales extends EventsSessionGeneric {
  locales: {
    locales: string[];
  };
}

export interface EventsSessionPage {
  page_url: string;
  page_title: string;
  timestamp: number;
}

export interface EventsSessionSyncPages extends EventsSessionGeneric {
  pages: EventsSessionPage[];
}

export interface EventsSessionEvent {
  text: string;
  data?: Record<string, string | number | boolean>;
  color?: string;
  timestamp: number;
}

export interface EventsSessionSyncEvents extends EventsSessionGeneric {
  events: EventsSessionEvent[];
}

export interface EventsSessionRating {
  stars: number;
  comment?: string;
}

export interface EventsSessionSyncRating extends EventsSessionGeneric {
  rating: EventsSessionRating;
}

export interface EventsSessionSyncTopic extends EventsSessionGeneric {
  topic: string;
}

export type EventsSessionRemoved = EventsSessionGeneric;

export interface EventsSessionError extends EventsSessionGeneric {
  type: string;
  value: string;
  previous_value: string;
}

/**************************************************************************
 * TYPES + INTERFACES (MESSAGE EVENTS)
 ***************************************************************************/

export interface EventsMessageUpdated extends EventsSessionGeneric {
  fingerprint: number;
  content: string | ConversationPickerMessageContent;
}

/**
 * Common fields shared by 'message:send' and 'message:received' events.
 */
export interface EventsMessageGeneric extends EventsSessionGeneric {
  type: ConversationMessageType;
  from: string;
  origin: string;
  fingerprint: number;
  timestamp: number;
  user: ConversationMessageUser;
  mentions?: string[];
  stamped?: boolean;
}

export interface EventsMessageSendText extends EventsMessageGeneric {
  type: "text";
  content: string;
}

export interface EventsMessageSendFile extends EventsMessageGeneric {
  type: "file";
  content: ConversationFileMessageContent;
}

export interface EventsMessageSendAnimation extends EventsMessageGeneric {
  type: "animation";
  content: ConversationAnimationMessageContent;
}

export interface EventsMessageSendAudio extends EventsMessageGeneric {
  type: "audio";
  content: ConversationAudioMessageContent;
}

export interface EventsMessageSendPicker extends EventsMessageGeneric {
  type: "picker";
  content: ConversationPickerMessageContent;
}

export interface EventsMessageSendField extends EventsMessageGeneric {
  type: "field";
  content: ConversationFieldMessageContent;
}

export interface EventsMessageSendCarousel extends EventsMessageGeneric {
  type: "carousel";
  content: ConversationCarouselMessageContent;
}

/**
 * Payload of a 'message:send' event (message sent by a visitor).
 */
export type EventsMessageSend =
  | EventsMessageSendText
  | EventsMessageSendFile
  | EventsMessageSendAnimation
  | EventsMessageSendAudio
  | EventsMessageSendPicker
  | EventsMessageSendField
  | EventsMessageSendCarousel;

export interface EventsMessageReceivedNote extends EventsMessageGeneric {
  type: "note";
  content: string;
}

export interface EventsMessageReceivedEvent extends EventsMessageGeneric {
  type: "event";
  content: ConversationEventMessageContent;
}

/**
 * Payload of a 'message:received' event (message sent by an operator).
 */
export type EventsMessageReceived =
  | EventsMessageSendText
  | EventsMessageReceivedNote
  | EventsMessageSendFile
  | EventsMessageSendAnimation
  | EventsMessageSendAudio
  | EventsMessageSendPicker
  | EventsMessageSendField
  | EventsMessageSendCarousel
  | EventsMessageReceivedEvent;

export interface EventsMessageRemoved extends EventsSessionGeneric {
  fingerprint: number;
}

export interface EventsMessageComposeSend extends EventsSessionGeneric {
  type: "start" | "stop";
  excerpt?: string;
  timestamp: number;
}

export interface EventsMessageComposeReceive extends EventsSessionGeneric {
  type: "start" | "stop";
  excerpt?: string;
  timestamp: number;
  user: ConversationMessageUser;
}

export interface EventsMessageAcknowledge extends EventsSessionGeneric {
  origin: string;
  fingerprints: number[];
}

export interface EventsMessageAcknowledgeIgnoredDetails {
  type: string;
  reason: string;
}

export interface EventsMessageAcknowledgeIgnored
  extends EventsMessageAcknowledge {
  details?: EventsMessageAcknowledgeIgnoredDetails;
}

export type EventsMessageNotifyUnread = EventsSessionGeneric;

/**************************************************************************
 * TYPES + INTERFACES (SPAM EVENTS)
 ***************************************************************************/

export interface EventsSpamMessage extends EventsWebsiteGeneric {
  spam_id: string;
  type: string;
  reason: string;
  metadata?: Record<string, unknown>;
  headers?: Record<string, string>;
  timestamp: number;
}

export interface EventsSpamDecision extends EventsWebsiteGeneric {
  spam_id: string;
  action: string;
}

/**************************************************************************
 * TYPES + INTERFACES (PEOPLE EVENTS)
 ***************************************************************************/

export interface EventsPeopleProfileCreated extends EventsWebsiteGeneric {
  people_id: string;
  email?: string;
}

export interface EventsPeopleEmployment {
  domain?: string;
  name?: string;
  role?: string;
  title?: string;
}

export interface EventsPeoplePerson {
  geolocation?: GeolocationInfo;
  locales?: string[];
  nickname?: string;
  timezone?: number;
  phone?: string;
  avatar?: string;
  employment?: EventsPeopleEmployment;
  address?: string;
  website?: string;
  gender?: string;
}

export interface EventsPeopleCompany {
  description?: string;
  domain?: string;
  geolocation?: GeolocationInfo;
  legal_name?: string;
  name?: string;
  url?: string;
}

export interface EventsPeopleProfileUpdated extends EventsWebsiteGeneric {
  people_id: string;
  email?: string;
  update: {
    updated_at: number;
    person: EventsPeoplePerson;
  };
}

export interface EventsPeopleProfileRemoved extends EventsWebsiteGeneric {
  people_id: string;
}

export interface EventsPeopleBindSession extends EventsSessionGeneric {
  people_id: string;
}

export interface EventsPeopleSyncProfile extends EventsSessionGeneric {
  people_id: string;
  identity: {
    person?: EventsPeoplePerson;
    company?: EventsPeopleCompany;
  };
}

export interface EventsPeopleImportProgress extends EventsWebsiteGeneric {
  people_id?: string;
  progress: number;
  count: {
    skipped: number;
    remaining: number;
  };
  items?: {
    skipped?: Array<{
      identifier: string | null;
      reason: string;
    }>;
  };
}

export interface EventsPeopleImportDone extends EventsWebsiteGeneric {
  people_id?: string;
  error: boolean;
}

/**************************************************************************
 * TYPES + INTERFACES (CAMPAIGN EVENTS)
 ***************************************************************************/

export interface EventsCampaignProgress extends EventsWebsiteGeneric {
  campaign_id: string;
  progress: number;
}

export interface EventsCampaignDispatched extends EventsWebsiteGeneric {
  campaign_id: string;
}

export interface EventsCampaignRunning extends EventsWebsiteGeneric {
  campaign_id: string;
  running: boolean;
}

/**************************************************************************
 * TYPES + INTERFACES (BROWSING EVENTS)
 ***************************************************************************/

export interface EventsBrowsingRequestInitiated extends EventsSessionGeneric {
  browsing_id: string;
  browsing_token: string;
}

export type EventsBrowsingRequestRejected = EventsSessionGeneric;

/**************************************************************************
 * TYPES + INTERFACES (CALL EVENTS)
 ***************************************************************************/

export interface EventsCallRequestInitiated extends EventsSessionGeneric {
  call_id: string;
}

export interface EventsCallRequestRejected extends EventsSessionGeneric {
  call_id: string;
}

/**************************************************************************
 * TYPES + INTERFACES (IDENTITY EVENTS)
 ***************************************************************************/

export interface EventsIdentityVerifyRequest extends EventsWebsiteGeneric {
  plugin_id: string;
  session_id: string;
  target: string;
  code: string;
  confirm_url: string;
}

/**************************************************************************
 * TYPES + INTERFACES (WIDGET EVENTS)
 ***************************************************************************/

export interface EventsWidgetActionProcessed extends EventsSessionGeneric {
  plugin_id: string;
  correlation_id: string;
  outcome: "success" | "failure";
  result?: Record<string, unknown>;
}

/**************************************************************************
 * TYPES + INTERFACES (STATUS EVENTS)
 ***************************************************************************/

export type EventsStatusHealth = "healthy" | "sick" | "dead";

export interface EventsStatusNode {
  label: string;
  replica: string;
}

export interface EventsStatusHealthChanged extends EventsWebsiteGeneric {
  health: EventsStatusHealth;
  nodes: EventsStatusNode[];
}

/**************************************************************************
 * TYPES + INTERFACES (WEBSITE EVENTS)
 ***************************************************************************/

export interface EventsWebsiteUpdateVisitorsCount extends EventsWebsiteGeneric {
  visitors_count: number;
}

export interface EventsWebsiteUpdateOperatorsAvailability
  extends EventsWebsiteGeneric {
  user_id: string;
  availability: {
    type: EventsSessionAvailability;
  };
}

export interface EventsWebsiteUsersAvailable extends EventsWebsiteGeneric {
  available: boolean;
}

/**************************************************************************
 * TYPES + INTERFACES (BUCKET EVENTS)
 ***************************************************************************/

export interface EventsBucketURLGenerated {
  from: string;
  id: string;
  identifier: string;
  resource: {
    type: string;
    id: string;
  };
  policy: {
    size_limit: number;
  };
  type: string;
  url: {
    resource: string;
    signed: string;
  };
}

/**************************************************************************
 * TYPES + INTERFACES (MEDIA EVENTS)
 ***************************************************************************/

export interface EventsMediaAnimationResult {
  type: string;
  url: string;
}

export interface EventsMediaAnimationListed {
  id: number;
  identifier: string;
  results: EventsMediaAnimationResult[];
}

/**************************************************************************
 * TYPES + INTERFACES (EMAIL EVENTS)
 ***************************************************************************/

export interface EventsEmailSubscribe extends EventsWebsiteGeneric {
  email: string;
  subscribed: boolean;
}

export interface EventsEmailTrackView extends EventsWebsiteGeneric {
  type: string;
  identifier: string;
  mode: string;
}

/**************************************************************************
 * TYPES + INTERFACES (PLUGIN EVENTS)
 ***************************************************************************/

export interface EventsPluginChannel extends EventsWebsiteGeneric {
  plugin_id: string;
  identifier: string;
  namespace: string;
  payload: unknown;
}

export interface EventsPluginEvent extends EventsWebsiteGeneric {
  plugin_id: string;
  urn: string;
  name: string;
  data: Record<string, unknown>;
}

export interface EventsPluginSubscriptionUpdated extends EventsWebsiteGeneric {
  plugin_id: string;
  bound: boolean;
  target: string;
}

export interface EventsPluginSettingsSaved extends EventsWebsiteGeneric {
  plugin_id: string;
  settings: Record<string, unknown>;
}

/**************************************************************************
 * TYPES + INTERFACES (PLAN EVENTS)
 ***************************************************************************/

export interface EventsPlanSubscriptionUpdated extends EventsWebsiteGeneric {
  plan: {
    id: string;
    name: string;
    price?: number;
    trialing: boolean;
  };
}

/**************************************************************************
 * EVENT MAP
 ***************************************************************************/

/**
 * Maps each event name to the shape of the payload delivered to its listener,
 *   whether received over WebSockets or Web Hooks.
 */
export interface EventsMap {
  // Session Events
  "session:update_availability": EventsSessionUpdateAvailability;
  "session:update_verify": EventsSessionUpdateVerify;
  "session:request:initiated": EventsSessionRequestInitiated;
  "session:set_email": EventsSessionSetEmail;
  "session:set_phone": EventsSessionSetPhone;
  "session:set_address": EventsSessionSetAddress;
  "session:set_subject": EventsSessionSetSubject;
  "session:set_avatar": EventsSessionSetAvatar;
  "session:set_nickname": EventsSessionSetNickname;
  "session:set_origin": EventsSessionSetOrigin;
  "session:set_data": EventsSessionSetData;
  "session:set_segments": EventsSessionSetSegments;
  "session:set_block": EventsSessionSetBlock;
  "session:set_opened": EventsSessionSetOpened;
  "session:set_closed": EventsSessionSetClosed;
  "session:set_participants": EventsSessionSetParticipants;
  "session:set_mentions": EventsSessionSetMentions;
  "session:set_routing": EventsSessionSetRouting;
  "session:set_inbox": EventsSessionSetInbox;
  "session:set_state": EventsSessionSetState;
  "session:sync:capabilities": EventsSessionSyncCapabilities;
  "session:sync:geolocation": EventsSessionSyncGeolocation;
  "session:sync:system": EventsSessionSyncSystem;
  "session:sync:network": EventsSessionSyncNetwork;
  "session:sync:timezone": EventsSessionSyncTimezone;
  "session:sync:locales": EventsSessionSyncLocales;
  "session:sync:pages": EventsSessionSyncPages;
  "session:sync:events": EventsSessionSyncEvents;
  "session:sync:rating": EventsSessionSyncRating;
  "session:sync:topic": EventsSessionSyncTopic;
  "session:removed": EventsSessionRemoved;
  "session:error": EventsSessionError;

  // Message Events
  "message:updated": EventsMessageUpdated;
  "message:send": EventsMessageSend;
  "message:received": EventsMessageReceived;
  "message:removed": EventsMessageRemoved;
  "message:compose:send": EventsMessageComposeSend;
  "message:compose:receive": EventsMessageComposeReceive;
  "message:acknowledge:read:send": EventsMessageAcknowledge;
  "message:acknowledge:read:received": EventsMessageAcknowledge;
  "message:acknowledge:unread:send": EventsMessageAcknowledge;
  "message:acknowledge:delivered": EventsMessageAcknowledge;
  "message:acknowledge:ignored": EventsMessageAcknowledgeIgnored;
  "message:notify:unread:send": EventsMessageNotifyUnread;
  "message:notify:unread:received": EventsMessageNotifyUnread;

  // Spam Events
  "spam:message": EventsSpamMessage;
  "spam:decision": EventsSpamDecision;

  // People Events
  "people:profile:created": EventsPeopleProfileCreated;
  "people:profile:updated": EventsPeopleProfileUpdated;
  "people:profile:removed": EventsPeopleProfileRemoved;
  "people:bind:session": EventsPeopleBindSession;
  "people:sync:profile": EventsPeopleSyncProfile;
  "people:import:progress": EventsPeopleImportProgress;
  "people:import:done": EventsPeopleImportDone;

  // Campaign Events
  "campaign:progress": EventsCampaignProgress;
  "campaign:dispatched": EventsCampaignDispatched;
  "campaign:running": EventsCampaignRunning;

  // Browsing Events
  "browsing:request:initiated": EventsBrowsingRequestInitiated;
  "browsing:request:rejected": EventsBrowsingRequestRejected;

  // Call Events
  "call:request:initiated": EventsCallRequestInitiated;
  "call:request:rejected": EventsCallRequestRejected;

  // Identity Events
  "identity:verify:request": EventsIdentityVerifyRequest;

  // Widget Events
  "widget:action:processed": EventsWidgetActionProcessed;

  // Status Events
  "status:health:changed": EventsStatusHealthChanged;

  // Website Events
  "website:update_visitors_count": EventsWebsiteUpdateVisitorsCount;
  "website:update_operators_availability": EventsWebsiteUpdateOperatorsAvailability;
  "website:users:available": EventsWebsiteUsersAvailable;

  // Bucket Events
  "bucket:url:upload:generated": EventsBucketURLGenerated;
  "bucket:url:avatar:generated": EventsBucketURLGenerated;
  "bucket:url:website:generated": EventsBucketURLGenerated;
  "bucket:url:campaign:generated": EventsBucketURLGenerated;
  "bucket:url:helpdesk:generated": EventsBucketURLGenerated;
  "bucket:url:status:generated": EventsBucketURLGenerated;
  "bucket:url:processing:generated": EventsBucketURLGenerated;

  // Media Events
  "media:animation:listed": EventsMediaAnimationListed;

  // Email Events
  "email:subscribe": EventsEmailSubscribe;
  "email:track:view": EventsEmailTrackView;

  // Plugin Events
  "plugin:channel": EventsPluginChannel;
  "plugin:event": EventsPluginEvent;
  "plugin:subscription:updated": EventsPluginSubscriptionUpdated;
  "plugin:settings:saved": EventsPluginSettingsSaved;

  // Plan Events
  "plan:subscription:updated": EventsPlanSubscriptionUpdated;
}

/**
 * Union of all recognized event names.
 */
export type EventName = keyof EventsMap;

/**
 * Shape of a Web Hook body, as received on the HTTP endpoint before being
 *   dispatched with 'receiveHook'.
 */
export type EventsWebHookBody<Name extends EventName = EventName> = {
  [K in Name]: {
    event: K;
    data: EventsMap[K];
    timestamp?: number;
    website_id?: string;
  };
}[Name];
