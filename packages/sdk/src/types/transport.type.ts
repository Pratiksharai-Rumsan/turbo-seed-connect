import { CommonFields } from "./common.type";




export enum TransportType {
  SMTP = 'SMTP',
  VOICE = 'VOICE',
  API = 'API',
  SES = 'SES',
  ECHO = 'ECHO',
}

export type TransportBase = {
  app?: string;
  name: string;
  type: TransportType;
  config: Record<string, any>;
  
  stats?: Record<string, any> | null;
  validationContent?: string;
  validationAddress?: string;

};


export type Transport = TransportBase& CommonFields
export type CreateTransport = TransportBase
export type EditTransport= Partial<CreateTransport>


export type TransportSmtpConfig = {
  host: string;
  port?: number;
  secure?: boolean;
  username: string;
  password: string;
  defaultFrom?: string;
  defaultSubject?: string;
};

export type TransportApiConfig = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  timeout?: number;
};

export type TransportEchoConfig = {
  slack_url?: string;
  slack_email?: string;
};
