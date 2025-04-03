export const EVENTS = {
  DEMO: {
    PING: 'ping',
    PONG: 'pong',
  },
};

export const QUEUES = {
     TRANSPORT_ECHO : 'rsconnect.transport.echo',
  TRANSPORT_SMTP : 'rsconnect.transport.smtp',
  TRANSPORT_VOICE : 'rsconnect.transport.voice',
  TRANSPORT_API : 'rsconnect.transport.api',
  TO_CONNECT : 'rsconnect.to.connect',
} as const 

export const QUEUE_ACTIONS = {
  BROADCAST : 'broadcast',
  READINESS_CHECK :'readiness_check',
  READINESS_CONFIRM : 'readiness_confirm',
  BROADCAST_LOG_CREATE : 'broadcast_log_create',
  BROADCAST_LOG_UPDATE : 'broadcast_log_update',
  BROADCAST_LOG_DETAILS : 'broadcast_log_details',


} as const

export type QueueType = (typeof QUEUES)[keyof typeof QUEUES];